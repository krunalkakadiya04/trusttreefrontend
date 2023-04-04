import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ToastService from '../../../helpers/toast-services'
import { updateQuestions } from '../../../middlewares/questions'
import { resetQuestionData } from '../../../slices/question.slice'

const QuestionOptionalModal = ({ show, setIsShow }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { singleQuestion, questions, saveUpdateLoading, saveUpdateMessage } = useSelector((state) => state.questions);

  useEffect(() => {
    if (singleQuestion) {
      formik.setValues({
        optional: singleQuestion.optional
      })
    } else {
      formik.setValues({
        optional: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleQuestion]);

  useEffect(() => {
    if (singleQuestion && singleQuestion.sequence < 3) {
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
          sequence: singleQuestion.sequence,
          draggable: singleQuestion.draggable
        }
      }
      dispatch(updateQuestions(payload, survey_Id))
    }
  }

  const formik = useFormik({
    initialValues: {
      optional: false,
    },
    onSubmit: handleSubmit,
  });

  const handleClose = () => {
    setIsShow(!show)
    formik.resetForm()
    dispatch(resetQuestionData())
  }

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
                <FontAwesomeIcon icon={`xmark`} onClick={() => setIsShow(!show)} />
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body>
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

export default QuestionOptionalModal