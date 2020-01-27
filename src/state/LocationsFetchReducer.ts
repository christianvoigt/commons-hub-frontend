import { Location } from "../Location";
import { LocationsFetchActionTypes } from "./LocationsFetchActions";
import { createFetchReducer } from "./FetchReducerCreator";
import { IDataTable } from "./IDataTable";
const initialData: IDataTable<Location> = null;
export const locationsFetchReducer = createFetchReducer(
    initialData,
    LocationsFetchActionTypes
);
