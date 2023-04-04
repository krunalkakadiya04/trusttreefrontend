import React, { useEffect } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBrand, updateBrand } from "../../middlewares/brands";
import ToastService from "../../helpers/toast-services";
import {
  brand_name,
  brand_selection,
} from "../../helpers/yup.validation.schema";
import { resetForm } from "../../slices/brands.slice";
import ErrorList from "../../components/error-list/ErrorList";
import BrandImage from "./BrandImage";
import { useTranslation } from "react-i18next";
import { brand_category_data } from "../../helpers/jsonData";
import downArrow from '../../assets/images/downArrow.svg'

const BrandsAddModal = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  const {
    saveMessage,
    saveLoading,
    singleBrand,
    saveUpdateLoading,
    saveUpdateMessage,
    saveUpdateError,
  } = useSelector((state) => state.brand);

  useEffect(() => {
    if (!saveUpdateLoading) {
      if (saveUpdateMessage) {
        ToastService.success(saveUpdateMessage);
        props.setIsShow(!props.show);
        reset_Form();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUpdateMessage]);

  useEffect(() => {
    if (!saveLoading) {
      if (saveMessage) {
        ToastService.success(saveMessage);
        props.setIsShow(!props.show);
        reset_Form();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  useEffect(() => {
    if (singleBrand !== null) {
      formik.setValues({
        name: singleBrand ? singleBrand.name && singleBrand.name : "",
        category: singleBrand
          ? singleBrand.category && singleBrand.category
          : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleBrand]);

  const addBranchSchema = Yup.object().shape({
    name: brand_name,
    category: brand_selection,
  });

  const reset_Form = () => {
    formik.resetForm({ values: { name: "", category: "" } });
  };

  const handleClose = () => {
    props.setIsShow(!props.show);
    reset_Form();
    dispatch(resetForm());
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    if (values.logo) {
      formData.append("file", values.logo[0]);
    }
    formData.append("name", values.name);
    formData.append("category", values.category);
    if (singleBrand && singleBrand._id) {
      const brand_id = singleBrand && singleBrand._id;
      dispatch(updateBrand(formData, brand_id));
    } else {
      dispatch(addBrand(formData));
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
    },
    validationSchema: addBranchSchema,
    onSubmit: handleSubmit,
  });

  const handleChange = (e) => {
    formik.setFieldValue("category", e)
  }

  const brand_category_label = brand_category_data && brand_category_data.find((obj) => {
    return obj.value === formik.values.category;
  })

  return (
    <Modal show={props.show} className="modal-lg">
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleBrand ?
            t("UPDATE_BRAND")
            :
            t("ADD_NEW_BRAND")
          }
        </Modal.Title>
        <div>
          <Button className="close_btn" onClick={() => handleClose()}>
            <FontAwesomeIcon icon={`xmark`} />
          </Button>
        </div>
      </Modal.Header>
      {saveUpdateError && <ErrorList error={saveUpdateError} />}
      <Form>
        <Modal.Body>
          <div className="flex">
            <div className="modalAddBranchLeft">
              <div className="inputWrap mb-3">
                <Form.Label>{t("BRAND_NAME")}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className={`${formik.touched.name && formik.errors.name && "is-invalid"}`}
                  placeholder={t("INPUT_BRAND_NAME")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="inputWrap mb-3">
                <Form.Label>{t("BRAND_CATEGORY")}</Form.Label>
                <Dropdown className='ellipsis'>
                  <Dropdown.Toggle
                    name="category"
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.category &&
                      formik.errors.category &&
                      "is-invalid"
                      }`}
                  >
                    <div className='d-flex justify-content-between w-100 align-items-center'>
                      <span className='dropdown-value'>{t(brand_category_label.label)}</span>
                      <span>
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {brand_category_data && brand_category_data.map((o, i) => (
                      <Dropdown.Item as={'span'} value={o.value} key={i}
                        onClick={() => handleChange(o.value)}>{t(o.label)}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {formik.touched.category && formik.errors.category && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.category}
                  </div>
                )}
              </div>
            </div>
            <div className="modalAddBranchRight">
              <div className="inputWrap">
                <label className="form-label">{t("BRAND_LOGO")}</label>
                <BrandImage
                  setFieldValue={formik.setFieldValue}
                  singleBrand={singleBrand}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="Experience-btn-modal flex justify-content-center">
          <Button
            className="btn"
            onClick={formik.handleSubmit}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t("SAVE")}
          </Button>
          <Button className="btn btn-outline-secondary" onClick={() => handleClose()}>
            {t("CANCEL")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BrandsAddModal;
