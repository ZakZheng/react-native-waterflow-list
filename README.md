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
- `heightForItem: (item: T) => number` : 如 renderItem 高度已知,则传入以性能和加载速度
- `renderItem: { item, index }: { item: T, index: number }) => JSX.Element`
- `onEndReached?: () => Promise<any> | any` : 上拉加载, 若传入 Promise 对象, 则须等待 Promise 事件回调后方能再次触发此事件. 若其他则不作处理
- `columnsFlatListProps?: FlatListProps` : 外层 FlatList 参数
- `columnFlatListProps?: FlatListProps` : 列 FlatList 参数

## Usage Example

```javascript
import * as React from 'react';
import { View, Text, Image, RefreshControl } from 'react-native';
import { sleep } from 'react-native-waterflow-list/utils';
import WaterFlow from 'react-native-waterflow-list';

const getItemData = (() => {
  let id = 0;
  return () => {
    id++;
    const height = Math.ceil(Math.random() * 1000);
    return {
      id,
      text: Math.random(),
      image_path: `https://picsum.photos/750/${height}/?random`,
      height,
    };
  };
})();

const itemDataFactory = () =>
  Array(20)
    .fill('')
    .map(() => getItemData());

export default () => {
  const [data, setData] = React.useState([]);
  const waterFlowRef = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const loadData = React.useCallback(async () => {
    setLoading(true);
    await sleep(10);
    setLoading(false);
    // 重载列表必须调用 clear 方法
    waterFlowRef.current.clear();
    return setData(itemDataFactory());
  }, []);
  const onLoadMore = React.useCallback(async () => {
    await sleep(10);
    return setData(data.concat(itemDataFactory()));
  }, [data]);

  React.useEffect(() => {
    setData(itemDataFactory());
  }, []);
  return (
    <WaterFlow
      ref={waterFlowRef}
      data={data}
      keyForItem={item => item.id}
      numColumns={2}
      onEndReached={onLoadMore}
      columnFlatListProps={{
        keyExtractor: (item, index) => {
          return `item-${item.id}`;
        },
      }}
      columnsFlatListProps={{
        style: { marginHorizontal: 10 },
        refreshControl: (
          <RefreshControl
            style={{ zIndex: 10 }}
            refreshing={loading}
            onRefresh={loadData}
            tintColor={'gray'}
          />
        ),
      }}
      /**  如果高度已知则传此方法 */
      // heightForItem={item => {
      //   return item.height;
      // }}
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
