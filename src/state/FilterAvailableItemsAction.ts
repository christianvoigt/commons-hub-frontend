import { createAction, ActionsUnion } from "./IAction";
import { ItemQuery } from "./ItemQuery";
import { IDataTable } from "./IDataTable";
import { Item } from "~Item";

export const FILTER_AVAILABLE_ITEMS = "FILTER_AVAILABLE_ITEMS";
export const FilterAvailableItemsAction = {
    create: (itemQuery: ItemQuery, items: IDataTable<Item>) =>
        createAction(FILTER_AVAILABLE_ITEMS, { itemQuery, items })
};
export type FilterAvailableItemsAction = ActionsUnion<
    typeof FilterAvailableItemsAction
>;
