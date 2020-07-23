# react-native-waterflow-list ( 瀑布流列表 )

> 基于 RN0.60.5, Typescript3.7.4, React Hooks 实现

一个使用 FlatList 嵌套实现的瀑布流插件 , 允许传入高度未知的 renderItem. 插件内部使用 onLayout 获取每一个 renderItem 高度, 并插入列表后.

## ScreenShots

<p float="left">
<img src="./android.gif" width="25%">
<img src="./ios.gif" width="25%">
</p>

## Getting started

```bash
$ npm install react-native-waterflow-list --save
```

or

```bash
$ yarn add react-native-waterflow-list
```

### mehods

- `clear` : 清空渲染列表, 一般用于下拉刷新获取到数据化,清空之前的数据

### options

- `data: T[]` : 列表数据, 数据类型必须为 `Object`
- `numColumns: number` : 列数
- `keyForItem: (item: T) => string` : 用以检测是否以渲染该数据
- `asyncHeightForItem: boolean`: 允许 heightForItem 为异步函数
- `heightForItem: (item: T) => Promise<number> | number` : 如 renderItem 高度已知,则传入以性能和加载速度, 允许使用异步
- `renderItem: { item, index }: { item: T, index: number }) => JSX.Element`
- `onEndReached?: () => Promise<any> | any` : 上拉加载, 若传入 Promise 对象, 则须等待 Promise 事件回调后方能再次触发此事件. 若其他则不作处理
- `columnsFlatListProps?: FlatListProps` : 外层 FlatList 参数
- `columnFlatListProps?: FlatListProps` : 列 FlatList 参数

## Usage Example

```javascript
import * as React from 'react';
import { Dimensions, Image, RefreshControl, Text, View } from 'react-native';
import { IColumnsHandles } from 'react-native-waterflow-list/src/Columns';
import WaterFlow from 'react-native-waterflow-list/src/';

const width = (Dimensions.get('screen').width - 30) / 2;

const getItemData = (() => {
  let id = 0;
  return () => {
    id++;
    const height = Math.ceil(Math.random() * 1000);
    return {
      id,
      text: Math.random(),
      image_path: `https://picsum.photos/${width}/${height}/?random`,
      height,
      width,
    };
  };
})();

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const itemDataFactory = () =>
  Array(10)
    .fill('')
    .map(() => getItemData());

interface IItem {
  id: number
  [index: string]: any
}

export default () => {
  const [data, setData] = React.useState<IItem[]>([]);
  const [loading, setLoading] = React.useState(false)

  const WaterFlowRef = React.useRef<IColumnsHandles>()
  const onLoadMore = React.useCallback(async () => {
    setLoading(true)
    await sleep(1000);
    setLoading(false)
    return setData(data.concat(itemDataFactory()));
  }, [data]);
  const loadData = React.useCallback(async () => {
    await sleep(1000);
    return setData(itemDataFactory());
  }, [data])

  React.useEffect(() => {
    setData(itemDataFactory());
  }, []);

  return (
    <WaterFlow
      ref={WaterFlowRef}
      data={data}
      keyForItem={item => item.id}
      numColumns={2}
      onEndReached={onLoadMore}
      /** 允许heightForItem为异步函数
      // removeClippedSubviews={true}
      /**  如果高度已知则传此方法 */
      // heightForItem={async item => {
      //   await sleep(1000);
      //   return item.height;
      // }}
      columnFlatListProps={{
        style: { marginHorizontal: 5, },
      }}
      columnsFlatListProps={{
        ListHeaderComponent: () => <View><Text>Hello</Text></View>,
        refreshControl: <RefreshControl
          style={{ zIndex: 10 }}
          refreshing={loading}
          onRefresh={() => {
            WaterFlowRef.current?.clear()
            loadData()
          }}
          tintColor={'gray'}
        />
        ,
        style: { marginHorizontal: 10, },
      }}
      renderItem={({ item, index }) => {
        return renderItem(item);
      }}
    />
  );
};

const renderItem = item => {
  return (
    <View style={{ marginHorizontal: 5, paddingTop: 10 }}>
      <Image style={{ height: item.height, width: `100%` }} source={{ uri: item.image_path }} />
      <Text>ID:{item.id}</Text>
      <Text>{item.text}</Text>
    </View>
  );
};

```
