import React, { useEffect } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateUser } from "../../middlewares/users";
import ToastService from "../../helpers/toast-services";
import { email, name, permission } from "../../helpers/yup.validation.schema";
import { useTranslation } from "react-i18next";
import { user_permission_data } from "../../helpers/jsonData";
import downArrow from '../../assets/images/downArrow.svg'

const UpdateModal = (props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { singleUser, singleUserId, saveUpdateLoading, saveUpdateMessage } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (!saveUpdateLoading) {
      if (saveUpdateMessage) {
        ToastService.success(saveUpdateMessage);
        props.setIsShow(!props.show);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUpdateMessage]);

  const handleSubmit = (values) => {
    const payload = { user: values };
    const userId = singleUserId;
    dispatch(updateUser(payload, userId));
  };

  const updateUserSchema = Yup.object().shape({
    name: name,
    email: email,
    permission: permission,
  });

  const formik = useFormik({
    initialValues: {
      name: singleUser.name,
      email: singleUser.email,
      permission: singleUser.permission,
    },
    validationSchema: updateUserSchema,
    onSubmit: handleSubmit,
  });

  const handleChange = (e) => {
    formik.setFieldValue("permission", e)
  }

  const permission_label = user_permission_data && user_permission_data.find((obj) => {
    return obj.value === formik.values.permission;
  })

  return (
    <div>
      {singleUser && singleUser !== null && (
        <Modal show={props.show} size="xl">
          <Modal.Header>
            <Modal.Title>{t("UPDATE_USER")}
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
              <div className="newUserForm">
                <ul className="p-0">
                  <li>
                    <Form.Label>{t("Name")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      className={` ${formik.errors.name && "is-invalid"}`}
                      placeholder={t("INPUT_USER_NAME")}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.name}
                      </div>
                    )}
                  </li>
                  <li>
                    <Form.Label>{t("Email")}</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      className={` ${formik.errors.email && "is-invalid"}`}
                      placeholder={t("INPUT_USER_EMAIL")}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}
                  </li>
                  <li>
                    <Form.Label>{t("Permission")}</Form.Label>
                    {permission_label &&
                      <Dropdown className='ellipsis'>
                        <Dropdown.Toggle
                          className="mb-4"
                        >
                          <div className='d-flex justify-content-between w-100 align-items-center'>
                            <span className='dropdown-value'>{t(permission_label.label)}</span>
                            <span>
                              <img src={downArrow} alt="downArrow" />
                            </span>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item as={'span'} disabled>{t("SELECT_USER_PERMISSION")}</Dropdown.Item>
                          {props.userProfile &&
                            props.userProfile.permission === "owner" && (
                              <Dropdown.Item as={'span'} onClick={() => handleChange("master")}>{t("MASTER")}</Dropdown.Item>
                            )}
                          <Dropdown.Item as={'span'} onClick={() => handleChange("editor")}>{t("EDITOR")}</Dropdown.Item>
                          <Dropdown.Item as={'span'} onClick={() => handleChange("viewer")}>{t("VIEWER")}</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    }
                    {formik.errors.permission && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.permission}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              <div className="Experience-btn-modal flex justify-content-center">
                <Button
                  onClick={formik.handleSubmit}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  {t("SAVE")}
                </Button>
                <Button
                  className="btn-outline-secondary"
                  onClick={() => props.setIsShow(!props.show)}
                >
                  {t("CANCEL")}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default UpdateModal;
