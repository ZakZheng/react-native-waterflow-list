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
      /**  如果高度已知则传此方法 */
      // heightForItem={item => {
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
