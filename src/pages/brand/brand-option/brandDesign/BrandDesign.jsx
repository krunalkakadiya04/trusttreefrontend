import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  FormCheck,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addDesign,
  getDesign,
  getIncomplateLanguage,
} from "../../../../middlewares/brandDesign";
import EditButtonText from "./EditButtonText";
import ToastService from "../../../../helpers/toast-services";
import { currency, languages } from "../../../../helpers/yup.validation.schema";
import DefalutLanguageConformation from "./DefalutLanguageConformation";
import { useTranslation } from "react-i18next";
import downArrow from "../../../../assets/images/downArrow.svg";
import MissingLanguageModal from "./MissingLanguageModal";
import {
  setProductButton,
  setServiceButton,
  setSurveyButton,
} from "../../../../slices/feedbacks";
import {
  setButtonColor,
  setButtonTextColor,
} from "../../../../slices/feedbacks";

const BrandDesign = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [defalutLanguage, setDefalutLanguage] = useState(false);
  const [missingLanguage, setMissingLanguage] = useState(false);
  const [isLanguage, setIsLanguage] = useState([]);
  const [completeLanArray, setCompleteLanArray] = useState([]);
  const [remainingLanguage, setRemainingLanguage] = useState([]);
  const [missinglangObj, setMissinglangObj] = useState([]);
  const [selectedLan, setSelectedLan] = useState();
  const [isColor, setIsColor] = useState("");
  const [bgColorButton, setBGColorButton] = useState("#FF0000");
  const [textColorButton, setTextColorButton] = useState("rgb(99,99,100)");
  const [bgColorLogo, setBGColorLogo] = useState("#FF0000");
  const [textColorLogo, setTextColorLogo] = useState("rgb(99,99,100)");
  const [bgColorText, setBGColorText] = useState("#FF0000");
  const [textColorText, setTextColorText] = useState("rgb(99,99,100)");
  const { brandsDesign, saveLoading, saveMessage, missingLanguages } =
    useSelector((state) => state.design);
  const { AllLanguages, AllCurrency } = useSelector((state) => state.brand);

  useEffect(() => {
    const select_id = props.selectBrand;
    if (props.selectBrand) {
      dispatch(getDesign(select_id));
      dispatch(getIncomplateLanguage(select_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage, props.selectBrand]);

  useEffect(() => {
    if (!saveLoading && saveMessage) {
      ToastService.success(saveMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage]);

  useEffect(() => {
    if (brandsDesign && brandsDesign !== "") {
      setBGColorButton(brandsDesign.button_colour);
      setBGColorLogo(brandsDesign.logo_background_colour || "#ffffff");
      setBGColorText(brandsDesign.button_text_colour);
      formik.setValues({
        show_logo: brandsDesign.show_logo,
        default_language: brandsDesign.default_language,
        currency: brandsDesign.currency,
        languages: brandsDesign.languages,
        button_colour: brandsDesign.button_colour,
        button_text_colour: brandsDesign.button_text_colour,
        logo_background_colour:
          brandsDesign.logo_background_colour || "#ffffff",
        edit_button_text_survey_button:
          brandsDesign.edit_button_text_survey_button,
        edit_button_text_products_list:
          brandsDesign.edit_button_text_products_list,
        edit_button_text_services_list:
          brandsDesign.edit_button_text_services_list,
        edit_button_text_staff_name: brandsDesign.edit_button_text_staff_name,
      });
      dispatch(setSurveyButton(brandsDesign.edit_button_text_survey_button));
      dispatch(setProductButton(brandsDesign.edit_button_text_products_list));
      dispatch(setServiceButton(brandsDesign.edit_button_text_services_list));

      dispatch(setButtonColor(brandsDesign.button_colour));
      dispatch(setButtonTextColor(brandsDesign.button_text_colour));
    } else {
      setBGColorButton("FF0000");
      setBGColorLogo("ffffff");
      setBGColorText("ffffff");
      formik.setValues({
        show_logo: false,
        languages: ["en"],
        default_language: "en",
        currency: "",
        button_colour: "#ED1C24",
        button_text_colour: "#ffffff",
        logo_background_colour: "#ffffff",
        edit_button_text_survey_button: "",
        edit_button_text_products_list: "",
        edit_button_text_services_list: "",
        edit_button_text_staff_name: "",
      });
      dispatch(setSurveyButton("Survey Button"));
      dispatch(setProductButton("Product Button"));
      dispatch(setServiceButton("Service Button"));
      dispatch(setButtonColor("#ED1C24"));
      dispatch(setButtonTextColor("#ffffff"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsDesign]);

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  useEffect(() => {
    if (isColor === "button_colour") {
      let { r, g, b } = hexToRgb(bgColorButton);
      let targetColor = `rgb(${r},${g},${b})`;
      let colors = targetColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      let brightness = 1;
      let R = colors[1];
      let G = colors[2];
      let B = colors[3];
      let ir = Math.floor((255 - R) * brightness);
      let ig = Math.floor((255 - G) * brightness);
      let ib = Math.floor((255 - B) * brightness);
      setTextColorButton(`rgb(${ir}, ${ig}, ${ib})`);
    } else if (isColor === "logo_background_colour") {
      let { r, g, b } = hexToRgb(bgColorLogo);
      let targetColor = `rgb(${r},${g},${b})`;
      let colors = targetColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      let brightness = 1;

      let R = colors[1];
      let G = colors[2];
      let B = colors[3];

      let ir = Math.floor((255 - R) * brightness);
      let ig = Math.floor((255 - G) * brightness);
      let ib = Math.floor((255 - B) * brightness);
      setTextColorLogo(`rgb(${ir}, ${ig}, ${ib})`);
    } else {
      let { r, g, b } = hexToRgb(bgColorText);
      let targetColor = `rgb(${r},${g},${b})`;
      let colors = targetColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      let brightness = 1;

      let R = colors[1];
      let G = colors[2];
      let B = colors[3];

      let ir = Math.floor((255 - R) * brightness);
      let ig = Math.floor((255 - G) * brightness);
      let ib = Math.floor((255 - B) * brightness);
      setTextColorText(`rgb(${ir}, ${ig}, ${ib})`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColorButton, bgColorLogo, bgColorText]);

  const handleBgChange = (e, title) => {
    if (title === "button_colour") {
      setBGColorButton(e.target.value);
      setIsColor("button_colour");
      formik.setFieldValue("button_colour", e.target.value);
      dispatch(setButtonColor(e.target.value));
    } else if (title === "logo_background_colour") {
      setBGColorLogo(e.target.value);
      setIsColor("logo_background_colour");
      formik.setFieldValue("logo_background_colour", e.target.value);
    } else {
      setBGColorText(e.target.value);
      setIsColor("button_text_colour");
      formik.setFieldValue("button_text_colour", e.target.value);
      dispatch(setButtonTextColor(e.target.value));
    }
  };

  const handleSubmit = (values) => {
    const b_id = props.selectBrand;
    const payload = {
      design: {
        show_logo: values.show_logo,
        default_language: values.default_language,
        currency: values.currency,
        languages: values.languages,
        button_colour: values.button_colour,
        button_text_colour: values.button_text_colour,
        logo_background_colour: values.logo_background_colour,
        edit_button_text_survey_button: values.edit_button_text_survey_button,
        edit_button_text_products_list: values.edit_button_text_products_list,
        edit_button_text_services_list: values.edit_button_text_services_list,
        edit_button_text_staff_name: values.edit_button_text_staff_name,
      },
    };
    dispatch(addDesign(payload, b_id));
  };

  const brandDesignSchema = Yup.object().shape({
    currency: currency,
    languages: languages,
  });

  const formik = useFormik({
    initialValues: {
      show_logo: false,
      languages: [],
      default_language: "",
      currency: "",
      button_colour: "#ED1C24",
      button_text_colour: "#ffffff",
      logo_background_colour: "#ffffff",
      edit_button_text_survey_button: "",
      edit_button_text_products_list: "",
      edit_button_text_services_list: "",
      edit_button_text_staff_name: "",
    },
    validationSchema: brandDesignSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (formik.values.languages && formik.values.languages.length > 0) {
      const selected_languages =
        formik.values.languages &&
        formik.values.languages.map((o) => {
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

    if (missingLanguages && missingLanguages !== null) {
      const data = missingLanguages.complete_language;
      const newData = data.filter(
        (item, index) => data.indexOf(item) === index
      );
      setCompleteLanArray(newData);
    } else {
      setCompleteLanArray(["en"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.languages, missingLanguages]);

  const handleLanChange = (e) => {
    setDefalutLanguage(true);
    setSelectedLan(e.target.value);
  };

  const handleIncompleteLanguageModal = (e) => {
    const missingLanguageObj = missingLanguages?.question?.filter((o) =>
      o.missing_language.includes(e.key)
    );
    if (missingLanguageObj && missingLanguageObj.length > 0) {
      setMissinglangObj(missingLanguageObj);
      setRemainingLanguage(e);
      setMissingLanguage(true);
    }
  };

  const handleChange = (e) => {
    formik.setFieldValue("currency", e);
  };

  const currency_label =
    AllCurrency &&
    AllCurrency.find((obj) => {
      return obj.code === formik.values.currency;
    });

  return (
    <>
      <div className="Brand-languages experience-wpr-content">
        <div className="container">
          <Form>
            <div className="col-md-6 multipul-languages">
              <Dropdown
                autoClose={"outside"}
                className="ellipsis"
                id="dropdown-basic"
              >
                <Dropdown.Toggle variant="success" className="form-control">
                  <span className="dropdown-badge me-2">
                    {isLanguage && isLanguage.length > 0
                      ? Object.keys(isLanguage).length
                      : "0"}
                  </span>
                  {isLanguage && isLanguage.length > 0 ? (
                    <div className="d-flex overflow-hidden multi">
                      {isLanguage.map((o, i) => (
                        <div key={i}>
                          <span className="dropdown-value">
                            {(i ? ", " : "") + t(o.value)}
                          </span>
                          <span className="dropdown-defalut">
                            {o.key === formik.values.default_language &&
                              `-${t("DEFAULT")}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="dropdown-value">
                      {t("SELECT_LANGUAGE")}
                    </span>
                  )}
                  <span className="d-Arrow">
                    <img src={downArrow} alt="downArrow" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu id="dropdown-menu">
                  {AllLanguages &&
                    AllLanguages.map((o, index) => (
                      <Dropdown.Item as={"span"} key={index}>
                        <div className="radio-and-check d-flex">
                          <div className="d-flex align-items-center">
                            <FormCheck.Input
                              name="languages"
                              type="checkbox"
                              value={o.key}
                              onChange={formik.handleChange}
                              checked={
                                formik.values.languages &&
                                formik.values.languages.includes(o.key)
                              }
                              onBlur={formik.handleBlur}
                            />
                            <FormCheck.Label className="ps-1">
                              {t(o.value)}
                            </FormCheck.Label>
                          </div>
                          <div className="d-flex align-items-center">
                            {o.key === formik.values.default_language ? (
                              <span className="radio-defalut">
                                {t("DEFAULT")}
                              </span>
                            ) : (
                              <>
                                {completeLanArray.includes(o.key) ? (
                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                      <Tooltip className="mytooltip2">
                                        <li>{t("SURVEY_APPEAR")}</li>
                                      </Tooltip>
                                    }
                                  >
                                    <span
                                      className={
                                        formik.values.languages.find(
                                          (obj) => obj === o.key
                                        )
                                          ? "radio-defalut completeSpan"
                                          : "disable-span"
                                      }
                                    >
                                      {t("COMPLETE")}
                                    </span>
                                  </OverlayTrigger>
                                ) : (
                                  <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                      <Tooltip className="mytooltip">
                                        <li>{t("SURVEY_CAN_T_APPEAR")}</li>
                                      </Tooltip>
                                    }
                                  >
                                    <span
                                      className={
                                        formik.values.languages.find(
                                          (obj) => obj === o.key
                                        )
                                          ? "radio-defalut inCompleteSpan"
                                          : "disable-span"
                                      }
                                      onClick={() =>
                                        handleIncompleteLanguageModal(o)
                                      }
                                    >
                                      {t("INCOMPLETE")}
                                    </span>
                                  </OverlayTrigger>
                                )}
                              </>
                            )}
                            <Form.Check
                              disabled={
                                formik.values.languages.find(
                                  (obj) => obj === o.key
                                ) && completeLanArray.includes(o.key)
                                  ? false
                                  : true
                              }
                              type="radio"
                              name="default_language"
                              value={o.key}
                              onChange={(e) => handleLanChange(e)}
                              checked={o.key === formik.values.default_language}
                            />
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
              {formik.touched.languages && formik.errors.languages && (
                <div className="invalid-feedback d-block">
                  {formik.errors.languages}
                </div>
              )}
              <div className="Brand-currency Valid-from">
                <Form.Label htmlFor="text" id="brandCurrency">
                  {t("BRAND_CURRENCY")}
                </Form.Label>
                <Dropdown className="ellipsis" id="dropdown-basic">
                  <Dropdown.Toggle
                    className={`form-control ${
                      formik.touched.currency &&
                      formik.errors.currency &&
                      "is-invalid"
                    }`}
                    name="currency"
                    onBlur={formik.handleBlur}
                  >
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        {currency_label && currency_label.code !== "" ? (
                          <>
                            <span className="dropdown-value">
                              {currency_label.code}
                            </span>
                            <span className="dropdown-defalut">
                              - {currency_label.currency}
                            </span>
                          </>
                        ) : (
                          <span className="dropdown-value">
                            {t("SELECT_CURRENCY")}
                          </span>
                        )}
                      </div>
                      <span>
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={"span"} disabled>
                      {t("SELECT_CURRENCY")}
                    </Dropdown.Item>
                    {AllCurrency &&
                      AllCurrency.map((o, i) => (
                        <Dropdown.Item
                          as={"span"}
                          value={o.code}
                          key={i}
                          onClick={() => handleChange(o.code)}
                        >
                          <span className="dropdown-value">{o.code}</span>
                          <span className="dropdown-defalut">
                            - {o.currency}
                          </span>
                          {/* {o.currency} - {o.code} */}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
                {formik.touched.currency && formik.errors.currency && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.currency}
                  </div>
                )}
              </div>
            </div>
            <div className="form-control mt-3">
              <Form.Check
                type="switch"
                id="custom-switch"
                label={t("SHOW_THE_BRAND_LOGO")}
                name="show_logo"
                onChange={formik.handleChange}
                value={formik.values.show_logo}
                checked={formik.values.show_logo}
              />
            </div>
            <div className="lg-Customer">
              <div className="container">
                <div className="row">
                  <div className="col-md-6  col-sm-12">
                    <div className="button-color">
                      <Form.Control
                        type="color"
                        className={`red-btn-color p-0 color-text-picker ${
                          formik.values.button_colour === "#ffffff" && "c_black"
                        }`}
                        name="button_colour"
                        style={{ color: `${textColorButton}` }}
                        onChange={(e) => handleBgChange(e, "button_colour")}
                        value={formik.values.button_colour}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="button-color">
                      <Form.Control
                        type="color"
                        className={`red-btn-color p-0 color-logo-background-picker 
                        ${
                          formik.values.logo_background_colour === "#ffffff" &&
                          "c_black"
                        }`}
                        name="logo_background_colour"
                        style={{ color: `${textColorLogo}` }}
                        onChange={(e) =>
                          handleBgChange(e, "logo_background_colour")
                        }
                        value={formik.values.logo_background_colour}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6  col-sm-12">
                    <div className="button-color">
                      <Form.Control
                        type="color"
                        className={`red-btn-color p-0 color-text-picker-white ${
                          formik.values.button_text_colour === "#000000" &&
                          "c_white"
                        }`}
                        name="button_text_colour"
                        style={{ color: `${textColorText}` }}
                        onChange={(e) =>
                          handleBgChange(e, "button_text_colour")
                        }
                        value={formik.values.button_text_colour}
                      />
                    </div>
                  </div>
                  <div className="col-md-6  col-sm-12">
                    <div className="button-color">
                      <Button
                        className="btn color-btn  Edit-Buttons-Text"
                        onClick={() => setIsEditMode(true)}
                        disabled={
                          formik.values.languages &&
                          formik.values.languages.length > 0
                            ? false
                            : true
                        }
                      >
                        {t("EDIT_BUTTON_TEXT")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="social-buuton">
              <button
                type="button"
                className="btn btn-primary"
                onClick={formik.handleSubmit}
                disabled={!(formik.isValid && formik.dirty)}
              >
                {t("SAVE_CHANGES")}
              </button>
            </div>
            {isEditMode && (
              <EditButtonText
                show={isEditMode}
                setIsShow={(flag) => setIsEditMode(flag)}
                languages={isLanguage}
                setFieldValue={formik.setFieldValue}
                brandsDesign={brandsDesign}
                default_language={formik.values.default_language}
              />
            )}
            {defalutLanguage && (
              <DefalutLanguageConformation
                show={defalutLanguage}
                setIsShow={(flag) => setDefalutLanguage(flag)}
                selectedLan={selectedLan}
                setFieldValue={formik.setFieldValue}
                default_language={formik.values.default_language}
              />
            )}
            {missingLanguage && (
              <MissingLanguageModal
                show={missingLanguage}
                setIsShow={(flag) => setMissingLanguage(flag)}
                languageObj={missinglangObj}
                remainingLanguage={remainingLanguage}
              />
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default BrandDesign;
