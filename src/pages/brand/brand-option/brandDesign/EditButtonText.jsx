import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DropdownWithMultilanguage from "../../dropdown-multilanguage/DropdownWithMultilanguage";
import { useDispatch } from "react-redux";
import {
  setProductButton,
  setServiceButton,
  setSurveyButton,
} from "../../../../slices/feedbacks";

const EditButtonText = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setFieldValue } = props;
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    if (props.brandsDesign && props.brandsDesign !== "") {
      formik.setValues({
        edit_button_text_survey_button:
          props.brandsDesign.edit_button_text_survey_button,
        edit_button_text_products_list:
          props.brandsDesign.edit_button_text_products_list,
        edit_button_text_services_list:
          props.brandsDesign.edit_button_text_services_list,
        edit_button_text_staff_name:
          props.brandsDesign.edit_button_text_staff_name,
        language: "en",
      });
    } else {
      formik.setValues({
        edit_button_text_survey_button: "",
        edit_button_text_products_list: "",
        edit_button_text_services_list: "",
        edit_button_text_staff_name: "",
        language: "en",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.brandsDesign]);

  const handleSubmit = (values) => {
    setFieldValue(
      "edit_button_text_survey_button",
      values.edit_button_text_survey_button
    );
    setFieldValue(
      "edit_button_text_products_list",
      values.edit_button_text_products_list
    );
    setFieldValue(
      "edit_button_text_services_list",
      values.edit_button_text_services_list
    );
    setFieldValue(
      "edit_button_text_staff_name",
      values.edit_button_text_staff_name
    );
    props.setIsShow(!props.show);
  };

  const formik = useFormik({
    initialValues: {
      edit_button_text_survey_button: "",
      edit_button_text_products_list: "",
      edit_button_text_services_list: "",
      edit_button_text_staff_name: "",
      language: "",
    },
    onSubmit: handleSubmit,
  });

  const changeLan =
    props.languages &&
    props.languages.find((obj) => {
      return obj.key === formik.values.language;
    });

  useEffect(() => {
    if (props && props.languages && props.languages.length) {
      const languageOptions = props.languages.map((l) => {
        return { ...l, isFormFilled: false };
      });
      setLanguageOptions(languageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      language,
      edit_button_text_survey_button,
      edit_button_text_products_list,
      edit_button_text_services_list,
      edit_button_text_staff_name,
    } = formik.values;
    if (language) {
      let isFormFilled = false;
      if (
        edit_button_text_survey_button &&
        edit_button_text_survey_button[language] &&
        edit_button_text_products_list &&
        edit_button_text_products_list[language] &&
        edit_button_text_services_list &&
        edit_button_text_services_list[language] &&
        edit_button_text_staff_name &&
        edit_button_text_staff_name[language]
      ) {
        isFormFilled = true;
      }
      const nextLanguageOptions = languageOptions.map((l) =>
        l.key === language ? { ...l, isFormFilled } : { ...l }
      );
      setLanguageOptions(nextLanguageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  useEffect(() => {
    dispatch(setSurveyButton(formik.values.edit_button_text_survey_button));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.edit_button_text_survey_button]);

  useEffect(() => {
    dispatch(setProductButton(formik.values.edit_button_text_products_list));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.edit_button_text_products_list]);

  useEffect(() => {
    dispatch(setServiceButton(formik.values.edit_button_text_services_list));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.edit_button_text_services_list]);

  return (
    <Modal show={props.show} className="Edit-Button-content">
      <Modal.Header className="edit-button-header">
        <Modal.Title className="cust-title">
          <h5 className="modal-title" id="Edit-Buttons-Text">
            {t("EDIT_BUTTON_TEXT")}
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="Edit-Buttons-modal-body">
        <Form>
          <div className="modal-edit-btn-inner ">
            <div className="bg-icon-option form-group exp-input">
              <Form.Label htmlFor="text" className="form-label">
                {t("LANGUAGES")}
              </Form.Label>
              <DropdownWithMultilanguage
                changeLan={changeLan}
                default_language={props.default_language}
                languageOptions={languageOptions}
                setFieldValue={formik.setFieldValue}
                language={formik.values.language}
              />
            </div>
            <div className="form-group exp-input">
              <Form.Label htmlFor="text">
                {t("START_SURVEY_BUTTON")}{" "}
                {changeLan ? t(changeLan.value) : t("English")}
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Default Text: Start the Survey"
                name={`edit_button_text_survey_button.${formik.values.language}`}
                value={
                  formik.values.edit_button_text_survey_button[
                    formik.values.language
                  ]
                    ? formik.values.edit_button_text_survey_button[
                        formik.values.language
                      ]
                    : ""
                }
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group exp-input">
              <Form.Label htmlFor="text">
                {t("PRODUCT_LIST_BUTTON")}{" "}
                {changeLan ? t(changeLan.value) : t("English")}
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Default Text: Products List"
                name={`edit_button_text_products_list.${formik.values.language}`}
                value={
                  formik.values.edit_button_text_products_list[
                    formik.values.language
                  ]
                    ? formik.values.edit_button_text_products_list[
                        formik.values.language
                      ]
                    : ""
                }
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group exp-input">
              <Form.Label htmlFor="text">
                {t("SERVICE_TEXT_BUTTON")}{" "}
                {changeLan ? t(changeLan.value) : t("English")}
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Default Text: Services List"
                name={`edit_button_text_services_list.${formik.values.language}`}
                value={
                  formik.values.edit_button_text_services_list[
                    formik.values.language
                  ]
                    ? formik.values.edit_button_text_services_list[
                        formik.values.language
                      ]
                    : ""
                }
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group exp-input">
              <Form.Label htmlFor="text">
                {t("STAFF_NAME")}{" "}
                {changeLan ? t(changeLan.value) : t("English")}
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Default Text: Staff"
                name={`edit_button_text_staff_name.${formik.values.language}`}
                value={
                  formik.values.edit_button_text_staff_name[
                    formik.values.language
                  ]
                    ? formik.values.edit_button_text_staff_name[
                        formik.values.language
                      ]
                    : ""
                }
                onChange={formik.handleChange}
              />
            </div>

            <div className="Experience-btn-modal flex justify-content-center">
              <Button className="btn" disabled="" onClick={formik.handleSubmit}>
                {t("SAVE")}
              </Button>
              <Button
                className="btn btn-outline-secondary"
                onClick={() => props.setIsShow(!props.show)}
              >
                {t("CANCEL")}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditButtonText;
