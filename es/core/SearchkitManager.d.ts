import { ImmutableQuery } from './query';
import { BaseQueryAccessor } from './accessors';
import { AccessorManager } from './AccessorManager';
import { ESTransport } from './transport';
import { SearchRequest } from './SearchRequest';
import { EventEmitter, GuidGenerator } from './support';
export interface SearchkitOptions {
    useHistory?: boolean;
    createHistory?: Function;
    getLocation?: Function;
    searchOnLoad?: boolean;
    httpHeaders?: Record<string, any>;
    basicAuth?: string;
    transport?: ESTransport;
    searchUrlPath?: string;
    timeout?: number;
    withCredentials?: boolean;
    defaultSize?: number;
}
export interface InitialState {
    results?: Record<string, any>;
    state?: Record<string, any>;
}
export declare class SearchkitManager {
    host: string;
    private registrationCompleted;
    completeRegistration: Function;
    state: any;
    translateFunction: Function;
    currentSearchRequest: SearchRequest;
    history: any;
    guidGenerator: GuidGenerator;
    _unlistenHistory: Function;
    options: SearchkitOptions;
    transport: ESTransport;
    emitter: EventEmitter;
    resultsEmitter: EventEmitter;
    accessors: AccessorManager;
    queryProcessor: Function;
    shouldPerformSearch: Function;
    query: ImmutableQuery;
    loading: boolean;
    initialLoading: boolean;
    error: any;
    results: any;
    static mock(options?: {}): SearchkitManager;
    constructor(host: string, options?: SearchkitOptions, initialState?: InitialState);
    setupListeners(): void;
    addAccessor(accessor: any): any;
    removeAccessor(accessor: any): void;
    addDefaultQuery(fn: Function): any;
    setQueryProcessor(fn: Function): void;
    translate(key: any): any;
    buildQuery(): any;
    resetState(): void;
    addResultsListener(fn: any): () => void;
    unlistenHistory(): void;
    listenToHistory(): void;
    _searchWhenCompleted(location: any): void;
    runInitialSearch(): void;
    searchFromUrlQuery(query: any): any;
    performSearch(replaceState?: boolean, notifyState?: boolean): any;
    buildSearchUrl(extraParams?: {}): string;
    reloadSearch(): any;
    search(replaceState?: boolean): any;
    getResultsAndState(): {
        results: any;
        state: any;
    };
    _search(): any;
    setResults(results: any): void;
    compareResults(previousResults: any, results: any): void;
    guid(prefix: any): string;
    getHits(): any;
    getHitsCount(): any;
    getTime(): any;
    getSuggestions(): any;
    getQueryAccessor(): BaseQueryAccessor;
    getAccessorsByType(type: any): any;
    getAccessorByType(type: any): any;
    hasHits(): boolean;
    hasHitsChanged(): any;
    setError(error: any): void;
    onResponseChange(): void;
}
