import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik, FieldArray, FormikProvider } from "formik";
import trash from "../../../../assets/images/trash.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DropdownWithMultilanguage from "../../dropdown-multilanguage/DropdownWithMultilanguage";
import { termSchema } from "../../../../helpers/yup.validation.schema";
import plus from "../../../../assets/images/Plus.svg";

const TermsAndConditionModal = (props) => {
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
    if (
      props.termsAndCondition &&
      props.termsAndCondition.length > 0 &&
      props.termsAndCondition[0] &&
      Object.keys(props.termsAndCondition[0]).length !== 0
    ) {
      const data = props.termsAndCondition.map((o) => {
        return o;
      });
      formik.setFieldValue(`terms_and_condition`, data);
      formik.setFieldValue(`language`, "en");
    } else {
      formik.setValues({
        terms_and_condition: [{}],
        language: "en",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.termsAndCondition]);

  const handleSubmit = (values) => {
    setFieldValue("terms_and_condition", values.terms_and_condition);
    props.setIsShow(!props.show);
  };

  const rewardsSchema = termSchema;

  const formik = useFormik({
    initialValues: {
      terms_and_condition: [{}],
      language: "",
    },
    validationSchema: rewardsSchema,
    onSubmit: handleSubmit,
  });

  const handleAddNewService = (arrayHelpers) => {
    arrayHelpers.push({});
  };

  const changeLan =
    props.languages &&
    props.languages.find((obj) => {
      return obj.key === formik.values.language;
    });

  useEffect(() => {
    const { language, terms_and_condition } = formik.values;
    if (language) {
      let isFormFilled = false;
      terms_and_condition &&
        terms_and_condition.length > 0 &&
        terms_and_condition.map((o) => {
          if (o && o[language]) {
            isFormFilled = true;
          }
          return o;
        });
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
        <Modal.Title className="cust-title">
          {t("TERMS_AND_CONDITION")}
        </Modal.Title>
        <div>
          <Button
            className="close_btn"
            onClick={() => props.setIsShow(!props.show)}
          >
            <FontAwesomeIcon icon={`xmark`} />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormikProvider value={formik}>
            <FieldArray
              name="terms_and_condition"
              render={(arrayHelpers) => (
                <>
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
                  {formik.values.terms_and_condition &&
                    formik.values.terms_and_condition.length > 0 && (
                      <>
                        <div className="form-group exp-input">
                          <Form.Label>{t("TERMS_CONDITION")}</Form.Label>
                          {formik.values.terms_and_condition.map((o, index) => (
                            <div key={index}>
                              <div className="d-flex mb-2">
                                <Form.Control
                                  type="text"
                                  className={`tc-input ${formik.touched.terms_and_condition &&
                                    formik.touched.terms_and_condition[index] &&
                                    formik.touched.terms_and_condition[index][
                                    formik.values.language
                                    ] &&
                                    formik.errors.terms_and_condition &&
                                    formik.errors.terms_and_condition[index] &&
                                    formik.errors.terms_and_condition[index][
                                    formik.values.language
                                    ] &&
                                    "is-invalid"
                                    }`}
                                  placeholder={t("INPUT_THE_TERM_TEXT")}
                                  name={`terms_and_condition.${index}.${formik.values.language}`}
                                  value={
                                    o[formik.values.language]
                                      ? o[formik.values.language]
                                      : ""
                                  }
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {index !== 0 && (
                                  <img
                                    src={trash}
                                    alt="trash"
                                    className="ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => arrayHelpers.remove(index)}
                                  />
                                )}
                              </div>
                              {formik.touched.terms_and_condition &&
                                formik.touched.terms_and_condition[index] &&
                                formik.touched.terms_and_condition[index][
                                formik.values.language
                                ] &&
                                formik.errors.terms_and_condition &&
                                formik.errors.terms_and_condition[index] &&
                                formik.errors.terms_and_condition[index][
                                formik.values.language
                                ] && (
                                  <div className="invalid-feedback d-block mb-2">
                                    {
                                      formik.errors.terms_and_condition[index][
                                      formik.values.language
                                      ]
                                    }
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="user-btn"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => handleAddNewService(arrayHelpers)}
                        >
                          <span className="user-icon">
                            <img src={plus} alt="" />
                          </span>
                          {t("ADD_NEW_USER")}
                        </button>
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
                      </>
                    )}
                </>
              )}
            />
          </FormikProvider>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TermsAndConditionModal;
