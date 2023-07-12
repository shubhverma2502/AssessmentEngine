import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
import "./App.css";
import { AUTH_ROUTES } from "./components/edvenswa.ae.auth/routes/AuthRoutes";
import { HOME_ROUTES } from "./components/edvenswa.ae.home/routes/HomeRoutes";
import { EXAM_ROUTES } from "./components/edvenswa.ae.exam/routes/ExamRoutes";
import { CONSOLE_ROUTES } from "./components/edvenswa.ae.console/routes/ConsoleRoutes";
import { REPORT_ROUTES } from "./components/edvenswa.ae.reports/routes/ReportRoutes";
import { PROFILE_ROUTES } from "./components/edvenswa.ae.profile/routes/ProfileRoutes";
import { CONTENT_ROUTES } from "./components/edvenswa.ae.content/routes/ContentRoutes";
import { ANALYTICS_ROUTES } from "./components/edvenswa.ae.analytics/routes/AnalyticsRoutes";
import { MISSING_ROUTES } from "./components/edvenswa.ae.common/routes/MissingRoutes";

function App() {
  return (
    <Suspense fallback={<React.Fragment>Loading...</React.Fragment>}>
      <Routes>
        {AUTH_ROUTES}
        {HOME_ROUTES}
        {EXAM_ROUTES}
        {CONSOLE_ROUTES}
        {PROFILE_ROUTES}
        {CONSOLE_ROUTES}
        {REPORT_ROUTES}
        {CONTENT_ROUTES}
        {ANALYTICS_ROUTES}
        {MISSING_ROUTES}
      </Routes>
    </Suspense>
  );
}

export default App;
