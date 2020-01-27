import { call, put } from "redux-saga/effects";
import fetch from "cross-fetch";
import { Geocode } from "~Geocode";
import { GeocodeFetchActions } from "./GeocodeFetchActions";
import { UIActions } from "./UIActions";
import { GeocodeSearchActions } from "./GeocodeSearchActions";
import { ActionWithPayload } from "./IAction";
import console = require("console");
import { getQueryString } from "./getQueryString";
const serviceUrl =
    process.env.REACT_APP_NOMINATIM_URL ||
    "https://nominatim.openstreetmap.org";
interface NominatimSearchResult {
    lat: number;
    lon: number;
    display_name: string;
}
export const geocodeSearchSaga = function*(
    action: ReturnType<typeof GeocodeSearchActions.search>
) {
    try {
        const queryStr = getQueryString({
            q: action.payload,
            limit: 5,
            format: "json",
            addressdetails: 1
        });

        const response: Response = yield call(
            fetch,
            serviceUrl + "/search?" + queryStr
        );
        const json: NominatimSearchResult[] = yield call([
            response,
            response.json
        ]);
        const geocodes: Geocode[] = json.map(g => ({
            name: g.display_name,
            latitude: g.lat,
            longitude: g.lon
        }));
        yield put(GeocodeFetchActions.fetchSucceeded(geocodes));
        yield put(UIActions.showGeocodesList(true));
    } catch (e) {
        yield put(GeocodeFetchActions.fetchFailed(e.message));
    }
};
const geoOptions = {
    enableHighAccuracy: true
};

const getUserLocation = () =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            location => resolve(location),
            error => reject(error),
            geoOptions
        );
    });
export const geocodeReverseSearchCurrentLocationSaga = function*(
    action: ReturnType<typeof GeocodeSearchActions.reverseSearchCurrentLocation>
) {
    if (!navigator.geolocation) {
        yield put(
            GeocodeFetchActions.fetchFailed(
                "Geolocation not supported by your browser"
            )
        );
        return;
    }

    try {
        const location = yield call(getUserLocation);
        const { latitude, longitude } = location.coords;
        yield put(GeocodeSearchActions.reverseSearch(latitude, longitude));
    } catch (e) {
        put(
            yield GeocodeFetchActions.fetchFailed(
                "Geolocation error occurred. Error code: " + e.code
            )
        );
    }
};
export const geocodeReverseSearchSaga = function*(
    action: ReturnType<typeof GeocodeSearchActions.reverseSearch>
) {
    const scale = 1;
    try {
        const queryStr = getQueryString({
            lat: action.payload.lat,
            lon: action.payload.long,
            zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
            addressdetails: 1,
            format: "json"
        });

        const response: Response = yield call(
            fetch,
            serviceUrl + "/reverse?" + queryStr
        );
        const json: NominatimSearchResult = yield call([
            response,
            response.json
        ]);
        const geocodes: Geocode[] = [
            {
                name: json.display_name,
                latitude: json.lat,
                longitude: json.lon
            }
        ];
        yield put(GeocodeFetchActions.fetchSucceeded(geocodes));
        yield put(UIActions.showGeocodesList(true));
    } catch (e) {
        yield put(GeocodeFetchActions.fetchFailed(e.message));
    }
};
