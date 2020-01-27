export interface IFetchState<T> {
    isFetching: boolean;
    error: string;
    // // didInvalidate: boolean;
    // lastUpdated: Date;
    data: T;
}
