import { Item } from "../Item";
import { ItemsFetchActionTypes } from "./ItemsFetchActions";
import { createFetchReducer } from "./FetchReducerCreator";
import { IDataTable } from "./IDataTable";
const initialData: IDataTable<Item> = null;
export const itemsFetchReducer = createFetchReducer(
    initialData,
    ItemsFetchActionTypes
);
