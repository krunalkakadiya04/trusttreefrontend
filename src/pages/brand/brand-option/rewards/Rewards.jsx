import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import RewardsModal from "./RewardsModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import TermsAndConditionModal from "./TermsAndConditionModal";
import { useDispatch, useSelector } from "react-redux";
import { getExperienceTypeByBrandId } from "../../../../middlewares/experienceType";
import { addRewards, getRewards } from "../../../../middlewares/rewards";
import ToastService from "../../../../helpers/toast-services";
import close from "../../../../assets/images/closebtn.svg";
import right from "../../../../assets/images/rightbtn.svg";
import {
  validity,
  valid_from,
} from "../../../../helpers/yup.validation.schema";
import { reset_form } from "../../../../slices/rewards.slice";
import { useTranslation } from "react-i18next";
import expImg from "../../../../assets/images/exp-img.png";
import downArrow from '../../../../assets/images/downArrow.svg'
import { valid_from_data } from "../../../../helpers/jsonData";

const Rewards = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguage, setIsLanguage] = useState([]);
  const [expId, setExpId] = useState("");
  const { experienceTypeData } = useSelector((state) => state.experience);
  const { rewards, saveLoading, saveMessage, languages } = useSelector(
    (state) => state.rewards
  );
  const { AllLanguages } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getExperienceTypeByBrandId(props.selectBrand));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (languages && languages.languages && languages.languages !== null) {
      const selected_languages =
        languages.languages &&
        languages.languages.length > 0 &&
        languages.languages.map((o) => {
          const newId =
            AllLanguages &&
            AllLanguages.find((obj) => {
              return obj.key === o;
            });
          return newId;
        });
      setIsLanguage(selected_languages);
    } else {
      setIsLanguage([{ key: "en", value: "English" }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages]);

  useEffect(() => {
    if (experienceTypeData && experienceTypeData.length > 0) {
      setExpId(experienceTypeData[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceTypeData])

  useEffect(() => {
    if (!saveLoading) {
      if (saveMessage) {
        ToastService.success(saveMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  const handleSubmit = (values) => {
    const brand_id = props.selectBrand;
    const exp_id = values.exp_id;
    const payload = {
      reward: {
        title: values.title,
        is_reward_on: values.is_reward_on,
        validity: parseInt(values.validity),
        valid_from: values.valid_from,
        terms_and_condition: values.terms_and_condition,
      },
    };
    dispatch(addRewards(payload, brand_id, exp_id));
  };

  const socialMediaSchema = Yup.object().shape({
    valid_from: valid_from,
    validity: validity,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      terms_and_condition: "",
      is_reward_on: false,
      validity: "",
      valid_from: "",
      launguages: "",
    },
    validationSchema: socialMediaSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const brand_id = props.selectBrand;
    const exp_id = expId;

    if (brand_id && exp_id) {
      dispatch(getRewards(brand_id, exp_id));
    }

    if (!expId) {
      dispatch(reset_form());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expId, saveMessage, props.selectBrand, experienceTypeData]);

  useEffect(() => {
    if (rewards) {
      formik.setValues({
        title: rewards.title,
        is_reward_on: rewards.is_reward_on,
        validity: rewards.validity,
        valid_from: rewards.valid_from,
        terms_and_condition: rewards.terms_and_condition,
        exp_id: expId,
      });
    } else {
      formik.setValues({
        title: "",
        is_reward_on: false,
        validity: "",
        valid_from: "",
        terms_and_condition: "",
        exp_id: expId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewards]);

  const handleChange = (e, name) => {
    if (name === "exp_id") {
      setExpId(e);
    } else {
      formik.setFieldValue(name, e)
    }
  }

  const valid_from_label = valid_from_data && valid_from_data.find((obj) => {
    return obj.value === formik.values.valid_from;
  })

  const exp_id_label = experienceTypeData && experienceTypeData.find((obj) => {
    return obj._id === expId;
  })

  return (
    <div>
      {experienceTypeData &&
        experienceTypeData.length > 0 ?
        (
          <Form className="ratings-form">
            <Dropdown className='ellipsis'>
              <Dropdown.Toggle
                className="form-control"
              >
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  {exp_id_label &&
                    <span className='dropdown-value'>{t(exp_id_label.title)}</span>
                  }
                  <span>
                    <img src={downArrow} alt="downArrow" />
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={'span'} disabled>{t("SELECT_EXPERIENCE_TYPE")}</Dropdown.Item>
                {experienceTypeData && experienceTypeData.map((o, i) => (
                  <Dropdown.Item as={'span'} value={o._id} key={i}
                    onClick={() => handleChange(o._id, "exp_id")}>{o.title}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {formik.values.exp_id && (
              <>
                <div className="form-control mb-3 mt-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={t("REWARDS_CHECK_LABEL")}
                    name="is_reward_on"
                    onChange={formik.handleChange}
                    value={formik.values.is_reward_on}
                    checked={formik.values.is_reward_on}
                  />
                </div>
                {formik.values.exp_id && formik.values.is_reward_on && (
                  <>
                    <div className="d-flex">
                      <div
                        className="input-box-profile form-control me-3 justify-content-between d-flex"
                        onClick={() => setIsEditMode(true)}
                      >
                        <span>{t("THE_REWARD")}</span>
                        {formik.values.title ? (
                          <img src={right} alt="right" />
                        ) : (
                          <img src={close} alt="close" />
                        )}
                      </div>
                      <div
                        className="input-box-profile form-control justify-content-between d-flex"
                        onClick={() => setIsOpen(true)}
                      >
                        <span>{t("TERMS_AND_CONDITION")}</span>
                        {formik.values.terms_and_condition &&
                          formik.values.terms_and_condition[0] &&
                          formik.values.terms_and_condition[0] &&
                          Object.keys(formik.values.terms_and_condition[0]).length !==
                          0 ? (
                          <img src={right} alt="right" />
                        ) : (
                          <img src={close} alt="close" />
                        )}
                      </div>
                    </div>
                    <div className="d-flex mt-3">
                      <div className="w-100 me-3">
                        <Form.Label>{t("VALID_FROM")}</Form.Label>
                        <Dropdown className='ellipsis'>
                          <Dropdown.Toggle
                            name="valid_from"
                            onBlur={formik.handleBlur}
                            className={`form-control ${formik.touched.valid_from &&
                              formik.errors.valid_from &&
                              "is-invalid"
                              }`}
                          >
                            <div className='d-flex justify-content-between w-100 align-items-center'>
                              <span className='dropdown-value'>{t(valid_from_label.label)}</span>
                              <span>
                                <img src={downArrow} alt="downArrow" />
                              </span>
                            </div>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {valid_from_data && valid_from_data.map((o, i) => (
                              <Dropdown.Item as={'span'} value={o.value} key={i}
                                onClick={() => handleChange(o.value, "valid_from")}>{t(o.label)}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        {formik.touched.valid_from && formik.errors.valid_from && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.valid_from}
                          </div>
                        )}
                      </div>
                      <div className="w-100">
                        <Form.Label>{t("VALIDATY")}</Form.Label>
                        <Form.Control
                          type="number"
                          className={`${formik.touched.validity &&
                            formik.errors.validity &&
                            "is-invalid"
                            }`}
                          placeholder={t("INPUT_THE_VALIDITY")}
                          name="validity"
                          value={formik.values.validity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          min="1"
                        />
                        {formik.touched.validity && formik.errors.validity && (
                          <div className="invalid-feedback d-block">
                            {formik.errors.validity}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="social-buuton">
                  <Button
                    className="btn btn-primary"
                    onClick={formik.handleSubmit}
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    {t("SAVE_CHANGES")}
                  </Button>
                </div>
                {isEditMode && (
                  <RewardsModal
                    setFieldValue={formik.setFieldValue}
                    show={isEditMode}
                    setIsShow={(flag) => setIsEditMode(flag)}
                    title={formik.values.title}
                    languages={isLanguage}
                  />
                )}
                {isOpen && (
                  <TermsAndConditionModal
                    setFieldValue={formik.setFieldValue}
                    show={isOpen}
                    setIsShow={(flag) => setIsOpen(flag)}
                    termsAndCondition={formik.values.terms_and_condition}
                    languages={isLanguage}
                  />
                )}
              </>
            )}
          </Form>
        )
        : <div className="experience-wpr flex">
          <div className="experience-inner">
            <img src={expImg} alt="loadding" />
            <p>{t("THERE_IS_NO_EXPERIENECE_TYPE_YET")}</p>
            <div className="exper-btn">
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Rewards;
