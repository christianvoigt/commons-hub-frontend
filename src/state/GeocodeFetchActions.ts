import {
    createFetchActionsCreator,
    createFetchActionTypes
} from "./FetchActionsCreator";
import { ActionsUnion, createAction } from "./IAction";
import { Geocode } from "~Geocode";
export const GeocodeFetchActionTypes = createFetchActionTypes(
    "GEOCODE_FETCH_REQUESTED",
    "GEOCODE_FETCH_FAILED",
    "GEOCODE_FETCH_SUCCEEDED"
);
export const GeocodeFetchActions = createFetchActionsCreator(
    GeocodeFetchActionTypes
)<Geocode[]>();
export type GeocodeFetchActions = ActionsUnion<typeof GeocodeFetchActions>;
