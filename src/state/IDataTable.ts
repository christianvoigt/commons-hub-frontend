export interface IDataTable<T> {
    byId: {
        [key: string]: T;
    };
    allIds: string[];
}
