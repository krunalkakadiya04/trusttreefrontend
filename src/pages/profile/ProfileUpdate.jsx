import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ToastService from "../../helpers/toast-services";
import ErrorList from "../../components/error-list/ErrorList";
import { email, name, phone_number } from "../../helpers/yup.validation.schema";
import { updateLoggedInUser } from "../../middlewares/users";
import { useTranslation } from "react-i18next";
import ProfileImg from "./ProfileImg";
import camera from '../../assets/images/Profile-camera.svg'

const ProfileUpdate = (props) => {
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false)

  const dispatch = useDispatch();

  const {
    userProfile,
    updateLoggedInUserLoading,
    updateLoggedInUserMessage,
    updateLoggedInUserError,
  } = useSelector((state) => state.user);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("file", values.profile_pic);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    dispatch(updateLoggedInUser(formData));
  };

  useEffect(() => {
    if (userProfile.length <= 0) {
      props.setIsShow(!props.show);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!updateLoggedInUserLoading) {
      if (updateLoggedInUserMessage) {
        ToastService.success(updateLoggedInUserMessage);
        props.setIsShow(!props.show);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLoggedInUserMessage]);

  const ProfileUpdateSchema = Yup.object().shape({
    name: name,
    email: email,
    phone_number: phone_number,
  });

  const formik = useFormik({
    initialValues: {
      name: userProfile.name,
      email: userProfile.email,
      phone_number: userProfile.phone_number ? userProfile.phone_number : "",
      profile_pic: "",
    },
    validationSchema: ProfileUpdateSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Form>
      <div>
        <div className="contentWrap">
          <div className="contentHead">
            <h1>{t("My Profile")}</h1>
          </div>
          <div className="profile-box">
            <div className="profile-form ">
              {updateLoggedInUserError && (
                <ErrorList error={updateLoggedInUserError} />
              )}
              <div className="profile edit-profile">
                {formik.values.profile_pic ?
                  <img
                    src={
                      `${URL.createObjectURL(formik.values.profile_pic)}` ||
                      require("../../assets/images/noProfile.webp")
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                    }}
                    alt="profile-pic"
                  />
                  :
                  <img
                    src={
                      `${process.env.REACT_APP_BASE_URL}${userProfile.profile_pic}` ||
                      require("../../assets/images/noProfile.webp")
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                    }}
                    alt="profile-pic"
                  />
                }

                <div className="change-img" onClick={() => setIsEditMode(true)}>
                  <Link to={""}>
                    <img src={camera} alt="camera" />
                  </Link>
                </div>
              </div>

              <div className="form-group ">
                <Form.Label htmlFor="name" className="text-profile">
                  {t("Full Name")}
                </Form.Label>
                <Form.Control
                  className={`${formik.errors.name && "is-invalid"
                    }`}
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <Form.Label htmlFor="email" className="text-profile">
                  {t("E-Mail")}
                </Form.Label>
                <Form.Control
                  className={`${formik.errors.email && "is-invalid"
                    }`}
                  type="email"
                  name="email"
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
              <div className="form-group">
                <Form.Label htmlFor="number" className="text-profile">
                  {t("Phone Number")}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone_number"
                  className={`${formik.touched.phone_number && formik.errors.phone_number &&
                    "is-invalid"
                    }`}
                  placeholder="Enter Your Contact Number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.phone_number}
                  </div>
                )}
              </div>
            </div>

            <div className="profile-btn">
              <Button className="btn btn-primary mb-3" onClick={formik.handleSubmit}
                disabled={!(formik.isValid && formik.dirty)}
              >
                {t("SAVE")}
              </Button>
              <Button
                className="btn-outline-secondary"
                onClick={() => props.setIsShow(!props.show)}
              >
                {t("CANCEL")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProfileImg
        show={isEditMode}
        setIsShow={(flag) => setIsEditMode(flag)}
        setFieldValue={formik.setFieldValue}
      />
    </Form>
  );
};

export default ProfileUpdate;
