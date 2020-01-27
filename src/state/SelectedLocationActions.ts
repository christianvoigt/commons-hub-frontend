import { createAction, ActionsUnion } from "./IAction";

export const SELECT_LOCATION = "SELECT_LOCATION";
export const DESELECT_LOCATION = "DESELECT_LOCATION";
export const SelectedLocationActions = {
    select: (locationId: string) => createAction(SELECT_LOCATION, locationId),
    deselect: () => createAction(DESELECT_LOCATION)
};
export type SelectedLocationActions = ActionsUnion<
    typeof SelectedLocationActions
>;
