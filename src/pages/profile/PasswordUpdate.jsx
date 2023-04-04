import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedInUserPassword } from "../../middlewares/users";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { con_password, Password } from "../../helpers/yup.validation.schema";
import ROUTE_URLS from "../../config/routes";
import { useEffect } from "react";
import ToastService from "../../helpers/toast-services";
import { useTranslation } from "react-i18next";

const PasswordUpdate = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCurPassword, setShowCurPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const {
    updateLoggedInUserPasswordError,
    updateLoggedInUserPasswordLoading,
    updateLoggedInUserPasswordMessage,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (!updateLoggedInUserPasswordLoading) {
      if (updateLoggedInUserPasswordMessage) {
        ToastService.success(updateLoggedInUserPasswordMessage);
        navigate(ROUTE_URLS.PROFILE);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLoggedInUserPasswordMessage]);

  const handleClose = () => {
    navigate(ROUTE_URLS.PROFILE);
  };

  const handleSubmit = (values) => {
    dispatch(updateLoggedInUserPassword(values));
  };

  const PassowordUpdateSchema = Yup.object().shape({
    current_password: Password,
    new_password: Password,
    con_password: con_password,
  });

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      con_password: "",
    },
    validationSchema: PassowordUpdateSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className="contentWrap">
        <div className="contentHead">
          <h1>{t("My Profile")}</h1>
        </div>
        <div className="profile-box">
          <div className="profile-form ">
            <h3>{t("Change Password")}</h3>
            <Form>
              <div className="form-group">
                <Form.Label className="control-label text-profile" htmlFor="">
                  {t("Current Password")}
                </Form.Label>
                <Form.Control
                  type={`${showCurPassword ? "text" : "password"}`}
                  className={`inputPassword ${formik.touched.current_password && formik.errors.current_password && "is-invalid"
                    }`}
                  placeholder="Enter your current password"
                  name="current_password"
                  value={formik.values.current_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="form-control-feedback">
                  <i
                    size="sm"
                    variant="light"
                    className="fa fa-eye"
                    onClick={() => setShowCurPassword(!showCurPassword)}
                  >
                    {/* {!formik.errors.current_password && ( */}
                    <FontAwesomeIcon
                      icon={`${showCurPassword ? "eye-slash" : "eye"}`}
                    />
                    {/* )} */}
                  </i>
                </span>
                {formik.touched.current_password && formik.errors.current_password && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.current_password}
                  </div>
                )}
                {updateLoggedInUserPasswordError &&
                  <div className="invalid-feedback d-block">
                    {updateLoggedInUserPasswordError}
                  </div>
                }
              </div>

              <div className="form-group">
                <Form.Label className="control-label text-profile" htmlFor="">
                  {t("New Password")}
                </Form.Label>
                <Form.Control
                  type={`${showPassword ? "text" : "password"}`}
                  className={`inputPassword ${formik.touched.new_password
                    && formik.errors.new_password && "is-invalid"
                    }`}
                  placeholder="Enter your new password"
                  name="new_password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="form-control-feedback">
                  <i
                    size="sm"
                    variant="light"
                    className="fa fa-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {/* {!formik.errors.new_password && ( */}
                    <FontAwesomeIcon
                      icon={`${showPassword ? "eye-slash" : "eye"}`}
                    />
                    {/* )} */}
                  </i>
                </span>
                {formik.touched.new_password && formik.errors.new_password && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.new_password}
                  </div>
                )}
              </div>

              <div className="form-group">
                <Form.Label className="control-label text-profile" htmlFor="">
                  {t("Re-Enter New Password")}
                </Form.Label>
                <Form.Control
                  type={`${showConPassword ? "text" : "password"}`}
                  className={`inputPassword ${formik.touched.con_password &&
                    formik.errors.con_password && "is-invalid"
                    }`}
                  placeholder="Re-Enter New Password"
                  name="con_password"
                  value={formik.values.con_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="form-control-feedback">
                  <i
                    size="sm"
                    variant="light"
                    className="fa fa-eye"
                    onClick={() => setShowConPassword(!showConPassword)}
                  >
                    {/* {!formik.errors.con_password && ( */}
                    <FontAwesomeIcon
                      icon={`${showConPassword ? "eye-slash" : "eye"}`}
                    />
                    {/* )} */}
                  </i>
                </span>
                {formik.touched.con_password && formik.errors.con_password && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.con_password}
                  </div>
                )}
              </div>
              <div className="profile-btn ">
                <Button
                  className="btn btn-primary mb-3"
                  onClick={formik.handleSubmit}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  {t("SAVE")}
                </Button>
                <Button
                  onClick={() => handleClose()}
                  className="btn btn-outline-secondary"
                >
                  {t("CANCEL")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
