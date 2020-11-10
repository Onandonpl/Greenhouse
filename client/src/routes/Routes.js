import React from "react";
import { Switch, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorPage from "../pages/error/ErrorPage";
import Weather from "../pages/weather/Weather";
import Settings from "../pages/settings/Settings";
import Observations from "../pages/observations/Observations";

const Routes = () => {
  return (
    <Switch>
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/weather" component={Weather} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/observations" component={Observations} />

      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
