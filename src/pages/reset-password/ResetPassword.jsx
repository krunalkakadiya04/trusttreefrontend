import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import logo from "../../assets/images/logo.svg";
import { ConfirmPassword, Password } from "../../helpers/yup.validation.schema";
import ErrorList from "../../components/error-list/ErrorList";
import SucessList from "../../components/success-list/SucessList";
import "../login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../middlewares/auth";
import ROUTE_URLS from "../../config/routes";
import { useNavigate, useParams } from "react-router-dom";
import ToastService from "../../helpers/toast-services";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  let { reset_password_token } = useParams();
  const { resetPasswordMessage, resetPasswordError, resetPasswordLoading } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (!resetPasswordLoading) {
      if (resetPasswordMessage) {
        ToastService.success(resetPasswordMessage);
        navigate(ROUTE_URLS.LOGIN);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordMessage]);

  const handleSubmit = (values) => {
    dispatch(resetPassword(values, reset_password_token));
  };

  const resetPasswordSchema = Yup.object().shape({
    password: Password,
    con_password: ConfirmPassword,
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      con_password: "",
    },
    validationSchema: resetPasswordSchema,
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
                <h4>{t("RESET_PASSWORD")}</h4>
                {resetPasswordError && <ErrorList error={resetPasswordError} />}
                {resetPasswordMessage && (
                  <SucessList success={resetPasswordMessage} />
                )}
                <form>
                  <div className="frm-grp">
                    <span className="span-eye">
                      <input
                        id="password"
                        type={`${showPassword ? "text" : "password"}`}
                        className={`input-cstm ${formik.touched.password &&
                          formik.errors.password &&
                          "is-invalid"
                          }`}
                        placeholder={t("PASSWORD")}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <i
                        size="sm"
                        variant="light"
                        className={`fa fa-eye ${formik.touched.password &&
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
                  </div>
                  <div className="frm-grp">
                    <span className="span-eye">
                      <input
                        id="con_password"
                        type={`${showConPassword ? "text" : "password"}`}
                        className={`input-cstm ${formik.touched.con_password &&
                          formik.errors.con_password &&
                          "is-invalid"
                          }`}
                        placeholder={t("CONFIRM_PASSWORD")}
                        value={formik.values.con_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <i
                        size="sm"
                        variant="light"
                        className={`fa fa-eye ${formik.touched.con_password &&
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
                  </div>
                  <div className="btn-submit">
                    <button
                      type="submit"
                      onClick={formik.handleSubmit}
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? t("PLEASE_WAIT") : t("RESET_PASSWORD")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
