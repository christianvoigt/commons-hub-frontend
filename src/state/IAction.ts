import { ActionCreatorsMapObject } from "redux";

export interface Action<T extends string> {
    type: T;
}
export interface ActionWithPayload<T extends string, P> extends Action<T> {
    payload: P;
}
export interface ActionWithQuery<T extends string, P, Q>
    extends ActionWithPayload<T, P> {
    meta: {
        query: Q;
    };
}
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
    type: T,
    payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P, Q>(
    type: T,
    payload: P,
    query: Q
): ActionWithQuery<T, P, Q>;
export function createAction<T extends string, P, Q>(
    type: T,
    payload?: P,
    query?: Q
) {
    if (payload === undefined) {
        return { type };
    } else if (query === undefined) {
        return { type, payload };
    } else {
        return { type, payload, meta: { query } };
    }
}
export type ActionsUnion<T extends ActionCreatorsMapObject> = ReturnType<
    T[keyof T]
>;
export type ActionByType<TActionUnion, TActionType> = TActionUnion extends {
    type: TActionType;
}
    ? TActionUnion
    : never;
