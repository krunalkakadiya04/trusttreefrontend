import React, { useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/arabic.css";
import "./assets/css/responsive.css";
import Login from "./pages/login/Login";
import { Route, Routes } from "react-router";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import registerFAIcons from "./helpers/font-awesome-icon-services";
import RouteAuthGuard from "./components/route-auth-guard/Route-Auth-Guard";
import RouteAuthGuardRestrictLoggedUser from "./components/route-auth-guard-restrict-logged-user/RouteAuthGuardRestrictLoggedUser";
import ROUTE_URLS, { BASE_URL } from "./config/routes";
import SetPassword from "./pages/set-password/SetPassword";
import { ToastContainer } from "react-toastify";
import Thankyou from "./pages/thankyou/Thankyou";
import AppLayout from "./templates/AppLayout";
import ResetPassword from "./pages/reset-password/ResetPassword";
import UserList from "./pages/user-listing/UserList";
import Home from "./pages/home/Home";
import Brand from "./pages/brand/Brand";
import Profile from "./pages/profile/Profile";
import PasswordUpdate from "./pages/profile/PasswordUpdate";
import Feedback from "./pages/feedback/Feedback";
import BrandOptions from "./pages/brand/brand-option/BrandOptions";
import { useSelector } from "react-redux";
import UnAuthorized from "./pages/error-page/UnAuthorized";
import { Component } from "./components/dummy/Component";
import { Placeholder } from "react-bootstrap";
import { Catalogues } from "./pages/brand/catelogues/Catalogues";
import QuestionsTemplate from "./pages/brand/questions/QuestionsTemplate";
import LinksAndQrCodes from "./pages/brand/links-and-qr-codes/LinksAndQrCodes";
import CustomerListing from "./pages/customer-listing/CustomerListing";
import CustomerFeedback from "./pages/customer-listing/CustomerFeedback";

registerFAIcons();

const App = () => {
  const { userProfile, userProfileLoading } = useSelector(
    (state) => state.user
  );
  const body = document.querySelector("body");
  const language = localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (language === "ar") {
      if (body) {
        document.querySelector("body").classList.add("arabic");

        if (body.classList.contains("arabic")) {
          document.getElementsByTagName("html")[0].lang = language;
          document.getElementsByTagName("html")[0].dir = "rtl";
        }
      }
    } else {
      if (body) {
        if (body.classList.contains("arabic")) {
          document.querySelector("body").classList.remove("arabic");
          document.getElementsByTagName("html")[0].lang = language;
          document.getElementsByTagName("html")[0].dir = "";
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path={`/${ROUTE_URLS.COMPONENT}`} element={<Component />} />
        <Route
          path={BASE_URL}
          element={
            <RouteAuthGuard>
              <AppLayout />
            </RouteAuthGuard>
          }
        >
          <Route
            path={ROUTE_URLS.BRANDS}
            element={
              <RouteAuthGuard>
                <Brand />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.USERS}
            element={
              <RouteAuthGuard>
                {userProfileLoading && userProfile === null ? (
                  <>
                    <Placeholder xs={12} />
                  </>
                ) : (
                  <>
                    {userProfile?.permission === "master" ||
                    userProfile?.permission === "owner" ? (
                      <UserList />
                    ) : (
                      <UnAuthorized />
                    )}
                  </>
                )}
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.CUSTOMERS}
            element={
              <RouteAuthGuard>
                <CustomerListing />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.CUSTOMER_FEEDBACKS}
            element={
              <RouteAuthGuard>
                <CustomerFeedback />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.HOME}
            element={
              <RouteAuthGuard>
                <Home />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.FEEDBACKS}
            element={
              <RouteAuthGuard>
                <Feedback />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.PROFILE}
            element={
              <RouteAuthGuard>
                <Profile />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.PASSWORD_UPDATE}
            element={
              <RouteAuthGuard>
                <PasswordUpdate />
              </RouteAuthGuard>
            }
          />

          <Route
            path={ROUTE_URLS.BRANDS_OPTIONS}
            element={
              <RouteAuthGuard>
                <BrandOptions />
              </RouteAuthGuard>
            }
          />
          <Route
            path={ROUTE_URLS.CATALOGUES}
            element={
              <RouteAuthGuard>
                <Catalogues />
              </RouteAuthGuard>
            }
          />
          <Route
            path={ROUTE_URLS.QUESTIONS}
            element={
              <RouteAuthGuard>
                <QuestionsTemplate />
              </RouteAuthGuard>
            }
          />
          <Route
            path={ROUTE_URLS.LINKS_AND_QR_CODES}
            element={
              <RouteAuthGuard>
                <LinksAndQrCodes />
              </RouteAuthGuard>
            }
          />
        </Route>

        {/* <Route path={ROUTE_URLS.USERS} element={<UserList />} />
          <Route path={ROUTE_URLS.HOME} element={<Home />} /> */}
        <Route
          path={ROUTE_URLS.LOGIN}
          element={
            <RouteAuthGuardRestrictLoggedUser>
              <Login />
            </RouteAuthGuardRestrictLoggedUser>
          }
        />
        <Route
          path={ROUTE_URLS.FORGOT_PASSWORD}
          element={
            <RouteAuthGuardRestrictLoggedUser>
              <ForgotPassword />
            </RouteAuthGuardRestrictLoggedUser>
          }
        />
        <Route
          path={`${ROUTE_URLS.SET_PASSWORD}/:code`}
          element={
            <RouteAuthGuardRestrictLoggedUser>
              <SetPassword />
            </RouteAuthGuardRestrictLoggedUser>
          }
        />

        <Route
          path={`${ROUTE_URLS.RESET_PASSWORD}/:reset_password_token`}
          element={
            <RouteAuthGuardRestrictLoggedUser>
              <ResetPassword />
            </RouteAuthGuardRestrictLoggedUser>
          }
        />

        <Route
          path={`${ROUTE_URLS.INVITATION_CODE}/:code/:status`}
          element={<Thankyou />}
        />
      </Routes>
      <ToastContainer
        position={language && language === "ar" ? "top-left" : "top-right"}
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
