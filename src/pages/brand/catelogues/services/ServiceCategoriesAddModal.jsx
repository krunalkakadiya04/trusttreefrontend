import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import DropdownWithMultilanguage from "../../dropdown-multilanguage/DropdownWithMultilanguage";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../../../../helpers/toast-services";
import { titleSchema } from "../../../../helpers/yup.validation.schema";
import {
  addServiceCategory,
  updateCatalogues,
} from "../../../../middlewares/services";
import { resetFormUpdate } from "../../../../slices/services.slice";
import { useTranslation } from "react-i18next";

const ServiceCategoriesAddModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [languageOptions, setLanguageOptions] = useState([]);
  const {
    saveLoading,
    saveMessage,
    saveUpdateMessage,
    saveUpdateLoading,
    singleCategory,
    languages,
  } = useSelector((state) => state.service);

  useEffect(() => {
    if (!saveLoading && saveMessage) {
      ToastService.success(saveMessage);
      props.setIsShow(!props.show);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  useEffect(() => {
    if (!saveUpdateLoading && saveUpdateMessage) {
      ToastService.success(saveUpdateMessage);
      props.setIsShow(!props.show);
      // dispatch(resetForm());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUpdateMessage]);

  useEffect(() => {
    if (singleCategory && singleCategory !== null) {
      formik.setValues({
        title: singleCategory ? singleCategory.title : "",
        language: "en",
      });
    } else {
      formik.setValues({
        title: "",
        language: "en",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCategory]);

  useEffect(() => {
    if (props && props.languages && props.languages.length > 0) {
      const languageOptions = props.languages.map((l) => {
        return { ...l, isFormFilled: false };
      });
      setLanguageOptions(languageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.languages]);

  const handleSubmit = (values) => {
    const brand_id = props.selectBrand;
    if (singleCategory && singleCategory !== null && singleCategory._id) {
      const cat_id = singleCategory._id;
      const newValues = {
        title: values.title,
      };
      const payload = { catalogue: newValues };
      dispatch(updateCatalogues(payload, cat_id));
    } else {
      const newValues = {
        title: values.title,
        // via_qr_or_survey_link: false
      };
      const payload = { catalogue: newValues };
      dispatch(addServiceCategory(payload, brand_id));
    }
  };

  const categoriesSchema = titleSchema();

  const formik = useFormik({
    initialValues: {
      language: "",
      title: {},
    },
    validationSchema: categoriesSchema,
    onSubmit: handleSubmit,
  });

  const changeLan =
    props.languages &&
    props.languages.find((obj) => {
      return obj.key === formik.values.language;
    });


  useEffect(() => {
    const { language, title } = formik.values;
    if (language) {
      let isFormFilled = false;
      if (title && title[language]) {
        isFormFilled = true;
      }
      const nextLanguageOptions = languageOptions.map((l) =>
        l.key === language ? { ...l, isFormFilled } : { ...l }
      );
      setLanguageOptions(nextLanguageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  const handleClose = () => {
    formik.resetForm();
    props.setIsShow(!props.show);
    dispatch(resetFormUpdate());
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleCategory ? t("UPDATE_CATEGORY") : t("ADD_NEW_CATEGORY")}
        </Modal.Title>
        <div>
          <Button className="close_btn">
            <FontAwesomeIcon icon={`xmark`} onClick={() => handleClose()} />
          </Button>
        </div>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <div className="bg-icon-option form-group exp-input">
            <label htmlFor="text" className="form-label">
              {t("LANGUAGES")}
            </label>
            <DropdownWithMultilanguage
              changeLan={changeLan}
              default_language={languages && languages.default_language}
              languageOptions={languageOptions}
              setFieldValue={formik.setFieldValue}
              language={formik.values.language}
            />
          </div>
          <div className="form-group exp-input">
            <Form.Label>{t("CATEGORY_TITLE")}</Form.Label>
            <Form.Control
              type="text"
              className={` ${formik.values.language &&
                formik.touched.title &&
                formik.touched.title[formik.values.language] &&
                formik.errors.title &&
                formik.errors.title[formik.values.language] &&
                "is-invalid"
                }`}
              placeholder={t("INPUT_CATEGORY_TITLE")}
              name={`title.${formik.values.language}`}
              value={
                formik.values.title[formik.values.language]
                  ? formik.values.title[formik.values.language]
                  : ""
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.values.language &&
              formik.touched.title &&
              formik.touched.title[formik.values.language] &&
              formik.errors.title &&
              formik.errors.title[formik.values.language] && (
                <div className="invalid-feedback d-block">
                  {formik.errors.title[formik.values.language]}
                </div>
              )}
          </div>
          <div className="Experience-btn-modal flex justify-content-center">
            <Button
              className="btn"
              onClick={formik.handleSubmit}
              disabled={!(formik.isValid && formik.dirty)}
            >
              {t("SAVE")}
            </Button>
            <Button
              className="btn btn-outline-secondary"
              onClick={() => handleClose()}
            >
              {t("CANCEL")}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ServiceCategoriesAddModal;
