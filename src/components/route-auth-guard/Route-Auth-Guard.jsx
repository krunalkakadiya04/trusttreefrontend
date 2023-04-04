import React from "react";
import { Navigate } from "react-router";
import ROUTE_URLS from "../../config/routes";
import LocalstorageService from "../../helpers/localstorage-services";

const RouteAuthGuard = ({ children }) => {
  const token = LocalstorageService.getLoggedInUserToken();
  if (!token) {
    return <Navigate to={ROUTE_URLS.LOGIN} replace />;
  }
  return children;
};

export default RouteAuthGuard;
