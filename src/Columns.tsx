import * as React from 'react';
import {
  View, FlatList,
  LayoutChangeEvent,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { flat } from './utils';
import { Colunm } from './Column';

export interface IColumnsProps<T> {
  numColumns: number
  heightForItem?: (item: T) => number
  data: T[]
  columnsFlatListProps: {
    onEndReached?: () => void
    onRefresh?: () => void
  }
  columnFlatListProps: {}
  renderItem: ({ item, index }: { item: T, index: number }) => JSX.Element
  keyForItem: (item: T) => string
  onEndReached: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
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
}>(props: IColumnsProps<T>, ref: typeof React.useRef) => {
  const { numColumns } = props;

  const [addIteming, setAddIteming] = React.useState(false)
  const [columns, setColumns] = React.useState<T[][]>(
    Array(numColumns)
      .fill('')
      .map(() => []),
  );

  const columnsHeight = React.useMemo(() => Array(numColumns).fill(0), [numColumns]);
  let minColumnsIndex = React.useMemo(() => 0, [numColumns]);
  let keysList = React.useMemo(() => [], [numColumns])

  const addItems = (data: T[]): any => {
    if (data.length === 0) {
      return setAddIteming(false);
    }
    setAddIteming(true);
    const item: T = data.shift() as T;

    // 已经渲染则跳过
    if (checkIsExist(item)) {
      return addItems(data);
    }

    const { _columns } = addItem(item, addItems.bind(addItems, data));
    setColumns(_columns);
  };

  const addItem = (item: T, cb?: () => typeof addItems) => {
    const _columns = [...columns];

    item._keyForItem_ = props.keyForItem(item);
    keysList.push(item._keyForItem_)
    // 获取当前renderItem高度,获取后渲染下一个renderItem,直到全部渲染完毕
    if (typeof cb === 'function') {
      item.onLayout = (e: LayoutChangeEvent) => {
        // 触发一次后销毁
        item.onLayout = null
        const height = e.nativeEvent.layout.height;
        columnsHeight[minColumnsIndex] += height;
        cb();
      }
    };
    // 获取总高度最小列
    minColumnsIndex = [...columnsHeight].indexOf(
      Math.min.apply(Math, [...columnsHeight]),
    );
    const currentColumn = _columns[minColumnsIndex];
    currentColumn.push(item);
    return { _columns, minColumnsIndex }
  };

  // 清除所有renderItem
  const clear = () => {
    for (let index = 0; index < columnsHeight.length; index++) {
      columnsHeight[index] = 0
    }
    keysList = []
    setColumns(
      Array(numColumns)
        .fill([])
        .map(() => []),
    );
  };

  // 通过 _keyForItem_ 检查是否已经渲染
  const checkIsExist = React.useCallback(
    (item: T) => {
      const checkIsExist = keysList.indexOf(props.keyForItem(item)) !== -1
      return checkIsExist
    }
    ,
    [columns],
  )

  React.useEffect(() => {
    if (typeof props.heightForItem === 'function') {
      let _columns = Array(numColumns)
        .fill([])
        .map(() => [])
      setColumns(_columns)
      for (const item of props.data) {
        // 已经渲染则跳过
        if (checkIsExist(item)) { continue }
        // 获取总高度最小列
        const addItemValue = addItem(item)
        const height = props.heightForItem(item)
        columnsHeight[addItemValue.minColumnsIndex] += height;
        _columns = addItemValue._columns
      }
      return setColumns(_columns)
    }
    addItems(props.data.slice());
  }, [props.data]);

  React.useImperativeHandle(ref, () => ({
    clear,
    addIteming,
  }));

  return (
    <FlatList
      keyExtractor={(item: any, index: number) => {
        return `item-${index}`;
      }}
      data={columns}
      onScroll={props.onEndReached}
      style={{
        flex: 1,
      }}
      removeClippedSubviews={true}
      {...props.columnsFlatListProps}
      numColumns={props.numColumns}
      renderItem={({ item, index }: { item: T, index: number }) => {
        return <Colunm
          columnFlatListProps={props.columnFlatListProps}
          key={`column-${index}`}
          listKey={`column-${index}`}
          data={item}
          renderItem={props.renderItem}
        />
      }}
    />
  )
}
export default React.forwardRef(Columns as React.RefForwardingComponent<IColumnsHandles, IColumnsProps<any>>)
