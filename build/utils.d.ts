import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
export declare function flat(arr: any[]): any[];
export declare function isPromise(e: Promise<any>): boolean;
export declare function sleep(ms: number): Promise<unknown>;
export declare function checkScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>): boolean;
