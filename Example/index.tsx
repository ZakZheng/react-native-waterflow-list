import * as React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import WaterFlow from '../src/WaterFlow';

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

export default () => {
  const [data, setData] = React.useState([]);

  const onLoadMore = React.useCallback(async () => {
    await sleep(1000);
    return setData(data.concat(itemDataFactory()));
  }, [data]);

  React.useEffect(() => {
    setData(itemDataFactory());
  }, []);

  return (
    <WaterFlow
      data={data}
      keyForItem={item => item.id}
      numColumns={2}
      onEndReached={onLoadMore}
      onRefresh={clear => {
        clear();
        setData(itemDataFactory());
      }}
      renderItem={({ item }) => {
        return (
          <>
            <Image
              style={{ height: item.height, width: item.width }}
              source={{ uri: item.image_path }}></Image>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ID:{item.id}</Text>
            <Text>{item.text}</Text>
          </>
        );
      }}
    />
  );
};
