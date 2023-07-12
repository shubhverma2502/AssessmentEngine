import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";
import { HOME_ROUTE_PATH } from "../constants/constants";

const HomeComponent = React.lazy(() => import("../Home"));

export const HOME_ROUTES = [
    <Route path={HOME_ROUTE_PATH}
        element={
            <PrivateRoute>
                <Layout component={HomeComponent}></Layout>
            </PrivateRoute>
        }
    ></Route>
];
