import { ActionsUnion, createAction } from "./IAction";
import { Geocode } from "~Geocode";
export const SEARCH_GEOCODE = "SEARCH_GEOCODE";
export const REVERSE_SEARCH_GEOCODE = "REVERSE_SEARCH_GEOCODE";
export const REVERSE_SEARCH_CURRENT_LOCATION =
    "REVERSE_SEARCH_CURRENT_LOCATION";
export const SELECT_GEOCODE = "SELECT_GEOCODE";
export const GeocodeSearchActions = {
    search: (query: string) => createAction(SEARCH_GEOCODE, query),
    reverseSearch: (lat: number, long: number) =>
        createAction(REVERSE_SEARCH_GEOCODE, { lat, long }),
    reverseSearchCurrentLocation: () =>
        createAction(REVERSE_SEARCH_CURRENT_LOCATION),
    selectGeocode: (geocode: Geocode) => createAction(SELECT_GEOCODE, geocode)
};
export type GeocodeSearchActions = ActionsUnion<typeof GeocodeSearchActions>;
