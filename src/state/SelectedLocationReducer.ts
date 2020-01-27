import { UIActions, SHOW_GEOCODES_LIST, SHOW_FILTERS } from "./UIActions";
import {
    SelectedLocationActions,
    DESELECT_LOCATION,
    SELECT_LOCATION
} from "./SelectedLocationActions";

export const selectedLocationReducer = (
    s: string = null,
    action: SelectedLocationActions
) => {
    switch (action.type) {
        case SELECT_LOCATION:
            return action.payload;
        case DESELECT_LOCATION:
            return null;
        default:
            return s;
    }
};
