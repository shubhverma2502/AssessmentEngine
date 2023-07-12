import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";
import { ANALYTICS_PATH } from "../constants/constants";
const AnalyticsComponent = React.lazy(() => import("../../edvenswa.ae.analytics/analytics/Analytics"));
const AnalyticsDashboardComponent = React.lazy(() => import("../../edvenswa.ae.analytics/dashboard/analyticsdashboard"));
const ExamAnalysisDashboardComponent = React.lazy(() => import("../../edvenswa.ae.analytics/analytics/ExamAnalysis"));
const AnalyticsDataComponent = React.lazy(() =>import("../../edvenswa.ae.analytics/analytics/Data"));

export const ANALYTICS_ROUTES = [
    <Route path={ANALYTICS_PATH}
        element={
            <PrivateRoute>
                <Layout component={AnalyticsComponent} 
                    path={ANALYTICS_PATH}
                    title="Analytics"></Layout>
            </PrivateRoute>
        }
    />,
    <Route path="/console/dashboard"
        element={
            <PrivateRoute>
                <Layout component={AnalyticsDashboardComponent} 
                    path="/console/dashboard"
                    title="Dashboard"></Layout>
            </PrivateRoute>
        }
    />,
    <Route path="/console/dashboard/examanalysis"
        element={
            <PrivateRoute>
                <Layout component={ExamAnalysisDashboardComponent} 
                    path="/console/dashboard/examanalysis"
                    title="Exam Analytics"></Layout>
            </PrivateRoute>
        }
    />,
    <Route path="/console/dashboard/analytics/data"
        element={
            <PrivateRoute>
                <Layout component={AnalyticsDataComponent} 
                    path="/console/dashboard/analytics/data"
                    title="Data"></Layout>
            </PrivateRoute>
        }
    />,
    
];