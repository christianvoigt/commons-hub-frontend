import {
    UIActions,
    SHOW_GEOCODES_LIST,
    SHOW_FILTERS,
    SHOW_PERIOD_PICKER
} from "./UIActions";

export interface UIState {
    showGeocodesList: boolean;
    showFilters: boolean;
    showPeriodPicker: boolean;
}
export const uiReducer = (
    s: UIState = {
        showGeocodesList: false,
        showFilters: false,
        showPeriodPicker: false
    },
    action: UIActions
) => {
    switch (action.type) {
        case SHOW_GEOCODES_LIST:
            return {
                ...s,
                showGeocodesList: action.payload,
                showFilters: false,
                showPeriodPicker: false
            };
        case SHOW_FILTERS:
            return {
                ...s,
                showFilters: action.payload,
                showGeocodesList: false,
                showPeriodPicker: false
            };
        case SHOW_PERIOD_PICKER:
            return {
                ...s,
                showPeriodPicker: action.payload,
                showFilters: false,
                showGeocodesList: false
            };
        default:
            return s;
    }
};
