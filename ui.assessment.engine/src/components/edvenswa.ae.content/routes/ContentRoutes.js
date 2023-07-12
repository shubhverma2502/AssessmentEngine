import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";
import { CONTENT_CREATE_PATH, CONTENT_DASHBOARD_PATH, EXAMS_DASHBOARD_PATH, MANAGEQUESTIONS_DASHBOARD_PATH, QUESTION_CREATE_PATH, QUESTION_STEPPER_PATH } from "../constants/constants";

const ContentCreateComponent = React.lazy(() => import("../create/ContentCreate"));
const ContentDashBoardComponent = React.lazy(() => import("../create/ContentDashBoard"));
const ManageQuestionsDashBoardComponent = React.lazy(() => import("../create/ManageQuestionsDashBoard"));
const QuestionCreateComponent = React.lazy(() => import("../create/QuestionCreate"));
const SearchQuestionContainer = React.lazy(() => import("../create/SearchQuestionContainer"));
const QuestionStepperComponent = React.lazy(() => import("../create/QuestionStepperComponent"));
const ExamsDashBoardComponent = React.lazy(() => import("../create/ExamsDashBoard"));

export const CONTENT_ROUTES = [
    <Route
        path={CONTENT_CREATE_PATH}
        element={
            <PrivateRoute>
                <Layout
                    component={ContentCreateComponent}
                    path={CONTENT_CREATE_PATH}
                    title="Upload File"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={CONTENT_DASHBOARD_PATH}
        element={
            <PrivateRoute>
                <Layout
                    component={ContentDashBoardComponent}
                    path={CONTENT_DASHBOARD_PATH}
                    title="Dashboard"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={MANAGEQUESTIONS_DASHBOARD_PATH}
        element={
            <PrivateRoute>
                <Layout
                    component={ManageQuestionsDashBoardComponent}
                    path={MANAGEQUESTIONS_DASHBOARD_PATH}
                    title="Manage Question"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={QUESTION_CREATE_PATH}
        element={
            <PrivateRoute>
                <Layout
                    component={QuestionCreateComponent}
                    path={QUESTION_CREATE_PATH}
                    title="Manual Question Creation"></Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={QUESTION_STEPPER_PATH}
        element={
            <PrivateRoute>
                <Layout
                    component={QuestionStepperComponent}
                    path={QUESTION_STEPPER_PATH}
                    title="Search Question">
                </Layout>
            </PrivateRoute>
        }
    />,
    <Route
        path={EXAMS_DASHBOARD_PATH}
        element={
            <PrivateRoute>
                <Layout
                    component={ExamsDashBoardComponent}
                    path={EXAMS_DASHBOARD_PATH}
                    title="Exam Types">
                </Layout>
            </PrivateRoute>
        }
    />
];