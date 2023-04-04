import React from "react";
import { Navigate } from "react-router";
import ROUTE_URLS from "../../config/routes";
import LocalstorageService from "../../helpers/localstorage-services";

const RouteAuthGuardRestrictLoggedUser = ({ children }) => {
  const token = LocalstorageService.getLoggedInUserToken();
  if (token) {
    return <Navigate to={ROUTE_URLS.HOME} replace />;
  }
  return children;
};

export default RouteAuthGuardRestrictLoggedUser;
