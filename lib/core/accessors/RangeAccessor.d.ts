import { ObjectState } from '../state';
import { FieldOptions, FieldContext } from '../query';
import { FilterBasedAccessor } from './FilterBasedAccessor';
export interface RangeAccessorOptions {
    title: string;
    id: string;
    min: number;
    max: number;
    interval?: number;
    field: string;
    loadHistogram?: boolean;
    fieldOptions?: FieldOptions;
    rangeFormatter?: Function;
    translations?: Record<string, any>;
}
export declare class RangeAccessor extends FilterBasedAccessor<ObjectState> {
    options: any;
    state: ObjectState;
    fieldContext: FieldContext;
    static translations: any;
    translations: any;
    constructor(key: any, options: RangeAccessorOptions);
    getSelectedValue(value: any): string;
    buildSharedQuery(query: any): any;
    getBuckets(): any;
    isDisabled(): boolean;
    getInterval(): any;
    buildOwnQuery(query: any): any;
}
