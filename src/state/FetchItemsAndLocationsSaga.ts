import { call, put, select } from "redux-saga/effects";
import fetch from "cross-fetch";
import { CHState } from "~index";
import { ItemsFetchActions } from "./ItemsFetchActions";
import { Item } from "~Item";
import { IDataTable } from "./IDataTable";
import { LocationsFetchActions } from "./LocationsFetchActions";
import { Location } from "~Location";
import { FilterAvailableItemsAction } from "./FilterAvailableItemsAction";
const chEndpoint =
    process.env.REACT_APP_CH_BACKEND_URL || "http://localhost:8082";

export const fetchItemsAndLocationsSaga = function*() {
    yield put(LocationsFetchActions.fetchRequested());
    try {
        const itemQuery = yield select((s: CHState) =>
            s.itemQuery ? s.itemQuery : null
        );
        const response: Response = yield call(
            fetch,
            `${chEndpoint}/query/?lat=${itemQuery.lat}&long=${itemQuery.long}&start=${itemQuery.from}&end=${itemQuery.to}`
        );
        const json = yield call([response, response.json]);
        const items = createDataTable(json.items as Item[]);
        yield put(ItemsFetchActions.fetchSucceeded(items));
        const locationsDataTable = createDataTable(
            json.locations as Location[]
        );
        const availability = json.availability as {
            item: string;
            location: string;
        }[];
        availability.reduce((locations, currSlot, i) => {
            const itemId = currSlot.item;
            const locationId = currSlot.location;
            const location = locations.byId[locationId];
            location.availableItems = location.availableItems
                ? location.availableItems
                : [];
            if (location.availableItems.indexOf(itemId) == -1) {
                location.availableItems.push(itemId);
            }
            return locations;
        }, locationsDataTable);
        yield put(LocationsFetchActions.fetchSucceeded(locationsDataTable));
        yield put(FilterAvailableItemsAction.create(itemQuery, items));
    } catch (e) {
        yield put(ItemsFetchActions.fetchFailed(e.message));
        yield put(LocationsFetchActions.fetchFailed(e.message));
    }
};
export interface HasId {
    _id: string;
}
function createDataTable<TData extends HasId>(
    data: TData[]
): IDataTable<TData> {
    return data.reduce(
        (acc, curr) => {
            acc.byId[curr._id] = curr;
            acc.allIds.push(curr._id);
            return acc;
        },
        { byId: {}, allIds: [] } as IDataTable<TData>
    );
}
