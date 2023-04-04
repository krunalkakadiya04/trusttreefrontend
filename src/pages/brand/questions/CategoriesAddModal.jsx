import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ToastService from '../../../helpers/toast-services'
import { titleSchema } from '../../../helpers/yup.validation.schema'
import { addQuestions, updateQuestions } from '../../../middlewares/questions'
import { resetQuestionData } from '../../../slices/question.slice'
import DropdownWithMultilanguage from '../dropdown-multilanguage/DropdownWithMultilanguage'

const CategoriesAddModal = ({ show, setIsShow, lng, questionId }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [languageOptions, setLanguageOptions] = useState([])
  const { languages, questions, saveLoading, saveMessage, singleQuestion, saveUpdateLoading, saveUpdateMessage } = useSelector((state) => state.questions);

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
    if (questionId) {
      if (!saveLoading && saveMessage) {
        ToastService.success(saveMessage)
        setIsShow(false)
        formik.resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage])

  useEffect(() => {
    if (questionId) {
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
    if (singleQuestion && singleQuestion !== null) {
      formik.setValues({
        language: "en",
        title: singleQuestion.name
      })
    } else {
      formik.setValues({
        language: "en",
        title: {}
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleQuestion]);

  const handleSubmit = (values) => {
    const survey_Id = questions && questions[0] && questions[0]._id
    const seq_num = questions && questions[0] && questions[0].question && questions[0].question && questions[0].question[0]
      && questions[0].question[0] && questions[0].question[0].category_option && questions[0].question[0].category_option.length
    const payload = {
      question_id: questionId,
      question_type: "category_option",
      question_data: {
        name: values.title,
        editable: true,
        sequence: seq_num,
        draggable: true
      }
    }
    if (singleQuestion && singleQuestion !== null) {
      payload.category_option_id = singleQuestion._id
      dispatch(updateQuestions(payload, survey_Id))
    } else {
      dispatch(addQuestions(payload, survey_Id))
    }
  }

  const questionCategorySchema = titleSchema();

  const formik = useFormik({
    initialValues: {
      language: "en",
      title: {},
    },
    validationSchema: questionCategorySchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const { language, title } = formik.values;
    if (language) {
      let isFormFilled = false;
      if ((title && title[language])) {
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

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleQuestion
            ? "Update Category"
            : "Add New Category"
          }
        </Modal.Title>
        <div>
          <Button className="close_btn">
            <FontAwesomeIcon icon={`xmark`} onClick={() => handleClose()} />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="bg-icon-option form-group exp-input">
          <label htmlFor="text" className='form-label'>{t("LANGUAGES")}</label>
          <DropdownWithMultilanguage
            changeLan={changeLan}
            default_language={languages && languages.default_language}
            languageOptions={languageOptions}
            setFieldValue={formik.setFieldValue}
            language={formik.values.language}
          />
        </div>
        <div className="form-group exp-input">
          <Form.Label>{t("CATEGORY_NAME")}</Form.Label>
          <Form.Control
            type='text'
            className={` ${formik.values.language &&
              formik.touched.title &&
              formik.touched.title[formik.values.language] &&
              formik.errors.title &&
              formik.errors.title[formik.values.language] &&
              "is-invalid"
              }`}
            placeholder={t("INPUT_CATEGORY_NAME")}
            name={`title.${formik.values.language}`}
            value={formik.values.title[formik.values.language] ? formik.values.title[formik.values.language] : ""}
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
    </Modal>
  )
}

export default CategoriesAddModal