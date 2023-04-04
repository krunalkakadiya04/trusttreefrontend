import React, { useEffect } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addBranch, updateBranch } from "../../middlewares/branches";
import ToastService from "../../helpers/toast-services";
import { branch_name } from "../../helpers/yup.validation.schema";
import ErrorList from "../../components/error-list/ErrorList";
import { resetForm } from "../../slices/branches.slice";
import { useTranslation } from "react-i18next";

const BranchAddModal = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const {
    saveLoading,
    saveBranchMessage,
    singleBranch,
    saveUpdateLoading,
    saveBranchUpdateMessage,
    saveBranchUpdateError,
  } = useSelector((state) => state.branch);

  useEffect(() => {
    if (!saveUpdateLoading) {
      if (saveBranchUpdateMessage) {
        ToastService.success(saveBranchUpdateMessage);
        props.setIsShow(!props.show);
        formik.resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveBranchUpdateMessage]);

  useEffect(() => {
    if (singleBranch !== null) {
      formik.setValues({
        name: singleBranch ? singleBranch.name && singleBranch.name : "",
        address: singleBranch
          ? singleBranch.address && singleBranch.address
          : "",
      });
    } else {
      formik.setValues({
        name: "",
        address: "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleBranch]);

  useEffect(() => {
    if (!saveLoading) {
      if (saveBranchMessage) {
        ToastService.success(saveBranchMessage);
        props.setIsShow(!props.show);
        formik.resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveBranchMessage]);

  const handleSubmit = (values) => {
    if (singleBranch && singleBranch._id) {
      const branch_id = singleBranch._id;
      const newValues = {
        name: values.name,
        address: values.address,
      };
      const payload = { updateBranch: newValues };
      dispatch(updateBranch(payload, branch_id));
    } else {
      const payload = {
        name: values.name,
        address: values.address,
        brand_id: props.selectBrandId,
      };
      dispatch(addBranch(payload));
    }
  };

  const addBranchSchema = Yup.object().shape({
    name: branch_name,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validationSchema: addBranchSchema,
    onSubmit: handleSubmit,
  });

  // const reset_Form = () => {
  //   formik.resetForm({ values: { name: "", category: "" } });
  // };

  const handleClose = () => {
    props.setIsShow(!props.show);
    formik.resetForm()
    dispatch(resetForm());
  };

  return (
    <Modal show={props.show} >
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleBranch ?
            t("UPDATE_BRANCH")
            :
            t("ADD_NEW_BRANCH")
          }
        </Modal.Title>
        <div>
          <Button className="close_btn" onClick={() => handleClose()}>
            <FontAwesomeIcon icon={`xmark`} />
          </Button>
        </div>
      </Modal.Header>
      {saveBranchUpdateError && <ErrorList error={saveBranchUpdateError} />}
      <Form>
        <Modal.Body>
          <div className="inputWrap mb-3">
            <Form.Label>{t("BRANCH_NAME")}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              className={`${formik.touched.name && formik.errors.name && "is-invalid"
                }`}
              placeholder={t("INPUT_BRANCH_NAME")}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback d-block">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="inputWrap mb-3">
            <Form.Label>
              {t("ADDRESS")} <small>({t("OPTIONAL")}) </small>
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder={t("INPUT_BRANCH_ADDRESS")}
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          <div className="Experience-btn-modal flex justify-content-center">
            <Button className="btn" onClick={formik.handleSubmit} disabled={!(formik.isValid && formik.dirty)}>{t("SAVE")}</Button>
            <Button className="btn btn-outline-secondary" onClick={() => handleClose()}>{t("CANCEL")}</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default BranchAddModal;
