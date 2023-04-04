import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../login/Login.css";
import logo from "../../assets/images/new-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../middlewares/auth";
import ErrorList from "../../components/error-list/ErrorList";
import ToastService from "../../helpers/toast-services";
import { useTranslation } from "react-i18next";
import { email } from "../../helpers/yup.validation.schema";
import { resetMessage } from "../../slices/auth.slice";
import { Link } from "react-router-dom";
import ROUTE_URLS from "../../config/routes";
import { Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { forgotPasswordError, forgotPasswordMessage, forgotPasswordLoading } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (!forgotPasswordLoading) {
      if (forgotPasswordMessage) {
        ToastService.success(forgotPasswordMessage);
        dispatch(resetMessage());
      }
      formik.setSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPasswordMessage, forgotPasswordLoading]);

  const handleSubmit = (values) => {
    dispatch(forgotPassword(values));
    // navigate(ROUTE_URLS.THANK_YOU);
  };

  const forgotPasswordSchema = Yup.object().shape({
    email: email,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="login-body">
        <section className="login-wrapper forgot-wrapper">
          <div className="container">
            <div className="login-main-wrapper">
              <div className="logo-login">
                <img src={logo} alt="logo" />
              </div>
              <div className="login-inner">
                <h4>
                  {t("FORGOT_YOUR_PASSWORD")}
                  {t("?")}
                </h4>
                <p>
                  {t("PLEASE_ENTER_YOUR_EMAIL_AND_WE_LL_SEND_YOU_A_RESET_LINK")}
                </p>
                {forgotPasswordError && (
                  <ErrorList error={forgotPasswordError} />
                )}
                <Form>
                  <div className="frm-grp">
                    <Form.Control
                      id="email"
                      type="email"
                      className={`input-cstm ${
                        formik.touched.email &&
                        formik.errors.email &&
                        "is-invalid"
                      }`}
                      placeholder={t("INPUT_YOUR_EMAIL")}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  {/* <div className="check-login"> */}
                  {/* <div className="custom-checkbox"></div>
                    <Link className="a-forgot" to={ROUTE_URLS.LOGIN}>
                      Back to login page
                    </Link> */}
                  {/* </div> */}
                  <Form.Group className="login-buuton">
                    <Button
                      type="btn btn-primary"
                      onClick={formik.handleSubmit}
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? t("PLEASE_WAIT")
                        : t("FORGOT_PASSWORD")}
                    </Button>
                  </Form.Group>
                  <div className="backLogin">
                    <Link className="a-forgot" to={ROUTE_URLS.LOGIN}>
                      Back to Login
                    </Link>
                  </div>
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
      {/* {forgotPasswordLink && (
        <Navigate to={`/reset-password/${forgotPasswordLink}`} replace={true} />
      )} */}
    </>
  );
};

export default ForgotPassword;
