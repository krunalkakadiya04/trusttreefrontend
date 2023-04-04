import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { components } from "react-select";
import { getBranchesByBrandId } from "../../../../middlewares/branches";
import { getExperienceTypeByBrandId } from "../../../../middlewares/experienceType";
import {
  addProductToCategory,
  getCategoryDropdown,
  updateProducts,
} from "../../../../middlewares/productCatalogue";
import BrandImage from "../../BrandImage";
import DropdownWithMultilanguage from "../../dropdown-multilanguage/DropdownWithMultilanguage";
import ErrorList from "../../../../components/error-list/ErrorList";
import ToastService from "../../../../helpers/toast-services";
import { resetFormUpdate } from "../../../../slices/productCatalogue.slice";
import { productSchema } from "../../../../helpers/yup.validation.schema";
import downArrow from '../../../../assets/images/downArrow.svg'

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

const ProductsAddModal = (props) => {
  const { t } = useTranslation();
  const b_id = props.selectBrand;
  const cat_id = props.categoryId;
  const dispatch = useDispatch();
  const [languageOptions, setLanguageOptions] = useState([]);
  const [branchSelected, isBranchSelected] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const [expData, setExpData] = useState([]);
  const [expSelected, isExpSelected] = useState();
  const {
    languages,
    productSaveLoading,
    productSaveMessage,
    productSaveError,
    singleProduct,
    productSaveUpdateLoading,
    productSaveUpdateMessage,
    productSaveUpdateError,
    dropDownCatalogue,
  } = useSelector((state) => state.product);
  const { branches } = useSelector((state) => state.branch);
  const { experienceTypeData } = useSelector((state) => state.experience);

  useEffect(() => {
    if (b_id) {
      dispatch(getBranchesByBrandId(b_id));
      dispatch(getExperienceTypeByBrandId(b_id));
      dispatch(getCategoryDropdown(b_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b_id]);

  useEffect(() => {
    if (!productSaveLoading && productSaveMessage) {
      ToastService.success(productSaveMessage);
      props.setIsShow(!props.show);
      dispatch(resetFormUpdate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSaveMessage]);

  useEffect(() => {
    if (!productSaveUpdateLoading && productSaveUpdateMessage) {
      ToastService.success(productSaveUpdateMessage);
      props.setIsShow(!props.show);
      dispatch(resetFormUpdate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSaveUpdateMessage]);

  useEffect(() => {
    if (props && props.languages && props.languages.length > 0) {
      const newLanguageOptions = props.languages.map((l) => {
        return { ...l, isFormFilled: false };
      });
      setLanguageOptions(newLanguageOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.languages]);

  useEffect(() => {
    if (singleProduct !== null) {
      const newBranches =
        singleProduct &&
        singleProduct.branch_id &&
        singleProduct.branch_id.map((o) => {
          const newBranch =
            branches &&
            branches.find((obj) => {
              return obj._id === o;
            });
          return newBranch;
        });

      const newExperienceType =
        singleProduct &&
        singleProduct.experience_type_id &&
        singleProduct.experience_type_id.map((o) => {
          const newExp =
            experienceTypeData &&
            experienceTypeData.find((obj) => {
              return obj._id === o;
            });
          return newExp;
        });
      formik.setValues({
        branch_id: newBranches,
        experience_type_id: newExperienceType,
        name: singleProduct.name,
        language: "en",
        description: singleProduct.description,
        price: singleProduct.price,
        for_sale: singleProduct.for_sale,
        category_id: singleProduct.product_catalogue_id,
      });
    } else {
      formik.setValues({
        language: "en",
        name: {},
        description: "",
        branch_id: null,
        experience_type_id: null,
        price: "",
        for_sale: false,
        brand_id: "",
        logo: "",
        category_id: cat_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProduct, branches, experienceTypeData]);

  useEffect(() => {
    if (branches && branches.length > 0) {
      const obj = { name: "All" }
      const branchesData = [...branches]
      branchesData.splice(0, 0, obj);
      setBranchData(branchesData)
    }

    if (experienceTypeData && experienceTypeData.length > 0) {
      const obj = { title: "All" }
      const experience_Type_Data = [...experienceTypeData]
      experience_Type_Data.splice(0, 0, obj)
      setExpData(experience_Type_Data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches, experienceTypeData])

  const handleClose = () => {
    props.setIsShow(!props.show);
    dispatch(resetFormUpdate());
    formik.resetForm();
  };

  const handleBranchChange = (select) => {
    if (select && select.length > 0) {
      const allOption = select.find((o) => o.name === "All")
      if (allOption) {
        isBranchSelected(branchData);
        formik.setFieldValue("branch_id", branchData);
      } else {
        isBranchSelected(select);
        formik.setFieldValue("branch_id", select);
      }
    } else {
      isBranchSelected(null);
      formik.setFieldValue("branch_id", null);
    }
  };

  const handleExpChange = (select) => {
    if (select && select.length > 0) {
      const allOption = select.find((o) => o.title === "All")
      if (allOption) {
        isExpSelected(expData);
        formik.setFieldValue("experience_type_id", expData);
      } else {
        isExpSelected(select);
        formik.setFieldValue("experience_type_id", select);
      }
    } else {
      isExpSelected(null);
      formik.setFieldValue("experience_type_id", null);
    }
  };

  const handleSubmit = (values) => {
    const allOptionforBranches = values.branch_id.find((o) => o.name === "All")
    const allOptionforExperience = values.experience_type_id.find((o) => o.title === "All")
    const branchesData = [...values.branch_id]
    const experienceData = [...values.experience_type_id]
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

    const formData = new FormData();
    if (values.logo) {
      formData.append("file", values.logo[0]);
    }
    formData.append("name", JSON.stringify(values.name));
    formData.append("description", JSON.stringify(values.description));
    formData.append("brand_id", b_id);
    formData.append("price", values.price);
    formData.append("for_sale", values.for_sale);
    formData.append("branch_id", JSON.stringify(branch_id));
    formData.append("experience_type_id", JSON.stringify(experience_type_id));
    if (singleProduct !== null) {
      const selectId = singleProduct._id;
      formData.append("product_catalogue_id", values.category_id);
      dispatch(
        updateProducts(formData, selectId, singleProduct.product_catalogue_id)
      );
    } else {
      dispatch(addProductToCategory(formData, values.category_id));
    }
  };

  const productModalSchema = productSchema;

  const formik = useFormik({
    initialValues: {
      language: "",
      name: {},
      description: "",
      branch_id: null,
      experience_type_id: null,
      price: "",
      for_sale: false,
      brand_id: "",
      logo: "",
      category_id: cat_id,
    },
    validationSchema: productModalSchema,
    onSubmit: handleSubmit,
  });

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

  const handleChange = (e) => {
    formik.setFieldValue("category_id", e)
  }

  const category_id_label = dropDownCatalogue && dropDownCatalogue.find((obj) => {
    return obj._id === formik.values.category_id;
  })

  return (
    <Modal show={props.show} size="lg">
      {productSaveError && <ErrorList error={productSaveError} />}
      {productSaveUpdateError && <ErrorList error={productSaveUpdateError} />}
      <Modal.Header>
        <Modal.Title className="cust-title">
          {singleProduct ? t("UPDATE_PRODUCT") : t("ADD_NEW_PRODUCT")}
        </Modal.Title>
        <div>
          <Button className="close_btn">
            <FontAwesomeIcon icon={`xmark`} onClick={() => handleClose()} />
          </Button>
        </div>
      </Modal.Header>
      <Form>
        <Modal.Body className="exp-modal-body">
          <div className="flex">
            <div className="modalAddBranchLeft">
              <div className="bg-icon-option form-group">
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
              <div className="form-group">
                <Form.Label htmlFor="text">{t("PRODUCT_NAME")}</Form.Label>
                <Form.Control
                  type="text"
                  className={`${formik.values.language &&
                    formik.touched.name &&
                    formik.touched.name[formik.values.language] &&
                    formik.errors.name &&
                    formik.errors.name[formik.values.language] &&
                    "is-invalid"
                    }`}
                  placeholder={t("INPUT_PRODUCT_NAME")}
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
              <div className="form-group">
                <Form.Label>
                  {t("DESCRIPTION")} ({t("OPTIONAL")})
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t("INPUT_PRODUCT_DESCRIPTION")}
                  name={`description.${formik.values.language}`}
                  value={
                    formik.values.description[formik.values.language]
                      ? formik.values.description[formik.values.language]
                      : ""
                  }
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <Form.Label htmlFor="text">{t("CATEGORY")}</Form.Label>
                <Dropdown className='ellipsis'>
                  <Dropdown.Toggle
                    name="category_id"
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.category_id &&
                      formik.errors.category_id &&
                      "is-invalid"
                      }`}
                  >
                    <div className='d-flex justify-content-between w-100 align-items-center'>
                      <span className='dropdown-value'>
                        {category_id_label?.title[t("language")]
                          ? category_id_label?.title[t("language")]
                          : category_id_label?.title[t("en")]}
                      </span>
                      <span>
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={'span'} disabled>{t("SELECT_CATEGORY")}</Dropdown.Item>
                    {dropDownCatalogue && dropDownCatalogue.map((o, i) => (
                      <Dropdown.Item as={'span'} value={o._id} key={i}
                        onClick={() => handleChange(o._id)}>
                        {o?.title[t("language")]
                          ? o?.title[t("language")]
                          : o?.title[t("en")]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {formik.touched.category_id && formik.errors.category_id && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.category_id}
                  </div>
                )}
              </div>
              <div className="form-group">
                <Form.Label htmlFor="text">{t("PRICE")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("INPUT_PRODUCT_PRICE")}
                  className={`${formik.touched.price && formik.errors.price && "is-invalid"
                    }`}
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.values.for_sale === true}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.price}
                  </div>
                )}
              </div>
              <div className="form-group">
                <Form.Label htmlFor="text">{t("BRANCH")}</Form.Label>
                <div className="customSelect ml-auto staticIcon select-Branchs">
                  <Select
                    className={`form-control ${formik.touched.branch_id &&
                      formik.errors.branch_id &&
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
                    value={formik.values.branch_id}
                    onBlur={() => formik.setFieldTouched("branch_id", true)}
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
                  {formik.touched.branch_id && formik.errors.branch_id && (
                    <div className="invalid-feedback d-block position-absolute">
                      {formik.errors.branch_id}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modalAddBranchRight">
              <div>
                <label className="form-label">
                  {t("UPLOAD_PERSONAL_PICTURE")}
                </label>
                <BrandImage
                  setFieldValue={formik.setFieldValue}
                  singleBrand={singleProduct}
                />
                {formik.errors.logo && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.logo}
                  </div>
                )}
              </div>
              <div className="catalogueModal">
                <div className="d-flex mb-4">
                  <Form.Check
                    type="checkbox"
                    name="for_sale"
                    checked={formik.values.for_sale}
                    onChange={formik.handleChange}
                  />
                  <Form.Label className="mb-0 ms-2">
                    {t("THIS_PRODUCT_IS_NOT_FOR_SALE")}
                  </Form.Label>
                </div>
                <div className="form-group ">
                  <Form.Label htmlFor="text">{t("EXPERIENCE_TYPE")}</Form.Label>
                  <div className="customSelect ml-auto staticIcon select-Branchs">
                    <Select
                      className={`form-control ${formik.touched.experience_type_id &&
                        formik.errors.experience_type_id &&
                        "is-invalid"
                        }`}
                      classNamePrefix="react-select"
                      defaultValue={expSelected}
                      onChange={(e) => handleExpChange(e)}
                      options={expData}
                      isMulti
                      components={{ Option }}
                      closeMenuOnSelect={false}
                      allowSelectAll={true}
                      hideSelectedOptions={false}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option._id}
                      value={formik.values.experience_type_id}
                      onBlur={() =>
                        formik.setFieldTouched("experience_type_id", true)
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
                    {formik.touched.experience_type_id &&
                      formik.errors.experience_type_id && (
                        <div className="invalid-feedback d-block position-absolute">
                          {formik.errors.experience_type_id}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ProductsAddModal;
