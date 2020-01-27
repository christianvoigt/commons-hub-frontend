import { DateStr, toDateStr } from "../DateString";
import moment from "moment";
import { RouteActions, ROUTE_RESULTS } from "./RouteActions";
import { SET_ITEM_QUERY } from "./ItemQueryActions";
import { ItemQuery } from "./ItemQuery";

const today = toDateStr(moment().startOf("day"));
const inTwoWeeks = toDateStr(
    moment()
        .startOf("day")
        .add(2, "weeks")
);
const initialState: ItemQuery = {
    address: "Berlin, Germany",
    lat: 13.404954,
    long: 52.520008,
    from: today,
    to: inTwoWeeks
};

export const itemQueryReducer = (
    state = initialState,
    action: ItemQueryActions
) => {
    switch (action.type) {
        case SET_ITEM_QUERY: {
            return action.payload as ItemQuery;
        }
        default:
            return state;
    }
};
