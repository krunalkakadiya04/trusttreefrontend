import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/images/new-logo.svg";
import ROUTE_URLS from "../../config/routes";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../helpers/toast-services";
import ErrorList from "../../components/error-list/ErrorList";
import { LoginUser } from "../../middlewares/auth";
import SucessList from "../../components/success-list/SucessList";
import { resetLogin } from "../../slices/auth.slice";
import { useTranslation } from "react-i18next";
import { email, Password } from "../../helpers/yup.validation.schema";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loginLoading,
    loggedInUser,
    loggedInUserEmail,
    loginMessage,
    loginError,
    loginSetPasswordMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedInUserEmail) {
      dispatch(resetLogin());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUserEmail]);

  useEffect(() => {
    if (!loginLoading) {
      if (loggedInUser) {
        if (loginMessage) {
          navigate(ROUTE_URLS.HOME, { replace: true });
        }
        ToastService.success(loginMessage);
      }
      formik.setSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginLoading, loggedInUser, loginMessage]);

  useEffect(() => {
    if (!loginLoading) {
      if (loginSetPasswordMessage) {
        ToastService.warning(loginSetPasswordMessage);
        navigate(ROUTE_URLS.SET_PASSWORD);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSetPasswordMessage]);

  const handleSubmit = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(LoginUser(payload));
  };

  const LoginSchema = Yup.object({
    email: email,
    password: Password,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="login-body">
        <section className="login-wrapper">
          <div className="container">
            <div className="login-main-wrapper">
              <div className="logo-login">
                <img src={logo} alt="logo" />
              </div>
              <div className="login-inner">
                {/* <h4>{t("LOGIN")}</h4> */}
                {loginError && <ErrorList error={loginError} />}
                {loginMessage && <SucessList success={loginMessage} />}
                <Form>
                  <Form.Group className="frm-grp">
                    <Form.Label>{t("Email")}</Form.Label>
                    <Form.Control
                      id="email"
                      type="email"
                      className={`input-cstm ${
                        formik.touched.email &&
                        formik.errors.email &&
                        "is-invalid"
                      }`}
                      placeholder={t("INPUT_YOUR_EMAIL")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="frm-grp">
                    <Form.Label>{t("Password")}</Form.Label>
                    <span className="span-eye">
                      <Form.Control
                        id="password"
                        type={`${showPassword ? "text" : "password"}`}
                        className={`input-cstm ${
                          formik.touched.password &&
                          formik.errors.password &&
                          "is-invalid"
                        }`}
                        placeholder={t("INPUT_YOUR_PASSWORD")}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <i
                        size="sm"
                        variant="light"
                        className={`fa fa-eye ${
                          formik.touched.password &&
                          formik.errors.password &&
                          "with-error"
                        }`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={`${showPassword ? "eye-slash" : "eye"}`}
                        />
                      </i>
                    </span>
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.password}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="check-login">
                    {/* <div className="custom-checkbox">
                      <input type="checkbox" className="chb chb-3" id="chb-3" />
                      <label htmlFor="chb-3">{t("KEEP_ME_LOGGED_IN")}</label>
                    </div> */}
                    <Link className="a-forgot" to={ROUTE_URLS.FORGOT_PASSWORD}>
                      {t("FORGOT_PASSWORD")}
                      {t("?")}
                    </Link>
                  </Form.Group>
                  {/* <div className="btn-submit"> */}
                  <Form.Group className="login-buuton">
                    <Button
                      type="btn btn btn-primary"
                      onClick={formik.handleSubmit}
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? t("PLEASE_WAIT") : t("LOGIN")}
                    </Button>
                  </Form.Group>
                </Form>
              </div>
              <div className="laungesTrustree">
                <strong>{t("TRUSTREE_OFFERED_IN")} : </strong>

                {/* <a> عربي</a> */}
                {i18n.resolvedLanguage === "en" ? (
                  <Link
                    onClick={() => {
                      i18n.changeLanguage("ar");
                      window.location.reload();
                    }}
                  >
                    <strong>عربى</strong>
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      i18n.changeLanguage("en");
                      window.location.reload();
                    }}
                  >
                    <strong>English</strong>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
