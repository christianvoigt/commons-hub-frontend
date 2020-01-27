import { createAction, ActionsUnion } from "./IAction";
import { ItemQuery } from "./ItemQuery";

export const SET_ITEM_QUERY = "SET_ITEM_QUERY";
export const ItemQueryActions = {
    set: (itemQuery: ItemQuery) => createAction(SET_ITEM_QUERY, itemQuery)
};
export type ItemQueryActions = ActionsUnion<typeof ItemQueryActions>;
