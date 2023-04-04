import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperienceTypeByBrandId,
  getExperienceType,
  updateExperienceType,
} from "../../../../middlewares/experienceType";
import { resetForm } from "../../../../slices/experienceType.slice";
import ToastService from "../../../../helpers/toast-services";
import { useTranslation } from "react-i18next";
import { exp_type } from "../../../../helpers/yup.validation.schema";

const AddExperienceModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    saveExpLoading,
    saveExpMessage,
    experienceTypeData,
    singleExperience,
    saveExperienceMessage,
    saveExperienceLoading,
  } = useSelector((state) => state.experience);

  useEffect(() => {
    dispatch(getExperienceType(props.b_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!saveExpLoading) {
      if (saveExpMessage) {
        ToastService.success(saveExpMessage);
        props.setIsShow(!props.show);
        dispatch(resetForm());
        formik.resetForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveExpMessage]);

  useEffect(() => {
    if (!saveExperienceLoading) {
      if (saveExperienceMessage) {
        ToastService.success(saveExperienceMessage);
        props.setIsShow(!props.show);
        dispatch(resetForm());
        formik.resetForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveExperienceMessage]);

  useEffect(() => {
    if (singleExperience !== null) {
      formik.setValues({
        title: singleExperience.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleExperience]);

  const handleSubmit = (values) => {
    const b_id = props.b_id;
    const newValue = {
      title: values.title,
    };
    const payload = { experienceType: newValue };
    if (singleExperience !== null) {
      dispatch(updateExperienceType(payload, singleExperience._id));
    } else {
      dispatch(addExperienceTypeByBrandId(payload, b_id));
    }
  };

  const ExperienceSchema = Yup.object().shape({
    title: exp_type,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: ExperienceSchema,
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    props.setIsShow(!props.show);
    dispatch(resetForm());
    formik.resetForm();
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>
          {singleExperience !== null
            ? t("UPDATE_EXPERIENCE_TYPE")
            : t("ADD_NEW_EXPERIENCE_TYPE")}
        </Modal.Title>
        <div>
          <Button className="close_btn" onClick={() => handleClose()}>
            <FontAwesomeIcon icon={`xmark`} />
          </Button>
        </div>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <div className="form-group">
            <Form.Label>{t("EXPERIENCE_TYPE_NAME")}</Form.Label>
            <Form.Control
              type="text"
              name="title"
              className={`${formik.touched.title && formik.errors.title && "is-invalid"
                }`}
              placeholder="Input Experience type"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="invalid-feedback d-block">
                {formik.errors.title}
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

export default AddExperienceModal;
