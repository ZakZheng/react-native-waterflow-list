import * as React from 'react'
import { FlatList, View, } from 'react-native';

export function Colunm({ columnFlatListProps, renderItem, ...props }: any) {
  return (
    <FlatList
      removeClippedSubviews={true}
      {...props}
      {...columnFlatListProps}
      style={[{ flex: 1, }, { ...columnFlatListProps?.style }]}
      renderItem={({ item, index }: {
        item: { onLayout: () => void, _keyForItem_: string },
        index: number
      }) => {
        return <View
          key={item._keyForItem_}
          onLayout={item.onLayout}>
          {renderItem({ item, index })}
        </View>
      }}
    />
  );
}