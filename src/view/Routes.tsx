import * as React from "react";
import { connect } from "react-redux";
import { NOT_FOUND } from "redux-first-router";

import { ROUTE_HOME, ROUTE_RESULTS } from "../state/RouteActions";
import { Home } from "./Home";
import { Results } from "./Results";
import { NotFound } from "./NotFound";

const routeComponentsMap = {
    [ROUTE_HOME]: Home,
    [ROUTE_RESULTS]: Results,
    [NOT_FOUND]: NotFound
};
const mapStateToProps = state => ({
    route: state.location.type
});
const Container = ({ route }) => {
    const Route = routeComponentsMap[route]
        ? routeComponentsMap[route]
        : routeComponentsMap[NOT_FOUND];
    return <Route />;
};
export const Routes = connect(mapStateToProps)(Container);
