import * as React from 'react';
import { FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
interface IFlatListProps<T> extends FlatListProps<T> {
    data?: any;
    renderItem?: any;
}
export interface IColumnsProps<T> {
    asyncHeightForItem?: (item: T) => Promise<number>;
    numColumns: number;
    heightForItem?: (item: T) => number;
    data: T[];
    renderItem: ({ item, index }: {
        item: T;
        index: number;
    }) => JSX.Element;
    keyForItem: (item: T) => string;
    onEndReached: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    columnsFlatListProps?: IFlatListProps<T>;
    columnFlatListProps?: IFlatListProps<T>;
}
export interface IColumnsHandles {
    clear: () => void;
    addIteming: boolean;
}
declare const _default: React.ForwardRefExoticComponent<IColumnsProps<any> & React.RefAttributes<IColumnsHandles>>;
export default _default;
