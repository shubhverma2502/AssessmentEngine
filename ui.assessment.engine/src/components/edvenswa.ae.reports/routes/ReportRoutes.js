import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";

const ReportComponent = React.lazy(() => import("../report/Reports"));

export const REPORT_ROUTES = [
    <Route path="/user/reports"
        element={
            <PrivateRoute>
                <Layout
                    component={ReportComponent}
                    path="/user/reports"
                    title="Reports">
                </Layout>
            </PrivateRoute>
        }
    />
];