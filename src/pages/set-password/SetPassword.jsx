import React, { useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import logo from "../../assets/images/new-logo.svg";
import { ConfirmPassword, Password } from "../../helpers/yup.validation.schema";
import "../login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkResetPasswordToken,
  setPasswordFirstLoggIn,
} from "../../middlewares/auth";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTE_URLS from "../../config/routes";
import ToastService from "../../helpers/toast-services";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";

const SetPassword = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const {
    setPasswordFirstLoginLoading,
    setPasswordFirstLoginMessage,
    checkResetPasswordTokenError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkResetPasswordToken(code));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!setPasswordFirstLoginLoading) {
      if (setPasswordFirstLoginMessage) {
        ToastService.success(setPasswordFirstLoginMessage);
        navigate(ROUTE_URLS.LOGIN);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPasswordFirstLoginLoading]);

  const handleSubmit = (values) => {
    const payload = values;
    dispatch(setPasswordFirstLoggIn(payload, code));
  };

  const setPasswordSchema = Yup.object().shape({
    password: Password,
    con_password: ConfirmPassword,
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      con_password: "",
    },
    validationSchema: setPasswordSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="login-body">
        <section className="login-wrapper">
          <div className="container">
            {checkResetPasswordTokenError ? (
              <h1>{checkResetPasswordTokenError}</h1>
            ) : (
              <div className="login-main-wrapper">
                <div className="logo-login">
                  <img src={logo} alt="logo" />
                </div>
                <div className="login-inner">
                  <h4>{t("SET_PASSWORD")}</h4>
                  <Form>
                    <Form.Label>{t("PASSWORD")}</Form.Label>
                    <Form.Group className="frm-grp">
                      <span className="span-eye">
                        <Form.Control
                          id="password"
                          type={`${showPassword ? "text" : "password"}`}
                          className={`input-cstm ${
                            formik.touched.password &&
                            formik.errors.password &&
                            "is-invalid"
                          }`}
                          placeholder={t("INPUT_PASSWORD")}
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
                    <Form.Label>{t("CONFIRM_PASSWORD")}</Form.Label>
                    <Form.Group className="frm-grp">
                      <span className="span-eye">
                        <Form.Control
                          id="con_password"
                          type={`${showConPassword ? "text" : "password"}`}
                          className={`input-cstm ${
                            formik.touched.con_password &&
                            formik.errors.con_password &&
                            "is-invalid"
                          }`}
                          placeholder={t("INPUT_CONFIRM_PASSWORD")}
                          value={formik.values.con_password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <i
                          size="sm"
                          variant="light"
                          className={`fa fa-eye ${
                            formik.touched.con_password &&
                            formik.errors.con_password &&
                            "with-error"
                          }`}
                          onClick={() => setShowConPassword(!showConPassword)}
                        >
                          <FontAwesomeIcon
                            icon={`${showConPassword ? "eye-slash" : "eye"}`}
                          />
                        </i>
                      </span>
                      {formik.touched.con_password &&
                        formik.errors.con_password && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.con_password}
                          </div>
                        )}
                    </Form.Group>
                    <Form.Group className="login-buuton">
                      <Button
                        type="btn btn-primary"
                        onClick={formik.handleSubmit}
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting
                          ? t("PLEASE_WAIT")
                          : t("SET_PASSWORD")}
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
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default SetPassword;
