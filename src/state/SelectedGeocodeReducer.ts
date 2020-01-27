import { Geocode } from "~Geocode";
import { GeocodeSearchActions, SELECT_GEOCODE } from "./GeocodeSearchActions";

export const selectedGeocodeReducer = (
    s: Geocode = null,
    action: ReturnType<typeof GeocodeSearchActions.selectGeocode>
) => {
    switch (action.type) {
        case SELECT_GEOCODE:
            return action.payload;
        default:
            return s;
    }
};
