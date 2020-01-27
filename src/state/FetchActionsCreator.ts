import {
    createAction,
    ActionsUnion,
    Action,
    ActionWithPayload
} from "./IAction";

export interface FetchActionTypes<
    TRequested extends string,
    TFailed extends string,
    TSucceeded extends string
> {
    [key: string]: string;
    REQUESTED: TRequested;
    FAILED: TFailed;
    SUCCEEDED: TSucceeded;
}
export interface FetchActions<
    TData,
    TRequested extends string,
    TFailed extends string,
    TSucceeded extends string
> {
    fetchRequested: () => Action<TRequested>;
    fetchFailed: () => Action<TFailed>;
    fetchSucceeded: () => ActionWithPayload<TSucceeded, TData>;
}
export type FetchActionUnion<
    TData,
    TRequested extends string,
    TFailed extends string,
    TSucceeded extends string
> =
    | Action<TRequested>
    | ActionWithPayload<TFailed, string>
    | ActionWithPayload<TSucceeded, { data: TData; receivedAt: Date }>;

export function createFetchActionTypes<
    TRequested extends string,
    TFailed extends string,
    TSucceeded extends string
>(
    requestedActionType: TRequested,
    failedActionType: TFailed,
    succeededActionType: TSucceeded
): FetchActionTypes<TRequested, TFailed, TSucceeded> {
    return {
        REQUESTED: requestedActionType,
        FAILED: failedActionType,
        SUCCEEDED: succeededActionType
    };
}

export function createFetchActionsCreator<
    TRequested extends string,
    TFailed extends string,
    TSucceeded extends string
>(actionTypes: FetchActionTypes<TRequested, TFailed, TSucceeded>) {
    return <TData>() => {
        return {
            fetchRequested: () => createAction(actionTypes.REQUESTED),
            fetchFailed: (message: string) =>
                createAction(actionTypes.FAILED, message),
            fetchSucceeded: (data: TData) =>
                createAction(actionTypes.SUCCEEDED, {
                    data,
                    receivedAt: new Date()
                })
        };
    };
}
