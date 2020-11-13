import { ArrayState } from '../state';
import { BoolMust, FieldContext, FieldOptions } from '../query';
import { FilterBasedAccessor } from './FilterBasedAccessor';
export interface FacetAccessorOptions {
    operator?: string;
    title?: string;
    id?: string;
    field: string;
    size: number;
    facetsPerPage?: number;
    translations?: Record<string, any>;
    include?: Array<string> | string;
    exclude?: Array<string> | string;
    orderKey?: string;
    orderDirection?: string;
    min_doc_count?: number;
    loadAggregations?: boolean;
    fieldOptions?: FieldOptions;
}
export interface ISizeOption {
    label: string;
    size: number;
}
export declare class FacetAccessor extends FilterBasedAccessor<ArrayState> {
    state: ArrayState;
    options: any;
    defaultSize: number;
    size: number;
    uuid: string;
    loadAggregations: boolean;
    fieldContext: FieldContext;
    static translations: any;
    translations: any;
    constructor(key: any, options: FacetAccessorOptions);
    getRawBuckets(): any;
    getBuckets(): any[];
    getDocCount(): any;
    getCount(): number;
    setViewMoreOption(option: ISizeOption): void;
    getMoreSizeOption(): ISizeOption;
    isOrOperator(): boolean;
    getBoolBuilder(): typeof BoolMust;
    getOrder(): {
        [x: number]: any;
    };
    buildSharedQuery(query: any): any;
    buildOwnQuery(query: any): any;
}
