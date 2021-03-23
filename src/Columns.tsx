import * as React from 'react';
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Colunm } from './Column';
interface IFlatListProps<T> extends FlatListProps<T> {
  data?: any
  renderItem?: any
}

export interface IColumnsProps<T> {
  asyncHeightForItem?: (item: T) => Promise<number>
  numColumns: number
  heightForItem?: (item: T) => number
  data: T[]
  renderItem: ({ item, index }: { item: T, index: number }) => JSX.Element
  keyForItem: (item: T) => string
  onEndReached: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void

  columnsFlatListProps?: IFlatListProps<T>
  columnFlatListProps?: IFlatListProps<T>
}
export interface IColumnsHandles {
  clear: () => void
  addIteming: boolean
}

const Columns = <T extends {
  offsetTop: number
  itemHeight: number
  onLayout: any
  _keyForItem_: any
}>({ columnsFlatListProps, ...props }: IColumnsProps<T>, ref: typeof React.useRef) => {
  const { numColumns } = props;

  const [addIteming, setAddIteming] = React.useState(false)
  const [columns, setColumns] = React.useState<T[][]>(
    Array(numColumns)
      .fill('')
      .map(() => []),
  );
  const columnsHeight = React.useMemo(() => Array(numColumns).fill(0), [numColumns]);
  const keysList = React.useMemo<string[]>(() => [], [])
  const heightForItemAddItems = (data: T[]) => {
    let tempColumns = Array(numColumns)
      .fill([])
      .map(() => [] as T[])
    for (const item of data) {
      item._keyForItem_ = props.keyForItem(item);
      // 已经渲染则跳过
      if (checkIsExist(item._keyForItem_)) { continue }
      // 获取总高度最小列
      const addItemValue = addItem(item)
      const height = props.heightForItem!(item)
      columnsHeight[addItemValue.minColumnsIndex] += height;
      tempColumns = addItemValue.tempColumns
    }
    return setColumns(tempColumns)
  }

  const addItems = (data: T[], isSyncHeightForItem: boolean = false): any => {
    if (data.length === 0) {
      return setAddIteming(false);
    }
    setAddIteming(true);
    const item: T = data.shift() as T;

    item._keyForItem_ = props.keyForItem(item);
    // 已经渲染则跳过
    if (checkIsExist(item._keyForItem_)) {
      return addItems(data);
    }

    const { tempColumns } = addItem(item, addItems.bind(addItems, data), isSyncHeightForItem);
    setColumns(tempColumns);
  };

  const addItem = (item: T, cb?: () => typeof addItems, isSyncHeightForItem: boolean = false) => {
    const tempColumns = [...columns];

    // 获取总高度最小列
    const minColumnsIndex = [...columnsHeight].indexOf(
      Math.min.apply(Math, [...columnsHeight]),
    );

    // 获取当前renderItem高度,获取后渲染下一个renderItem,直到全部渲染完毕
    if (typeof cb === 'function') {
      item.onLayout = async (e: LayoutChangeEvent) => {
        // 触发一次后销毁
        item.onLayout = null
        let height = 0
        // 如果heightForItem为Promise则使用heightForItem返回的高度
        if (isSyncHeightForItem) {
          height = await props.asyncHeightForItem!(item);
        } else {
          height = e.nativeEvent.layout.height;
        }
        columnsHeight[minColumnsIndex] += height;
        cb();
      }
    };

    const currentColumn = tempColumns[minColumnsIndex];
    currentColumn.push(item);
    return { tempColumns, minColumnsIndex }
  };

  // 清除所有renderItem
  const clear = () => {
    for (let index = 0; index < columnsHeight.length; index++) {
      columnsHeight[index] = 0
    }
    keysList.splice(0, keysList.length)
    setColumns(
      Array(numColumns)
        .fill([])
        .map(() => []),
    );
  };

  // 通过 _keyForItem_ 检查是否已经渲染
  const checkIsExist = React.useCallback(
    (key: string) => {
      const check = keysList.indexOf(key) !== -1
      // 如果未渲染则保存key
      if (!check) {
        keysList.push(key)
      }
      return check
    },
    [columns, keysList],
  )

  React.useEffect(() => {
    if (!props.data.length) { return }
    if (typeof props.heightForItem === 'function') {
      if (props.asyncHeightForItem) {
        addItems(props.data.slice(), true);
        return
      }
      heightForItemAddItems(props.data.slice())
      return
    }
    addItems(props.data.slice());
  }, [props.data]);

  React.useImperativeHandle(ref, () => ({
    clear,
    addIteming,
  }));

  return (
    <FlatList
      data={props.data.length ? columns as any : null}
      keyExtractor={(columnItem: T) => `item-${columnItem._keyForItem_}`}
      onScroll={(e: any) => {
        props.onEndReached(e);
        props.onScroll && props.onScroll(e)
      }}
      removeClippedSubviews={true}
      {...columnsFlatListProps}
      numColumns={props.numColumns}
      renderItem={({ item, index }: { item: T, index: number }) => {
        return <Colunm
          columnFlatListProps={props.columnFlatListProps}
          key={`column-${index}`}
          listKey={`column-${index}`}
          keyExtractor={(columnItem: T) => `item-${columnItem._keyForItem_}`}
          data={item}
          renderItem={props.renderItem}
        />
      }}
    />
  )
}
export default React.forwardRef(Columns as React.RefForwardingComponent<IColumnsHandles, IColumnsProps<any>>)
