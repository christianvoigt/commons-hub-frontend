import { takeLatest, put, select, take } from "redux-saga/effects";
import {
    SEARCH_GEOCODE,
    REVERSE_SEARCH_GEOCODE,
    REVERSE_SEARCH_CURRENT_LOCATION,
    SELECT_GEOCODE,
    GeocodeSearchActions
} from "./GeocodeSearchActions";
import {
    geocodeSearchSaga,
    geocodeReverseSearchSaga,
    geocodeReverseSearchCurrentLocationSaga
} from "./GeocodeSagas";
import { UIActions } from "./UIActions";
import { RouteActions, ROUTE_RESULTS } from "./RouteActions";
import { CHState } from "~index";
import { toDateStr } from "../DateString";
import moment = require("moment");
import { ItemQuery } from "./ItemQuery";
import { ItemQueryActions } from "./ItemQueryActions";
import { ItemsFetchActions, ItemsFetchActionTypes } from "./ItemsFetchActions";
import { itemQueryChangeSaga } from "./ItemQueryChangeSaga";
import { fetchItemsAndLocationsSaga } from "./FetchItemsAndLocationsSaga";

function* selectGeocodeSaga(
    action: ReturnType<typeof GeocodeSearchActions.selectGeocode>
) {
    yield put(UIActions.showGeocodesList(false));
    yield put(
        RouteActions.results(
            {
                lat: action.payload.latitude.toString(),
                long: action.payload.longitude.toString()
            },
            {}
        )
    );
}

export default function* mainSaga() {
    yield takeLatest(SEARCH_GEOCODE, geocodeSearchSaga);
    yield takeLatest(REVERSE_SEARCH_GEOCODE, geocodeReverseSearchSaga);
    yield takeLatest(SELECT_GEOCODE, selectGeocodeSaga);
    yield takeLatest(
        ItemsFetchActionTypes.REQUESTED,
        fetchItemsAndLocationsSaga
    );
    yield takeLatest(ROUTE_RESULTS, itemQueryChangeSaga);
    yield takeLatest(
        REVERSE_SEARCH_CURRENT_LOCATION,
        geocodeReverseSearchCurrentLocationSaga
    );
}

export function* headerSaga() {
    yield takeLatest(SEARCH_GEOCODE, geocodeSearchSaga);
    yield takeLatest(REVERSE_SEARCH_GEOCODE, geocodeReverseSearchSaga);
    yield takeLatest(SELECT_GEOCODE, selectGeocodeSaga);
    yield takeLatest(ROUTE_RESULTS, itemQueryChangeSaga);
    yield takeLatest(
        REVERSE_SEARCH_CURRENT_LOCATION,
        geocodeReverseSearchCurrentLocationSaga
    );
}

export const CDATA_REQUESTED = "CDATA_REQUESTED";
