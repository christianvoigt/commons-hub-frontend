import { createAction, ActionsUnion } from "./IAction";

export const SHOW_GEOCODES_LIST = "SHOW_GEOCODES_LIST";
export const SHOW_FILTERS = "SHOW_FILTERS";
export const SHOW_PERIOD_PICKER = "SHOW_PERIOD_PICKER";
export const UIActions = {
    showGeocodesList: (show: boolean = true) =>
        createAction(SHOW_GEOCODES_LIST, show),
    showFilters: (show: boolean = true) => createAction(SHOW_FILTERS, show),
    showPeriodpicker: (show: boolean = true) =>
        createAction(SHOW_PERIOD_PICKER, show)
};
export type UIActions = ActionsUnion<typeof UIActions>;
