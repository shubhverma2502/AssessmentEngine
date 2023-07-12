import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";
import { PROFILE_PATH } from "../constants/constants";


const ProfileCardComponent = React.lazy(() => import("../profile/ProfileCard"));

export const PROFILE_ROUTES = [

    <Route path={PROFILE_PATH} element={<PrivateRoute>
        <Layout
            component={ProfileCardComponent}
            path={PROFILE_PATH}
            title="Profile">
        </Layout>
    </PrivateRoute>} />,

]