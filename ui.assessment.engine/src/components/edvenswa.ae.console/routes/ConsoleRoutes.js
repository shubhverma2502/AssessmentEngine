import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../../guards/PrivateRoute";
import Layout from "../../edvenswa.ae.layout/Layout";
import { CONSOLE_EXAM_PATH, EXAM_CREATE_PATH, EXAM_PATH, GROUP_CREATE_PATH, GROUP_PATH, MANAGE_USERS_PATH, TENANT_CREATE_PATH, TENANT_PATH, USERS_PATH, USER_CREATE_PATH } from "../constants/Constants";

const TenantsListComponent = React.lazy(() => import("../tenant/Tenants"));
const TenantCreateComponent = React.lazy(() =>
  import("../tenant/TenantCreate")
);
const GroupsListComponent = React.lazy(() => import("../group/Groups"));
const GroupCreateComponent = React.lazy(() => import("../group/GroupCreate"));
const UserCreateComponent = React.lazy(() => import("../user/UserCreate"));
const UsersListComponent = React.lazy(() => import("../user/Users"));
const UsersSearchComponent = React.lazy(() => import("../user/SearchUserContainer"));
const ConsoleExamsListComponent = React.lazy(() => import("../exam/ConsoleExams"));
const ExamCreateComponent = React.lazy(() => import("../../edvenswa.ae.exam/create/StepperComponent"));

export const CONSOLE_ROUTES = [
  <Route
    path={TENANT_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={TenantsListComponent}
          path={TENANT_PATH}
          title="Tenants"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={TENANT_CREATE_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={TenantCreateComponent}
          path={TENANT_CREATE_PATH}
          title="Tenant Create"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={GROUP_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={GroupsListComponent}
          path={GROUP_PATH}
          title="Groups"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={GROUP_CREATE_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={GroupCreateComponent}
          path={GROUP_CREATE_PATH}
          title="Create Group"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={USER_CREATE_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={UserCreateComponent}
          path={USER_CREATE_PATH}
          title="Create User"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={USERS_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={UsersListComponent}
          path={USERS_PATH}
          title="Users"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={MANAGE_USERS_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={UsersSearchComponent}
          path={MANAGE_USERS_PATH}
          title="Manage Users"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={CONSOLE_EXAM_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={ConsoleExamsListComponent}
          path={CONSOLE_EXAM_PATH}
          title="Exams"
        ></Layout>
      </PrivateRoute>
    }
  />,
  <Route
    path={EXAM_CREATE_PATH}
    element={
      <PrivateRoute>
        <Layout
          component={ExamCreateComponent}
          path={EXAM_CREATE_PATH}
          title="Create Exam"></Layout>
      </PrivateRoute>
    }
  />,
];
