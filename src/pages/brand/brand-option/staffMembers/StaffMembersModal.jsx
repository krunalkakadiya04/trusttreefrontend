import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addStaffMember,
  updateStaffMember,
} from "../../../../middlewares/staffMembers";
import Select from "react-select";
import { getBranchesByBrandId } from "../../../../middlewares/branches";
import { getExperienceTypeByBrandId } from "../../../../middlewares/experienceType";
import { components } from "react-select";
import { resetForm } from "../../../../slices/staffMembers.slice";
import StaffImage from "./StaffImage";
import ToastService from "../../../../helpers/toast-services";
import { staffMemberSchema } from "../../../../helpers/yup.validation.schema";
import DropdownWithMultilanguage from "../../dropdown-multilanguage/DropdownWithMultilanguage";
import { useTranslation } from "react-i18next";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props} className="d-flex">
        <Form.Check
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label className="ms-2">{props.label}</label>
      </components.Option>
    </div>
  );
};

const StaffMembersModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const b_id = props.b_id;
  const [expSelected, isExpSelected] = useState();
  const [branchSelected, isBranchSelected] = useState(null);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [expData, setExpData] = useState([]);
  const { branches } = useSelector((state) => state.branch);
  const { experienceTypeData } = useSelector((state) => state.experience);
  const { languages } = useSelector((state) => state.staff);
  const {
    singleStaffMember,
    saveLoading,
    saveMessage,
    saveStaffLoading,
    saveStaffMessage,
  } = useSelector((state) => state.staff);

  useEffect(() => {
    if (b_id) {
      dispatch(getBranchesByBrandId(b_id));
      dispatch(getExperienceTypeByBrandId(b_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b_id]);

  useEffect(() => {
    if (props && props.languages && props.languages.length > 0) {
      const languageOptions = props.languages.map((l) => {
        return { ...l, isFormFilled: false };
      });
      setLanguageOptions(languageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.languages]);

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
    if (!saveStaffLoading) {
      if (saveStaffMessage) {
        ToastService.success(saveStaffMessage);
        props.setIsShow(!props.show);
        reset_Form();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveStaffMessage]);

  useEffect(() => {
    if (singleStaffMember !== null) {
      const newStaffMember =
        singleStaffMember &&
        singleStaffMember.branch_id &&
        singleStaffMember.branch_id.map((o) => {
          const newBranch =
            branches &&
            branches.find((obj) => {
              return obj._id === o;
            });
          return newBranch;
        });

      const newStaffMemberExp =
        singleStaffMember &&
        singleStaffMember.experience_type_id &&
        singleStaffMember.experience_type_id.map((o) => {
          const newExp =
            experienceTypeData &&
            experienceTypeData.find((obj) => {
              return obj._id === o;
            });
          return newExp;
        });
      formik.setValues({
        branches: newStaffMember,
        experience_type: newStaffMemberExp,
        name: singleStaffMember.name,
        language: "en",
      });
    } else {
      formik.setValues({
        name: {},
        language: "en",
        experience_type: null,
        branches: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleStaffMember]);

  useEffect(() => {
    if (branches && branches.length > 0) {
      const obj = { name: "All" };
      const branchesData = [...branches];
      branchesData.splice(0, 0, obj);
      setBranchData(branchesData);
    }

    if (experienceTypeData && experienceTypeData.length > 0) {
      const obj = { title: "All" };
      const experience_Type_Data = [...experienceTypeData];
      experience_Type_Data.splice(0, 0, obj);
      setExpData(experience_Type_Data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches, experienceTypeData]);

  const handleBranchChange = (select) => {
    if (select && select.length > 0) {
      const allOption = select.find((o) => o.name === "All");
      if (allOption) {
        isBranchSelected(branchData);
        formik.setFieldValue("branches", branchData);
      } else {
        isBranchSelected(select);
        formik.setFieldValue("branches", select);
      }
    } else {
      isBranchSelected(null);
      formik.setFieldValue("branches", null);
    }
  };

  const handleExpChange = (select) => {
    if (select && select.length > 0) {
      const allOption = select.find((o) => o.title === "All");
      if (allOption) {
        isExpSelected(expData);
        formik.setFieldValue("experience_type", expData);
      } else {
        isExpSelected(select);
        formik.setFieldValue("experience_type", select);
      }
    } else {
      isExpSelected(null);
      formik.setFieldValue("experience_type", null);
    }
  };

  const handleSubmit = (values) => {
    const allOptionforBranches = values.branches.find((o) => o.name === "All")
    const allOptionforExperience = values.experience_type.find((o) => o.title === "All")
    const branchesData = [...values.branches]
    const experienceData = [...values.experience_type]
    if (allOptionforBranches) {
      branchesData.splice(0, 1,)
    }
    if (allOptionforExperience) {
      experienceData.splice(0, 1,)
    }
    const branchId =
      branchesData &&
      branchesData.map((o) => {
        const newId =
          branches &&
          branches.find((obj) => {
            return obj._id === o._id;
          });
        return newId;
      });

    const branch_id =
      branchId &&
      branchId.map((s) => {
        return s._id;
      });

    const expId =
      experienceData &&
      experienceData.map((o) => {
        const newId =
          experienceTypeData &&
          experienceTypeData.find((obj) => {
            return obj._id === o._id;
          });
        return newId;
      });

    const experience_type_id =
      expId &&
      expId.map((s) => {
        return s._id;
      });

    const newValues = {
      name: values.name,
      branch_id: branch_id,
      experience_type_id: experience_type_id,
    };

    const formData = new FormData();
    if (values.profile_pic) {
      formData.append("file", values.profile_pic[0]);
    }
    formData.append("name", JSON.stringify(newValues.name));
    formData.append("branch_id", JSON.stringify(newValues.branch_id));
    formData.append(
      "experience_type_id",
      JSON.stringify(newValues.experience_type_id)
    );
    if (singleStaffMember !== null) {
      const staff_Id = singleStaffMember._id;
      dispatch(updateStaffMember(formData, staff_Id));
    } else {
      dispatch(addStaffMember(formData, b_id));
    }
  };

  const staffSchema = staffMemberSchema;

  const formik = useFormik({
    initialValues: {
      name: {},
      language: "",
      experience_type: null,
      branches: null,
    },
    validationSchema: staffSchema,
    onSubmit: handleSubmit,
  });

  const reset_Form = () => {
    formik.resetForm({
      values: {
        name: {},
        language: "en",
        experience_type: null,
        branches: null,
      },
    });
  };

  const handleClose = () => {
    props.setIsShow(!props.show);
    reset_Form();
    dispatch(resetForm());
  };

  const changeLan =
    props.languages &&
    props.languages.find((obj) => {
      return obj.key === formik.values.language;
    });

  useEffect(() => {
    const { language, name } = formik.values;
    if (language) {
      let isFormFilled = false;
      if (name && name[language]) {
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
    <Modal show={props.show} className="modal-lg">
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleStaffMember
            ? t("UPDATE_STAFF_MEMBER")
            : t("ADD_NEW_STAFF_MEMBER")}
        </Modal.Title>
        <div>
          <Button className="close_btn" onClick={() => handleClose()}>
            <FontAwesomeIcon icon={`xmark`} />
          </Button>
        </div>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <div className="flex">
            <div className="modalAddBranchLeft">
              <div className="bg-icon-option form-group exp-input">
                <label className="form-label" htmlFor="text">
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
                <Form.Label htmlFor="text">{t("MEMBER_NAME")}</Form.Label>
                <Form.Control
                  type="text"
                  className={`${formik.values.language &&
                    formik.touched.name &&
                    formik.touched.name[formik.values.language] &&
                    formik.errors.name &&
                    formik.errors.name[formik.values.language] &&
                    "is-invalid"
                    }`}
                  placeholder={t("INPUT_NAME_OF_STAFF_MEMBER")}
                  name={`name.${formik.values.language}`}
                  value={
                    formik.values.name[formik.values.language]
                      ? formik.values.name[formik.values.language]
                      : ""
                  }
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
              <div className="form-group exp-input">
                <Form.Label htmlFor="text">{t("BRANCH")}</Form.Label>
                <div className="customSelect ml-auto staticIcon select-Branchs">
                  <Select
                    className={`form-control ${formik.touched.branches &&
                      formik.errors.branches &&
                      "is-invalid"
                      }`}
                    classNamePrefix="react-select"
                    defaultValue={branchSelected}
                    onChange={(e) => handleBranchChange(e)}
                    options={branchData}
                    isMulti
                    components={{ Option }}
                    closeMenuOnSelect={false}
                    allowSelectAll={true}
                    hideSelectedOptions={false}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={formik.values.branches}
                    onBlur={() => formik.setFieldTouched("branches", true)}
                    styles={{
                      option: (base, state) => ({
                        ...base,
                        height: "100%",
                        padding: "15px 10px",
                        borderBottom: "1px solid rgba(169, 208, 246, 0.75)",
                        backgroundColor: state.isSelected
                          ? "transparent"
                          : "transparent",
                        color: state.isSelected ? "black" : "black",
                      }),
                      menu: (o) => { return { ...o, 'div:last-child>div': { borderBottom: 0 } } }
                    }}
                  />
                </div>
                {formik.touched.branches && formik.errors.branches && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.branches}
                  </div>
                )}
              </div>
              <div className="form-group exp-input">
                <Form.Label htmlFor="text">{t("EXPERIENCE_TYPE")}</Form.Label>
                <div className=" customSelect ml-auto staticIcon select-Branchs">
                  <Select
                    className={`form-control ${formik.touched.experience_type &&
                      formik.errors.experience_type &&
                      "is-invalid"
                      }`}
                    classNamePrefix="react-select"
                    defaultValue={expSelected}
                    onChange={(e) => handleExpChange(e)}
                    options={expData}
                    isMulti
                    components={{ Option }}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    allowSelectAll={true}
                    getOptionLabel={(option) => option.title}
                    getOptionValue={(option) => option._id}
                    value={formik.values.experience_type}
                    onBlur={() =>
                      formik.setFieldTouched("experience_type", true)
                    }
                    styles={{
                      option: (base, state) => ({
                        ...base,
                        height: "100%",
                        padding: "15px 10px",
                        borderBottom: "1px solid rgba(169, 208, 246, 0.75)",
                        backgroundColor: state.isSelected
                          ? "transparent"
                          : "transparent",
                        color: state.isSelected ? "black" : "black",
                      }),
                      menu: (o) => { return { ...o, 'div:last-child>div': { borderBottom: 0 } } }
                    }}
                  />
                </div>
                {formik.touched.experience_type &&
                  formik.errors.experience_type && (
                    <div className="invalid-feedback d-block">
                      {formik.errors.experience_type}
                    </div>
                  )}
              </div>
            </div>
            <div className="modalAddBranchRight">
              <label className="form-label">
                {t("UPLOAD_PERSONAL_PICTURE")}
              </label>
              <StaffImage
                setFieldValue={formik.setFieldValue}
                singleStaffMember={singleStaffMember}
              />
              {formik.touched.profile_pic && formik.errors.profile_pic && (
                <div className="invalid-feedback d-block">
                  {formik.errors.profile_pic}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
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
      </Form>
    </Modal>
  );
};

export default StaffMembersModal;
