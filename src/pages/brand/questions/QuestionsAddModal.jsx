import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FieldArray, FormikProvider, useFormik } from 'formik'
import { Button, Form, Modal, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestions, updateQuestions } from '../../../middlewares/questions'
import DropdownWithMultilanguage from '../dropdown-multilanguage/DropdownWithMultilanguage'
import ToastService from "../../../helpers/toast-services";
import trash from "../../../assets/images/trash.svg";
import { questionSchema } from '../../../helpers/yup.validation.schema'
import { resetQuestionData } from '../../../slices/question.slice'
import downArrow from '../../../assets/images/downArrow.svg'
import { question_type_data } from '../../../helpers/jsonData'
import plus from '../../../assets/images/Plus.svg'

const QuestionsAddModal = ({ show, setIsShow, lng, questionId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [languageOptions, setLanguageOptions] = useState([])
  const { languages, saveMessage, saveLoading, questions, singleQuestion, saveUpdateMessage, saveUpdateLoading } = useSelector((state) => state.questions);

  useEffect(() => {
    if (lng && lng.length > 0) {
      const newLanguageOptions = lng.map((l) => {
        return { ...l, isFormFilled: false };
      });
      setLanguageOptions(newLanguageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng]);

  useEffect(() => {
    if (singleQuestion && singleQuestion.deletable === true) {
      if (!saveUpdateLoading && saveUpdateMessage) {
        ToastService.success(saveUpdateMessage)
        setIsShow(false)
        formik.resetForm()
        dispatch(resetQuestionData())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUpdateMessage, singleQuestion])

  useEffect(() => {
    if (!questionId) {
      if (!saveLoading && saveMessage) {
        ToastService.success(saveMessage)
        setIsShow(false)
        formik.resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage])

  useEffect(() => {
    if (singleQuestion && singleQuestion !== null) {
      formik.setValues({
        language: "en",
        name: singleQuestion.name,
        optional: singleQuestion.optional,
        type: singleQuestion.type,
        options: singleQuestion.options
      })
    } else {
      formik.setValues({
        language: "en",
        name: {},
        optional: false,
        type: "single",
        options: [""]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleQuestion]);

  const handleSubmit = (values) => {
    const survey_Id = questions && questions[0] && questions[0]._id
    const sequence_num = questions && questions[0] && questions[0].question && questions[0].question.length
    const payload = {
      question_type: "question",
      question_data: {
        type: values.type,
        name: values.name,
        optional: values.optional,
        sequence: sequence_num,
        draggable: true
      },
    }
    if (values.type === "multiple") {
      payload.question_data.options = values.options
    }
    if (singleQuestion && singleQuestion !== null) {
      payload.question_id = singleQuestion._id
      dispatch(updateQuestions(payload, survey_Id))
    } else {
      dispatch(addQuestions(payload, survey_Id))
    }
  }

  const questionCategorySchema = questionSchema;

  const formik = useFormik({
    initialValues: {
      language: "en",
      name: {},
      optional: false,
      type: "single",
      options: [""]
    },
    validationSchema: questionCategorySchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const { language, name } = formik.values;
    if (language) {
      let isFormFilled = false;
      if ((name && name[language])) {
        isFormFilled = true;
      }
      const nextLanguageOptions = languageOptions.map(l => l.key === language ? { ...l, isFormFilled } : { ...l })
      setLanguageOptions(nextLanguageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])

  const changeLan = lng && lng.find((obj) => {
    return obj.key === formik.values.language;
  });

  const handleClose = () => {
    setIsShow(false)
    formik.resetForm()
    dispatch(resetQuestionData())
  }

  const handleAddNewService = (arrayHelpers) => {
    arrayHelpers.push("");
  };


  const handleChange = (e) => {
    formik.setFieldValue("type", e)
  }

  const question_type_label = question_type_data && question_type_data.find((obj) => {
    return obj.value === formik.values.type;
  })


  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleQuestion
            ? t("UPDATE_QUESTIONS")
            : t("ADD_NEW_QUESTIONS")
          }
        </Modal.Title>
        <div>
          <Button className="close_btn">
            <FontAwesomeIcon icon={`xmark`} onClick={() => handleClose()} />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className='Edit-Buttons-modal-body'>
        <Form>
          <FormikProvider value={formik}>
            <FieldArray
              name="options"
              render={(arrayHelpers) => (
                <div className="modal-edit-btn-inner ">
                  <div className="bg-icon-option form-group">
                    <div className="form-group exp-input">
                      <Form.Label>{t("QUESTION_TYPE")}</Form.Label>
                      {question_type_label &&
                        <Dropdown className='ellipsis'>
                          <Dropdown.Toggle
                            className="mb-4"
                          >
                            <div className='d-flex justify-content-between w-100 align-items-center'>
                              <span className='dropdown-value'>{t(question_type_label.label)}</span>
                              <span>
                                <img src={downArrow} alt="downArrow" />
                              </span>
                            </div>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item as={'span'} disabled>{t("SELECT_ITEM")}</Dropdown.Item>
                            {question_type_data && question_type_data.map((o, i) => (
                              <Dropdown.Item as={'span'} key={i}
                                onClick={() => handleChange(o.value)}>{t(o.label)}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      }
                      {formik.touched.type && formik.errors.type && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.type}
                        </div>
                      )}
                    </div>
                    <div className="form-group exp-input">
                      <Form.Label>{t("LANGUAGES")}</Form.Label>
                      <DropdownWithMultilanguage
                        changeLan={changeLan}
                        default_language={languages && languages.default_language}
                        languageOptions={languageOptions}
                        setFieldValue={formik.setFieldValue}
                        language={formik.values.language}
                      />
                    </div>
                    <div className="form-group exp-input">
                      <Form.Label>{t("QUESTION_TITLE")}</Form.Label>
                      <Form.Control type='text'
                        className={` ${formik.values.language &&
                          formik.touched.name &&
                          formik.touched.name[formik.values.language] &&
                          formik.errors.name &&
                          formik.errors.name[formik.values.language] &&
                          "is-invalid"
                          }`}
                        placeholder={t("INPUT_QUESTION_TITLE")}
                        name={`name.${formik.values.language}`}
                        value={formik.values.name[formik.values.language] ? formik.values.name[formik.values.language] : ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.values.language &&
                        formik.touched.name &&
                        formik.touched.name[formik.values.language] &&
                        formik.errors.name &&
                        formik.errors.name[formik.values.language] && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.name[formik.values.language]}
                          </div>
                        )}
                    </div>

                    <div className="form-group exp-input d-flex">
                      <Form.Check
                        type="checkbox"
                        name="optional"
                        checked={formik.values.optional}
                        onChange={formik.handleChange}
                      />
                      <Form.Label className='mb-0 ms-2'>{t("MAKE_IT_OPTIONAL")}</Form.Label>
                    </div>
                    {formik.values.type === "multiple" &&
                      formik.values.options &&
                      formik.values.options.length > 0 && (
                        <>
                          <div className="form-group exp-input mt-5">
                            <Form.Label>{t("OPTIONS")}</Form.Label>
                            {formik.values.options.map((o, index) => (
                              <div key={index}>
                                <div className="d-flex mb-2">
                                  <Form.Control
                                    type="text"
                                    className={`tc-input ${formik.touched.options &&
                                      formik.touched.options[index] &&
                                      formik.errors.options &&
                                      formik.errors.options[index] &&
                                      "is-invalid"
                                      }`}
                                    name={`options.${index}`}
                                    value={o}
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
                                {formik.touched.options &&
                                  formik.touched.options[index] &&
                                  formik.errors.options &&
                                  formik.errors.options[index] && (
                                    <div className="invalid-feedback d-block mb-2">
                                      {formik.errors.options[index]}
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
                              <img src={plus} alt="plus" />
                            </span>
                            {t("ADD_NEW_OPTION")}
                          </button>
                        </>
                      )}

                    <div className="Experience-btn-modal flex justify-content-center">
                      <Button
                        className="btn ml-1"
                        onClick={formik.handleSubmit}
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        {t("SAVE")}
                      </Button>
                      <Button
                        className="btn btn-outline-secondary mr-1"
                        onClick={() => handleClose()}
                      >
                        {t("CANCEL")}
                      </Button>
                    </div>
                  </div>
                </div>
              )} />
          </FormikProvider>
        </Form>
      </Modal.Body>

    </Modal>
  )
}

export default QuestionsAddModal