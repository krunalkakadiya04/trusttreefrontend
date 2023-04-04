import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DropdownWithMultilanguage from "../../dropdown-multilanguage/DropdownWithMultilanguage";
import { titleSchema } from "../../../../helpers/yup.validation.schema";

const RewardsModal = (props) => {
  const { t } = useTranslation();
  const { setFieldValue } = props;
  const [languageOptions, setLanguageOptions] = useState([]);
  const { languages } = useSelector((state) => state.rewards);

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
    if (props.title) {
      formik.setValues({
        title: props.title,
        language: "en",
      });
    } else {
      formik.setValues({
        title: {},
        language: "en",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.title]);

  const handleSubmit = (values) => {
    setFieldValue("title", values.title);
    props.setIsShow(!props.show);
  };

  const rewardsSchema = titleSchema("rewards");

  const formik = useFormik({
    initialValues: {
      title: {},
      language: "",
    },
    validationSchema: rewardsSchema,
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

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title className="cust-title">{t("THE_REWARD")}</Modal.Title>
        <div>
          <Button
            className="close_btn"
            onClick={() => props.setIsShow(!props.show)}
          >
            <FontAwesomeIcon icon={`xmark`} />
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
            <Form.Label>{t("REWARDS")}</Form.Label>
            <Form.Control
              type="text"
              className={` ${
                formik.values.language &&
                formik.touched.title &&
                formik.touched.title[formik.values.language] &&
                formik.errors.title &&
                formik.errors.title[formik.values.language] &&
                "is-invalid"
              }`}
              placeholder={t("INPUT_THE_REWARD_TEXT")}
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
              onClick={() => props.setIsShow(!props.show)}
            >
              {t("CANCEL")}
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default RewardsModal;
