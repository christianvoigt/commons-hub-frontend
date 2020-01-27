import { RouteActions } from "./RouteActions";
import { toDateStr } from "../DateString";
import { ItemQuery } from "./ItemQuery";
import { ItemsFetchActions } from "./ItemsFetchActions";
import { ItemQueryActions } from "./ItemQueryActions";
import moment = require("moment");
import { put, select } from "redux-saga/effects";
import console = require("console");
import { CHState } from "~index";
import { ActionWithQuery, ActionWithPayload } from "./IAction";
import { FilterAvailableItemsAction } from "./FilterAvailableItemsAction";

const today = toDateStr(moment().startOf("day"));
const inTwoWeeks = toDateStr(
    moment()
        .startOf("day")
        .add(2, "weeks")
);
export const itemQueryChangeSaga = function* (
    action: ReturnType<typeof RouteActions.results>
) {
    const long = parseFloat(action.payload.long);
    const lat = parseFloat(action.payload.lat);
    const from = action.payload.from ? toDateStr(action.payload.from) : today;
    const to = action.payload.to ? toDateStr(action.payload.to) : inTwoWeeks;
    let itemType = null;
    let features = null;
    let onlyNonCommercial = false;
    let minBoxDimensions = null;
    let minLoadCapacity = null;
    if (action.meta && action.meta.query) {
        if (action.meta.query.itemType) {
            itemType = action.meta.query.itemType;
        }
        if (action.meta.query.features) {
            if (Array.isArray(action.meta.query.features)) {
                features = action.meta.query.features;
            } else {
                features = [action.meta.query.features];
            }
        }
        if (action.meta.query.onlyNonCommercial) {
            onlyNonCommercial = action.meta.query.onlyNonCommercial == "true";
        }
        if (
            action.meta.query.minBoxWidth ||
            action.meta.query.minBoxHeight ||
            action.meta.query.minBoxLength
        ) {
            minBoxDimensions = {
                width: parseFloat(action.meta.query.minBoxWidth) || 0,
                height: parseFloat(action.meta.query.minBoxHeight) || 0,
                length: parseFloat(action.meta.query.minBoxLength) || 0
            };
        }
        if (action.meta.query.minLoadCapacity) {
            minLoadCapacity = parseFloat(action.meta.query.minLoadCapacity);
        }
    }
    // redirect if dates are out of currently indexed range
    if (from < today || from > to || to > inTwoWeeks) {
        yield put(
            RouteActions.results(
                { long: action.payload.long, lat: action.payload.lat },
                action.meta ? { ...action.meta.query } : {}
            )
        );
        return;
    }
    const newItemQuery: ItemQuery = {
        lat,
        long,
        from,
        to,
        itemType,
        features,
        onlyNonCommercial,
        minBoxDimensions,
        minLoadCapacity
    };
    const oldItemQuery = yield select((s: CHState) => s.itemQuery);
    console.log(oldItemQuery);
    yield put(ItemQueryActions.set(newItemQuery));
    if (
        !oldItemQuery ||
        newItemQuery.lat !== oldItemQuery.lat ||
        newItemQuery.long !== oldItemQuery.long ||
        newItemQuery.from !== oldItemQuery.from ||
        newItemQuery.to !== oldItemQuery.to
    ) {
        yield put(ItemsFetchActions.fetchRequested());
    } else {
        const items = yield select((s: CHState) => s.items.data);
        yield put(FilterAvailableItemsAction.create(newItemQuery, items));
    }
};
