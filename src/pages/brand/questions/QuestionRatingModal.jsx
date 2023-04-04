import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuestions } from '../../../middlewares/questions';
import ToastService from '../../../helpers/toast-services'
import { resetQuestionData } from '../../../slices/question.slice'
import { choice_data } from '../../../helpers/jsonData'
import downArrow from '../../../assets/images/downArrow.svg'

const QuestionRatingModal = ({ show, setIsShow }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { singleQuestion, questions, saveUpdateLoading, saveUpdateMessage } = useSelector((state) => state.questions);

  useEffect(() => {
    if (singleQuestion) {
      formik.setValues({
        optional: singleQuestion.optional,
        choice: singleQuestion.choice,
      })
    } else {
      formik.setValues({
        optional: false,
        choice: " ",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleQuestion]);

  useEffect(() => {
    if (singleQuestion && singleQuestion.sequence > 2 && singleQuestion.deletable === false) {
      if (!saveUpdateLoading && saveUpdateMessage) {
        ToastService.success(saveUpdateMessage)
        setIsShow(false)
        formik.resetForm()
        dispatch(resetQuestionData())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUpdateMessage, singleQuestion])

  const handleSubmit = (values) => {
    if (singleQuestion) {
      const survey_Id = questions && questions[0] && questions[0]._id
      const payload = {
        question_id: singleQuestion._id,
        question_type: "question",
        question_data: {
          type: singleQuestion.type,
          name: singleQuestion.name,
          optional: values.optional,
          choice: values.choice,
          sequence: singleQuestion.sequence,
          draggable: singleQuestion.draggable
        }
      }
      dispatch(updateQuestions(payload, survey_Id))
    }
  }

  const formik = useFormik({
    initialValues: {
      choice: "",
      optional: false
    },
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    setIsShow(false)
    formik.resetForm()
    dispatch(resetQuestionData())
  }

  const handleChange = (e) => {
    formik.setFieldValue("choice", e)
  }

  const choice_label = choice_data && choice_data.find((obj) => {
    return obj.value === formik.values.choice;
  })

  return (
    <>
      {singleQuestion && singleQuestion !== null &&
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title className="cust-title">
              {singleQuestion.name && singleQuestion.name[t("language")]
                ? singleQuestion.name[t("language")]
                : singleQuestion.name[t("en")]}
            </Modal.Title>
            <div>
              <Button className="close_btn">
                <FontAwesomeIcon icon={`xmark`} onClick={() => setIsShow(false)} />
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group exp-input">
              <Form.Label>{t("HOW_MANY_ITEM_USER_CAN_RATE")}</Form.Label>
              {choice_label &&
                <Dropdown className='ellipsis'>
                  <Dropdown.Toggle
                    className="mb-4"
                  >
                    <div className='d-flex justify-content-between w-100 align-items-center'>
                      <span className='dropdown-value'>{t(choice_label.label)}</span>
                      <span>
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={'span'}>{t("SELECT_ITEM")}</Dropdown.Item>
                    {choice_data && choice_data.map((o, i) => (
                      <Dropdown.Item as={'span'} key={i}
                        onClick={() => handleChange(o.value)}>{t(o.label)}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              }
            </div>
            <div className="d-flex mb-4">
              <Form.Check
                type="checkbox"
                name="optional"
                checked={formik.values.optional}
                onChange={formik.handleChange}
              />
              <Form.Label className="mb-0 ms-2">
                {t("MAKE_IT_OPTIONAL")}
              </Form.Label>
            </div>
            <div className="Experience-btn-modal flex justify-content-center">
              <Button
                className="btn ml-1"
                onClick={formik.handleSubmit}
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
          </Modal.Body>
        </Modal>
      }
    </>
  )
}

export default QuestionRatingModal