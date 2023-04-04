import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addSocialMedia,
  getSocialMedia,
} from "../../../../middlewares/socialMedia";
import ToastService from "../../../../helpers/toast-services";
import { useTranslation } from "react-i18next";

const SocialMedia = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { saveLoading, saveMessage, socialMedia } = useSelector(
    (state) => state.social
  );

  useEffect(() => {
    const select_id = props.selectBrand;
    if (select_id) {
      dispatch(getSocialMedia(select_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage, props.selectBrand]);

  useEffect(() => {
    if (!saveLoading) {
      if (saveMessage) {
        ToastService.success(saveMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  useEffect(() => {
    if (
      socialMedia &&
      socialMedia.socialMedia_id &&
      socialMedia.socialMedia_id !== null
    ) {
      formik.setValues({
        is_google_on:
          socialMedia.socialMedia_id && socialMedia.socialMedia_id.is_google_on,
        is_facebook_on:
          socialMedia.socialMedia_id &&
          socialMedia.socialMedia_id.is_facebook_on,
        is_instagram_on:
          socialMedia.socialMedia_id &&
          socialMedia.socialMedia_id.is_instagram_on,
        google_link:
          socialMedia.socialMedia_id && socialMedia.socialMedia_id.google_link,
        facbook_link:
          socialMedia.socialMedia_id && socialMedia.socialMedia_id.facbook_link,
        instagram_link:
          socialMedia.socialMedia_id &&
          socialMedia.socialMedia_id.instagram_link,
      });
    } else {
      formik.setValues({
        is_google_on: false,
        is_facebook_on: false,
        is_instagram_on: false,
        google_link: "",
        facbook_link: "",
        instagram_link: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialMedia, props.selectBrand]);

  const handleSubmit = (values) => {
    const payload = { channels: values };
    const select_id = props.selectBrand;
    dispatch(addSocialMedia(payload, select_id));
  };

  const formik = useFormik({
    initialValues: {
      is_google_on: false,
      is_facebook_on: false,
      is_instagram_on: false,
      google_link: "",
      facbook_link: "",
      instagram_link: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Form className="ratings-form">
        <div className="form-control mb-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={t("ASK_CUSTOMER_TO_SHARE_THEIR_FEEDBACKS_ON_GOOGLE")}
            name="is_google_on"
            onChange={formik.handleChange}
            value={formik.values.is_google_on}
            checked={formik.values.is_google_on}
          />
          {formik.values.is_google_on && (
            <div className="input-social-media">
              <Form.Label>{t("GOOGLE_ACCOUNT_LINK")}</Form.Label>
              <Form.Control
                type="text"
                className="input-box-profile"
                placeholder={t("INPUT_YOUR_GOOGLE_ACCOUNT_LINK")}
                name="google_link"
                onChange={formik.handleChange}
                value={formik.values.google_link}
              />
            </div>
          )}
        </div>

        <div className="form-control mb-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={t("ASK_CUSTOMER_TO_LIKE_YOUR_BRAND_FACEBOOK_PAGE")}
            name="is_facebook_on"
            onChange={formik.handleChange}
            value={formik.values.is_facebook_on}
            checked={formik.values.is_facebook_on}
          />
          {formik.values.is_facebook_on && (
            <div className="input-social-media">
              <Form.Label>{t("FACEBOOK_PAGE_LINK")}</Form.Label>
              <Form.Control
                type="text"
                className="input-box-profile"
                placeholder={t("INPUT_YOUR_BRAND_FACEBOOK_PAGE_LINK")}
                name="facbook_link"
                onChange={formik.handleChange}
                value={formik.values.facbook_link}
              />
            </div>
          )}
        </div>

        <div className="form-control mb-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={t("ASK_CUSTOMER_TO_FOLLOW_YOUR_BRAND_ON_INSTAGRAM")}
            name="is_instagram_on"
            onChange={formik.handleChange}
            value={formik.values.is_instagram_on}
            checked={formik.values.is_instagram_on}
          />
          {formik.values.is_instagram_on && (
            <div className="input-social-media">
              <Form.Label>{t("INSTAGRAM_ACCOUNT_LINK")}</Form.Label>
              <Form.Control
                type="text"
                className="input-box-profile"
                placeholder={t("INPUT_YOUR_BRAND_INSTAGRAM_ACCOUNT_LINK")}
                name="instagram_link"
                onChange={formik.handleChange}
                value={formik.values.instagram_link}
              />
            </div>
          )}
        </div>
        <div className="social-buuton">
          <Button
            className="btn btn-primary"
            onClick={formik.handleSubmit}
          >
            {t("SAVE_CHANGES")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SocialMedia;
