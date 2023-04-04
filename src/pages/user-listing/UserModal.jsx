import React, { useEffect } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import trash from "../../assets/images/trash.svg";
import { addUsers } from "../../middlewares/users";
import ToastService from "../../helpers/toast-services";
import { userCrudSchema } from "../../helpers/yup.validation.schema";
import { useTranslation } from "react-i18next";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import downArrow from "../../assets/images/downArrow.svg";
import plus from "../../assets/images/Plus.svg";

const UserModal = (props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { saveMessage, saveLoading } = useSelector((state) => state.user);

  const defaultServiceObject = {
    name: "",
    email: "",
    permission: "",
  };

  useEffect(() => {
    if (!saveLoading) {
      if (saveMessage) {
        ToastService.success(saveMessage);
        props.setIsShow(!props.show);
        formik.resetForm();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  const handleAddNewService = (arrayHelpers) => {
    arrayHelpers.push(defaultServiceObject);
  };

  const handleRemove = () => {
    formik.setFieldValue("users", [defaultServiceObject]);
    props.setIsShow(!props.show);
    formik.resetForm();
  };

  const handleSubmit = (values) => {
    const { users } = values;
    const payload = { users };
    dispatch(addUsers(payload));
  };

  // const handlePermitChanges=(fh,in,val)=>{
  // fh(in)
  // }

  const addUserSchema = userCrudSchema;

  const formik = useFormik({
    initialValues: {
      users: [
        {
          name: "",
          email: "",
          permission: "",
        },
      ],
    },
    validationSchema: addUserSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal show={props.show} size="xl">
        <Modal.Header>
          <Modal.Title>{t("ADD_NEW_USER")}</Modal.Title>
          <div>
            <Button className="close_btn" onClick={() => handleRemove()}>
              <FontAwesomeIcon icon={`xmark`} />
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormikProvider value={formik}>
              <FieldArray
                name="users"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.users && formik.values.users.length > 0 ? (
                      <>
                        <div className="modal-popup-form">
                          <div className="newUserForm mb-0">
                            <ul>
                              <li>
                                <Form.Label>{t("Name")}</Form.Label>
                              </li>
                              <li>
                                <Form.Label>{t("Email")}</Form.Label>
                              </li>
                              <li>
                                <Form.Label>{t("Permission")}</Form.Label>
                              </li>
                            </ul>
                          </div>
                          {formik.values.users.map((o, index) => (
                            <div className="newUserForm" key={index}>
                              <ul>
                                <li>
                                  {/* <Form.Label>Name</Form.Label> */}
                                  <Form.Control
                                    type="text"
                                    name={`users.${index}.name`}
                                    className={`${formik.touched.users &&
                                      formik.touched.users[index] &&
                                      formik.touched.users[index].name &&
                                      formik.errors.users &&
                                      formik.errors.users[index] &&
                                      formik.errors.users[index].name &&
                                      "is-invalid"
                                      }`}
                                    placeholder={t("INPUT_USER_NAME")}
                                    value={o.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.touched.users &&
                                    formik.touched.users[index] &&
                                    formik.touched.users[index].name &&
                                    formik.errors.users &&
                                    formik.errors.users[index] &&
                                    formik.errors.users[index].name && (
                                      <div className="invalid-feedback d-block mb-2">
                                        {formik.errors.users[index].name}
                                      </div>
                                    )}
                                </li>
                                <li>
                                  {/* <Form.Label>Email</Form.Label> */}
                                  <Form.Control
                                    type="text"
                                    name={`users.${index}.email`}
                                    className={`${((formik.touched.users &&
                                      formik.touched.users[index] &&
                                      formik.touched.users[index].email &&
                                      formik.errors.users &&
                                      formik.errors.users[index] &&
                                      formik.errors.users[index].email) ||
                                      (formik.errors &&
                                        formik.errors[index] &&
                                        formik.errors[index].email)) &&
                                      "is-invalid"
                                      }`}
                                    placeholder={t("INPUT_USER_EMAIL")}
                                    value={o.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.touched.users &&
                                    formik.touched.users[index] &&
                                    formik.touched.users[index].email &&
                                    formik.errors.users &&
                                    formik.errors.users[index] &&
                                    formik.errors.users[index].email && (
                                      <div className="invalid-feedback d-block mb-2">
                                        {formik.errors.users[index].email}
                                      </div>
                                    )}
                                  {formik.errors &&
                                    formik.errors[index] &&
                                    formik.errors[index].email && (
                                      <div className="invalid-feedback d-block mb-2">
                                        {formik.errors[index].email}
                                      </div>
                                    )}
                                </li>
                                <li>
                                  <Dropdown
                                    className={`ellipsisDrop  ${formik.touched.users &&
                                      formik.touched.users[index] &&
                                      formik.touched.users[index].permission &&
                                      formik.errors.users &&
                                      formik.errors.users[index] &&
                                      formik.errors.users[index].permission &&
                                      "is-invalid "
                                      }`}
                                    onClick={() =>
                                      formik.setFieldTouched(
                                        `users.${index}.permission`,
                                        true
                                      )
                                    }
                                  >
                                    <DropdownToggle
                                      className={`form-control select-height ${formik.touched.users &&
                                        formik.touched.users[index] &&
                                        formik.touched.users[index]
                                          .permission &&
                                        formik.errors.users &&
                                        formik.errors.users[index] &&
                                        formik.errors.users[index].permission &&
                                        "is-invalid hover"
                                        } ${formik.values.users[index]
                                          .permission !==
                                          ("master" || "editor" || "viewer")
                                          ? "select-default"
                                          : ""
                                        } `}
                                      placeholder={t("SELECT_USER_PERMISSION")}
                                    >
                                      {
                                        formik.values.users[index]
                                          .permission === "master"
                                          ? t("MASTER")
                                          : formik.values.users[index]
                                            .permission === "editor"
                                            ? t("EDITOR")
                                            : formik.values.users[index]
                                              .permission === "viewer"
                                              ? t("VIEWER")
                                              : t("SELECT_USER_PERMISSION")
                                        //  formik.values.users[index]
                                        //     .permission === "viewer"
                                        // ? t("VIEWER")
                                        // : t("SELECT_USER_PERMISSION")
                                      }
                                      <span className="d-Arrow">
                                        <img src={downArrow} alt="downArrow" />
                                      </span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem
                                        disabled
                                        value={`${t("SELECT_USER_PERMISSION")}`}
                                        id={`users.${index}.permission`}
                                        onBlur={formik.handleBlur}
                                      >
                                        {t("SELECT_USER_PERMISSION")}
                                      </DropdownItem>
                                      {props.userProfile &&
                                        props.userProfile.permission ===
                                        "owner" && (
                                          <DropdownItem
                                            value="master"
                                            id={`users.${index}.permission`}
                                            onClick={(e) => {
                                              formik.setFieldValue(
                                                `users.${index}.permission`,
                                                "master"
                                              );
                                            }}
                                            onBlur={formik.handleBlur}
                                          >
                                            {t("MASTER")}
                                          </DropdownItem>
                                        )}
                                      <DropdownItem
                                        value="editor"
                                        id={`users.${index}.permission`}
                                        onClick={(e) => {
                                          formik.setFieldValue(
                                            `users.${index}.permission`,
                                            "editor"
                                          );
                                        }}
                                        onBlur={formik.handleBlur}
                                      >
                                        {t("EDITOR")}
                                      </DropdownItem>
                                      <DropdownItem
                                        value="viewer"
                                        id={`users.${index}.permission`}
                                        onClick={(e) => {
                                          formik.setFieldValue(
                                            `users.${index}.permission`,
                                            "viewer"
                                          );
                                        }}
                                        onBlur={formik.handleBlur}
                                      >
                                        {t("VIEWER")}
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                  {formik.touched.users &&
                                    formik.touched.users[index] &&
                                    formik.touched.users[index].permission &&
                                    formik.errors.users &&
                                    formik.errors.users[index] &&
                                    formik.errors.users[index].permission && (
                                      <div className="invalid-feedback d-block mb-2">
                                        {formik.errors.users[index].permission}
                                      </div>
                                    )}
                                </li>
                              </ul>
                              {index > 0 && (
                                <div className="newUserRowDelete delete">
                                  <img
                                    src={trash}
                                    alt="trash"
                                    className="ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => arrayHelpers.remove(index)}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div>
                        <ul>
                          <li>
                            <b>{t("No User Added")}</b>
                          </li>
                        </ul>
                      </div>
                    )}
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
                      {t("ADD_NEW_USER")}
                    </button>
                    <div className="Experience-btn-modal flex justify-content-center">
                      <Button
                        className="btn btn btn-primary"
                        onClick={formik.handleSubmit}
                        disabled={!(formik.isValid && formik.dirty)}
                      >
                        {t("SEND_INVITATION")}
                      </Button>
                      <Button
                        className="btn btn-outline-secondary"
                        onClick={() => handleRemove()}
                      >
                        {t("CANCEL")}
                      </Button>
                    </div>
                  </>
                )}
              />
            </FormikProvider>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
