import { Action, ActionsUnion, ActionWithPayload } from "./IAction";
import { ActionCreatorsMapObject } from "redux";
import {
    FetchActionTypes,
    FetchActions,
    FetchActionUnion
} from "./FetchActionsCreator";
import { IFetchState } from "./IFetchState";
export function createFetchReducer<
    TData,
    TRequested extends string,
    TFailed extends string,
    TSucceeded extends string
>(
    initialData: TData,
    actionTypes: FetchActionTypes<TRequested, TFailed, TSucceeded>
) {
    return (
        state: IFetchState<TData> = {
            isFetching: false,
            error: null,
            // didInvalidate: false,
            data: initialData
            // lastUpdated: new Date()
        },
        action: FetchActionUnion<TData, TRequested, TFailed, TSucceeded>
    ) => {
        switch (action.type) {
            // case actionTypes.INVALIDATED:
            //     return {
            //         ...state,
            //         didInvalidate: true
            //     };
            case actionTypes.REQUESTED:
                return {
                    ...state,
                    error: null,
                    isFetching: true
                    // didInvalidate: false
                };
            case actionTypes.SUCCEEDED:
                const succAction = action as any;
                return {
                    ...state,
                    isFetching: false,
                    error: null,
                    // didInvalidate: false,
                    data: succAction.payload.data
                    // lastUpdated: succAction.payload.receivedAt
                };
            case actionTypes.FAILED:
                const errAction = action as any;
                return { ...state, error: errAction.payload };
            default:
                return state;
        }
    };
}
