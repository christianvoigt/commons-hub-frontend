import {
    createFetchActionsCreator,
    createFetchActionTypes
} from "./FetchActionsCreator";
import { ActionsUnion, createAction } from "./IAction";
import { Geocode } from "~Geocode";
import { Item } from "~Item";
import { IDataTable } from "./IDataTable";
export const ItemsFetchActionTypes = createFetchActionTypes(
    "ITEMS_FETCH_REQUESTED",
    "ITEMS_FETCH_FAILED",
    "ITEMS_FETCH_SUCCEEDED"
);
export const ItemsFetchActions = createFetchActionsCreator(
    ItemsFetchActionTypes
)<IDataTable<Item>>();
export type ItemsFetchActions = ActionsUnion<typeof ItemsFetchActions>;
