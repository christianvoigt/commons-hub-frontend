import {
    createFetchActionsCreator,
    createFetchActionTypes
} from "./FetchActionsCreator";
import { ActionsUnion, createAction } from "./IAction";
import { Geocode } from "~Geocode";
import { Location } from "~Location";
import { IDataTable } from "./IDataTable";
export const LocationsFetchActionTypes = createFetchActionTypes(
    "LOCATIONS_FETCH_REQUESTED",
    "LOCATIONS_FETCH_FAILED",
    "LOCATIONS_FETCH_SUCCEEDED"
);
export const LocationsFetchActions = createFetchActionsCreator(
    LocationsFetchActionTypes
)<IDataTable<Location>>();
export type LocationsFetchActions = ActionsUnion<typeof LocationsFetchActions>;
