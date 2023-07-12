import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";
import { EXAM_INSTRUCTIONS_PATH, EXAM_PATH, EXAM_REPORT_PATH, EXAM_SESSION_ID_PATH } from "../constants/constants";

const InstructionsComponent = React.lazy(() => import("../instructions/Instructions"));
const ExamsListComponent = React.lazy(() => import("../Exams"));
const ExamSessionComponent = React.lazy(() => import("../session/ExamSessionContainer"));
const ExamReportComponent = React.lazy(() => import("../session/ExamReport"));

export const EXAM_ROUTES = [
    <Route path={EXAM_INSTRUCTIONS_PATH}
        element={
            <PrivateRoute>
                <Layout component={InstructionsComponent} path={EXAM_INSTRUCTIONS_PATH} title="Instructions"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={EXAM_PATH}
        element={
            <PrivateRoute>
                <Layout component={ExamsListComponent} path={EXAM_PATH} title="Exams"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={EXAM_SESSION_ID_PATH}
        element={
            <PrivateRoute>
                <Layout component={ExamSessionComponent} path={EXAM_SESSION_ID_PATH} Title="Exam Session"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={EXAM_REPORT_PATH}
        element={
            <PrivateRoute>
                <Layout component={ExamReportComponent} path={EXAM_REPORT_PATH} Title="Exam Report"></Layout>
            </PrivateRoute>
        }
    />
];