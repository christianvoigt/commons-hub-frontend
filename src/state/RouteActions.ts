import { createAction, ActionsUnion } from "~state/IAction";
import { ItemQuery } from "./ItemQuery";
export const ROUTE_HOME = "ROUTE_HOME" as "ROUTE_HOME";
export const ROUTE_RESULTS = "ROUTE_RESULTS" as "ROUTE_RESULTS";
export interface IResultsActionPayload {
    long: string;
    lat: string;
    from?: string;
    to?: string;
}
export interface IResultsActionQuery {
    itemType?: string;
    features?: string[];
    onlyNonCommercial?: string;
    minLoadCapacity?: string;
    minBoxWidth?: string;
    minBoxHeight?: string;
    minBoxLength?: string;
}

export const RouteActions = {
    results: (payload: IResultsActionPayload, query: IResultsActionQuery) =>
        createAction(ROUTE_RESULTS, payload, query),
    resultsFromItemQuery: ({
        from,
        to,
        long,
        lat,
        itemType,
        features,
        onlyNonCommercial,
        minBoxDimensions,
        minLoadCapacity
    }: ItemQuery) => {
        const pathParams: {
            from?: string;
            to?: string;
            long: string;
            lat: string;
        } = { long: long.toString(), lat: lat.toString() };
        if (from || to) {
            pathParams.from = from;
            pathParams.to = to;
        }
        const query: IResultsActionQuery = {};
        if (features) {
            query.features = features.map(f => f.toString());
        }
        if (itemType) {
            query.itemType = itemType.toString();
        }
        if (onlyNonCommercial) {
            query.onlyNonCommercial = "true";
        }
        if (minLoadCapacity) {
            query.minLoadCapacity = minLoadCapacity.toString();
        }
        if (minBoxDimensions) {
            query.minBoxWidth = minBoxDimensions.width.toString();
            query.minBoxLength = minBoxDimensions.length.toString();
            query.minBoxHeight = minBoxDimensions.height.toString();
        }
        return RouteActions.results(pathParams, query);
    },
    home: () => createAction(ROUTE_HOME)
};
export type RouteActions = ActionsUnion<typeof RouteActions>;
