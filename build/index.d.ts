import { IColumnsProps } from './Columns';
export interface IWaterflowProps<T> {
    data: T[];
    numColumns: number;
    keyForItem: IColumnsProps<T>['keyForItem'];
    heightForItem?: IColumnsProps<T>['heightForItem'];
    renderItem: IColumnsProps<T>['renderItem'];
    columnsFlatListProps?: IColumnsProps<T>['columnsFlatListProps'];
    columnFlatListProps?: IColumnsProps<T>['columnFlatListProps'];
    onEndReached: () => Promise<any>;
}
declare const _default: any;
export default _default;
