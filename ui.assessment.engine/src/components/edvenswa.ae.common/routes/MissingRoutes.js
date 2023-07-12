import React from "react";
import { Navigate, Route } from "react-router-dom";

export default function MissingRoutes() {
  <Route path="*" element={<Navigate to={{ pathname: "/" }} />} />;
}
export const MISSING_ROUTES = [
    <Route path="*"
        element={
           <Navigate to={{pathname:"/home"}}/>
        }
    />
];