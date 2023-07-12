import React from "react";
import { Route } from "react-router-dom";

const SigninComponent = React.lazy(() => import("../signin/Signin"));
const SignupComponent = React.lazy(() => import("../signup/Signup"));
const ResetPasswordComponent = React.lazy(() => import("../reset/ResetPassword"));

export const AUTH_ROUTES = [
    <Route index element={<SigninComponent />}></Route>,
    <Route path="/signin" element={<SigninComponent />}></Route>,
    <Route path="/signup" element={<SignupComponent />}></Route>,
    <Route path="/reset" element={<ResetPasswordComponent />}></Route>
];
