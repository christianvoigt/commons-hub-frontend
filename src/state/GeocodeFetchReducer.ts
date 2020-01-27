import { Geocode } from "../Geocode";
import { GeocodeFetchActionTypes } from "./GeocodeFetchActions";
import { createFetchReducer } from "./FetchReducerCreator";
const initialData: Geocode[] = [];
export const geocodeFetchReducer = createFetchReducer(
    initialData,
    GeocodeFetchActionTypes
);
