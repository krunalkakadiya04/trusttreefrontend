import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../../../helpers/toast-services";
import { addRatings, getRatings } from "../../../../middlewares/ratings";
import {
  customer_data,
  email_notifications,
  google_ratings,
  trustree_ratings,
} from "../../../../helpers/jsonData";
import downArrow from "../../../../assets/images/downArrow.svg";

const Ratings = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ratings, saveLoading, saveMessage } = useSelector(
    (state) => state.ratings
  );

  useEffect(() => {
    const select_id = props.selectBrand;
    if (select_id) {
      dispatch(getRatings(select_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectBrand, saveMessage]);

  useEffect(() => {
    if (!saveLoading && saveMessage) {
      ToastService.success(saveMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  useEffect(() => {
    if (ratings && ratings.ratings_id && ratings.ratings_id !== null) {
      formik.setValues({
        customer_data: ratings.ratings_id && ratings.ratings_id.customer_data,
        trustree_ratings:
          ratings.ratings_id && ratings.ratings_id.trustree_ratings,
        email_notifications:
          ratings.ratings_id && ratings.ratings_id.email_notifications,
        google_ratings: ratings.ratings_id && ratings.ratings_id.google_ratings,
      });
    } else {
      formik.setValues({
        customer_data: "",
        trustree_ratings: "",
        email_notifications: "",
        google_ratings: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  const handleSubmit = (values) => {
    const select_id = props.selectBrand;
    const payload = { ratings: values };
    dispatch(addRatings(payload, select_id));
  };

  const formik = useFormik({
    initialValues: {
      customer_data: "",
      trustree_ratings: "",
      email_notifications: "",
      google_ratings: "",
    },
    onSubmit: handleSubmit,
  });

  const handleChange = (e, name) => {
    formik.setFieldValue(name, e);
  };

  const customer_data_label =
    customer_data &&
    customer_data.find((obj) => {
      return obj.value === formik.values.customer_data;
    });

  const trustree_ratings_label =
    trustree_ratings &&
    trustree_ratings.find((obj) => {
      return obj.value === formik.values.trustree_ratings;
    });

  const email_notifications_label =
    email_notifications &&
    email_notifications.find((obj) => {
      return obj.value === formik.values.email_notifications;
    });

  const google_ratings_label =
    google_ratings &&
    google_ratings.find((obj) => {
      return obj.value === formik.values.google_ratings;
    });

  return (
    <div>
      <Form className="ratings-form">
        <div className="exp-input form-group ratings-content">
          <Form.Label>{t("CUSTOMER_DATA")}</Form.Label>
          <Dropdown className='ellipsis'>
            <Dropdown.Toggle
              className="form-control"
            >
              <div className='d-flex justify-content-between w-100 align-items-center'>
                <span
                  className={`dropdown-value 
                  ${formik.values.customer_data ? '' : 'dropdown-value-placeholder'}`}
                >
                  {t(customer_data_label.label)}
                </span>
                <span>
                  <img src={downArrow} alt="downArrow" />
                </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {customer_data &&
                customer_data.map((o, i) => (
                  <Dropdown.Item
                    as={"span"}
                    value={o.value}
                    key={i}
                    disabled={i === 0 ? true : false}
                    onClick={() => handleChange(o.value, "customer_data")}
                  >
                    {t(o.label)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <span className="ratings-span">
            {t("DETERMINE_IF_MUST_DISPLAY_CUSTOMER_DATA_OR_NOT")}
          </span>
        </div>
        <div className="exp-input form-group ratings-content">
          <Form.Label>{t("AUTO_RESOLVE_TRUSTREE_RATINGS")}</Form.Label>
          <Dropdown className='ellipsis'>
            <Dropdown.Toggle
              className="form-control"
            >
              <div className='d-flex justify-content-between w-100 align-items-center'>
                <span
                  className={`dropdown-value 
                  ${formik.values.trustree_ratings ? '' : 'dropdown-value-placeholder'}`}
                >
                  {t(trustree_ratings_label.label)}
                </span>
                <span>
                  <img src={downArrow} alt="downArrow" />
                </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {trustree_ratings &&
                trustree_ratings.map((o, i) => (
                  <Dropdown.Item
                    as={"span"}
                    value={o.value}
                    key={i}
                    disabled={i === 0 ? true : false}
                    onClick={() => handleChange(o.value, "trustree_ratings")}
                  >
                    {t(o.label)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <span className="ratings-span">
            {t("TO_DETERMINE_WHICH_TRUSTREE_FEEDBACK_AUTOMATICALLY")}
          </span>
        </div>
        <div className="exp-input form-group ratings-content">
          <Form.Label>{t("EMAIL_NOTIFICATION")}</Form.Label>
          <Dropdown className='ellipsis'>
            <Dropdown.Toggle
              className="form-control"
            >
              <div className='d-flex justify-content-between w-100 align-items-center'>
                <span
                  className={`dropdown-value 
                  ${formik.values.email_notifications ? '' : 'dropdown-value-placeholder'}`}
                >
                  {t(email_notifications_label.label)}
                </span>
                <span>
                  <img src={downArrow} alt="downArrow" />
                </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {email_notifications &&
                email_notifications.map((o, i) => (
                  <Dropdown.Item
                    as={"span"}
                    value={o.value}
                    key={i}
                    disabled={i === 0 ? true : false}
                    onClick={() => handleChange(o.value, "email_notifications")}
                  >
                    {t(o.label)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <span className="ratings-span">
            {t("ALERTS_ARE_SENT_TO_EMAIL_ABOUT_RECEIVING")}
          </span>
        </div>
        <div className="exp-input form-group ratings-content">
          <Form.Label>{t("AUTO_RESOLVE_GOOGLE_RATINGS")}</Form.Label>
          <Dropdown className='ellipsis'>
            <Dropdown.Toggle
              className="form-control"
            >
              <div className='d-flex justify-content-between w-100 align-items-center'>
                <span
                  className={`dropdown-value 
                  ${formik.values.google_ratings ? '' : 'dropdown-value-placeholder'}`}
                >
                  {t(google_ratings_label.label)}
                </span>
                <span>
                  <img src={downArrow} alt="downArrow" />
                </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {google_ratings &&
                google_ratings.map((o, i) => (
                  <Dropdown.Item
                    as={"span"}
                    value={o.value}
                    key={i}
                    disabled={i === 0 ? true : false}
                    onClick={() => handleChange(o.value, "google_ratings")}
                  >
                    {t(o.label)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <span className="ratings-span">
            {t("TO_DETRMINE_WHICH_GOOGLE_FEEDBACK_AUTOMATICALLY")}
          </span>
        </div>
        <div>
          <Button className="" onClick={formik.handleSubmit}>
            {t("SAVE")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Ratings;
