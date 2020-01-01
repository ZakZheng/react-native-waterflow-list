import { Dimensions, NativeSyntheticEvent, NativeScrollEvent, } from 'react-native';

// 扁平化数组
export function flat(arr: any[]) {
  let arrResult: any[] = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      arrResult = arrResult.concat(flat(item));   // 递归
      // 或者用扩展运算符
      // arrResult.push(...arguments.callee(item));
    } else {
      arrResult.push(item);
    }
  });
  return arrResult;
}

export function isPromise(e: Promise<any>) {
  return !!e && typeof e.then === 'function';
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function checkScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
  let y = event.nativeEvent.contentOffset.y;
  let height = event.nativeEvent.layoutMeasurement.height;
  let contentHeight = event.nativeEvent.contentSize.height;
  return y + height >= contentHeight - Dimensions.get('screen').height
}