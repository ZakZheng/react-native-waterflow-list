import * as React from 'react';
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Columns, { IColumnsProps, IColumnsHandles } from './Columns';
import { isPromise } from './utils';

export interface IWaterflowProps<T> {
  data: T[]
  numColumns: number
  keyForItem: IColumnsProps<T>['keyForItem'] // 用以上拉加载时检查该数据是否已渲染
  heightForItem?: IColumnsProps<T>['heightForItem'] // renderItem 高度确定使用
  renderItem: IColumnsProps<T>['renderItem']

  columnsFlatListProps?: IColumnsProps<T>['columnsFlatListProps']
  columnFlatListProps?: IColumnsProps<T>['columnFlatListProps']
  onEndReached: () => Promise<any>
}

const WaterFlow = <T extends {}>(props: IWaterflowProps<T>, ref: typeof React.useRef) => {
  const data = props.data || [];

  const WaterflowRef = React.useRef({} as IColumnsHandles);

  /**
   * 上拉加载, 传入一个 Promise 回调, 请求完成后才允许再次触发回调
   * 如果回调不为一个 Promise 对象, 则不做拦截处理
   */
  const onEndReached = (() => {
    let loading = false;
    // 使用 onScroll 代替 onEndReached, 避免有时无法触发 bug
    return async (event: NativeSyntheticEvent<NativeScrollEvent>, cb: () => Promise<any>) => {
      if (typeof props.columnsFlatListProps?.onEndReached === 'function') {
        props.columnsFlatListProps.onEndReached()
      }
      // 请求中和 renderItem 未加载完全时无法再次触发回调
      if (loading || WaterflowRef.current?.addIteming) return;
      let y = event.nativeEvent.contentOffset.y;
      let height = event.nativeEvent.layoutMeasurement.height;
      let contentHeight = event.nativeEvent.contentSize.height;
      if (y + height >= contentHeight - Dimensions.get('screen').height) {
        loading = true;
        if (typeof cb === 'function') {
          let _cb = cb();
          if (isPromise(_cb)) {
            _cb.then(() => {
              loading = false;
            }).catch(() => {
              loading = false;
            });
          } else {
            loading = false;
          }
        }
      }
    };
  })();

  React.useImperativeHandle(ref, () => ({
    clear: WaterflowRef.current?.clear,
    addIteming: WaterflowRef.current?.addIteming,
  }));

  return (
    <Columns
      {...props}
      ref={WaterflowRef}
      columnFlatListProps={props.columnFlatListProps}
      columnsFlatListProps={props.columnsFlatListProps}
      numColumns={props.numColumns}
      data={data}
      heightForItem={props.heightForItem}
      onEndReached={(e: NativeSyntheticEvent<NativeScrollEvent>) => onEndReached(e, props.onEndReached)}
      keyForItem={props.keyForItem}
      renderItem={props.renderItem}
    />
  );
};

export default React.forwardRef(WaterFlow as React.RefForwardingComponent<IColumnsHandles, IColumnsProps<any>>)
