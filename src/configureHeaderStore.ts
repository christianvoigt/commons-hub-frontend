import {
    createStore,
    applyMiddleware,
    combineReducers,
    compose,
    Middleware
} from "redux";
import { connectRoutes } from "redux-first-router";
import { ROUTE_HOME, ROUTE_RESULTS } from "./state/RouteActions";
import * as History from "history";
import * as queryString from "query-string";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import page from "./pageReducer";
import { itemQueryReducer } from "~state/ItemQueryReducer";
import { geocodeFetchReducer } from "~state/GeocodeFetchReducer";
import { headerSaga } from "~state/MainSaga";
import { uiReducer } from "~state/UIReducer";
import { selectedGeocodeReducer } from "~state/SelectedGeocodeReducer";
import { itemsFetchReducer } from "~state/ItemsFetchReducer";
import console = require("console");
import { locationsFetchReducer } from "~state/LocationsFetchReducer";
import { selectedLocationReducer } from "~state/SelectedLocationReducer";
import { filterAvailableItemsReducer } from "~state/FilterAvailableItemsReducer";

const routesMap = {
    [ROUTE_HOME]: "/",
    [ROUTE_RESULTS]: "/results/:lat/:long/:from?/:to?"
};

export default history => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewaresToApply: Middleware[] = [sagaMiddleware];
    if (process.env.NODE_ENV !== "production") {
        middlewaresToApply.push(createLogger());
    }

    const options: any = {
        createHistory: History.createBrowserHistory,
        querySerializer: queryString
    };
    if (process.env.REACT_APP_BASENAME) {
        options.basename = process.env.REACT_APP_BASENAME;
    }
    const reducers = {
        geocodes: geocodeFetchReducer,
        ui: uiReducer,
        selectedGeocode: selectedGeocodeReducer,
        selectedLocation: selectedLocationReducer
    };
    const {
        reducer: routerReducer,
        middleware: routerMiddleware,
        enhancer: routerEnhancer,
        initialDispatch
    } = connectRoutes(routesMap, options);
    const rootReducer = combineReducers({
        ...reducers,
        location: routerReducer
    });
    middlewaresToApply.push(routerMiddleware);
    const middlewares = applyMiddleware(...middlewaresToApply);
    const enhancers = composeEnhancers(routerEnhancer, middlewares);

    const store = createStore(rootReducer, enhancers);
    sagaMiddleware.run(headerSaga);
    initialDispatch();
    return store;
};

const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
