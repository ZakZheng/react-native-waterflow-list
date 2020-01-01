import * as React from 'react'
import {
  View,
  FlatList,
} from 'react-native';

export function Colunm({ columnFlatListProps, renderItem, ...props }: any) {
  return (
    <FlatList
      removeClippedSubviews={true}
      {...props}
      {...columnFlatListProps}
      style={[{ flex: 1, }, { ...columnFlatListProps?.style }]}
      renderItem={({ item, index }: {
        item: { onLayout: () => void },
        index: number
      }) => {
        return <View onLayout={item.onLayout}>
          {renderItem({ item, index })}
        </View>
      }}
    />
  );
}