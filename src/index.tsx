import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Columns, { IColumnsHandles, IColumnsProps, } from './Columns';
import { checkScrollEnd, isPromise } from './utils';

export interface IWaterflowProps<T> {
  data: T[]
  numColumns: number
  keyForItem: IColumnsProps<T>['keyForItem'] // 用以上拉加载时检查该数据是否已渲染
  heightForItem?: IColumnsProps<T>['heightForItem'] // renderItem 高度确定使用
  renderItem: IColumnsProps<T>['renderItem']

  columnsFlatListProps?: IColumnsProps<T>['columnsFlatListProps']
  columnFlatListProps: IColumnsProps<T>['columnFlatListProps']
  onEndReached: () => Promise<any>
}


const WaterFlow = <T extends {}>(props: IWaterflowProps<T>, ref: typeof React.useRef) => {
  const data = props.data || [];

  const WaterflowRef = React.useRef({} as IColumnsHandles);

  /**
   * 上拉加载, 传入一个 Promise 回调, 请求完成后才允许再次触发回调
   * 如果回调不为一个 Promise 对象, 则不做拦截处理
   */
  const onEndReached = React.useCallback(
    (() => {
      let loading = false;
      // 使用 onScroll 代替 onEndReached, 避免有时无法触发 bug
      return async (event: NativeSyntheticEvent<NativeScrollEvent>, cb: () => Promise<any>) => {
        // 请求中和 renderItem 未加载完全时无法再次触发回调
        if (loading || WaterflowRef.current?.addIteming) { return };
        if (checkScrollEnd(event)) {
          loading = true;
          if (typeof cb === 'function') {
            const tempCb = cb();
            if (isPromise(tempCb)) {
              // tslint:disable-next-line:no-console
              try { await tempCb } catch (err) { console.error(err) }
              loading = false;
            } else {
              loading = false;
            }
          }
        }
      };
    })(), []);


  React.useImperativeHandle(ref, () => ({
    clear: WaterflowRef.current?.clear,
    addIteming: WaterflowRef.current?.addIteming,
  }));

  return (
    <Columns
      {...props}
      ref={WaterflowRef}
      data={data}
      onEndReached={(e: NativeSyntheticEvent<NativeScrollEvent>) => onEndReached(e, props.onEndReached)}
    />
  );
};

export default React.forwardRef(WaterFlow as React.RefForwardingComponent<IColumnsHandles, IColumnsProps<any>>)
