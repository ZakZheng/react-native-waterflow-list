import * as React from 'react'
import {
  View,
  FlatList,
} from 'react-native';

export function Colunm({ columnFlatListProps, ...props }: any) {
  return (
    <FlatList
      removeClippedSubviews={true}
      style={{ flex: 1 }}
      {...columnFlatListProps}
      {...props}
      renderItem={({ item, index }: {
        item: { onLayout: () => void },
        index: number
      }) => {
        return <View onLayout={item.onLayout}>
          {props.renderItem({ item, index })}
        </View>
      }}
    />
  );
}