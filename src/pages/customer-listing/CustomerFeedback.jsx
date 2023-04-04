import React, { useEffect, useState } from "react";
import { Dropdown, Form, FormCheck } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import downArrow from "../../assets/images/downArrow.svg";
import LeftArrow from "../../assets/images/u_arrow-left.svg";
import RightArrow from "../../assets/images/u_arrow-right.svg";
import { rating_filter, status_filter } from "../../helpers/jsonData";
import { getbrandsforDropdown } from "../../middlewares/brands";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { useFormik } from "formik";
import { getAllBranches } from "../../middlewares/branches";
import { getAllExperienceType } from "../../middlewares/experienceType";

const CustomerFeedback = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showDate, setShowDate] = useState(false);
  const [branchData, setBranchData] = useState([]);
  const { dropDownBrands } = useSelector((state) => state.brand);
  const { allBranches } = useSelector((state) => state.branch);
  const { allExpType } = useSelector((state) => state.experience);

  // useEffect(() => {
  //   if (b_id) {
  //     dispatch(getBranchesByBrandId(b_id));
  //     dispatch(getExperienceTypeByBrandId(b_id));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [b_id]);

  useEffect(() => {
    dispatch(getbrandsforDropdown());
    dispatch(getAllBranches());
    dispatch(getAllExperienceType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const range = (a, b) => {
    let year = [];
    for (let i = a; i <= b; i++) {
      year.push(i);
    }
    return year;
  };

  const years = range(getYear(new Date()) - 100, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmit = (values) => {
    console.log("values------->", values);
  };

  const formik = useFormik({
    initialValues: {
      brands: [],
      rating: [],
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (formik.values.brands && formik.values.brands.length > 0) {
      const branches_data =
        formik.values.brands &&
        formik.values.brands.length > 0 &&
        formik.values.brands.map((o) => {
          const branchObj =
            allBranches &&
            allBranches.find((obj) => {
              return obj.brand_id === o;
            });
          return branchObj;
        });
      setBranchData(branches_data);
    }
  }, [formik.values]);

  console.log("allBranches", allBranches);

  return (
    <div>
      <div className="contentWrap">
        <div className="row equalHeight">
          <div className="col-12">
            <div className="contentHead">
              <h1>{t("CUSTOMERS")}</h1>
            </div>
          </div>
          <Form>
            <div className="FilterBox">
              <ul>
                <li>
                  <Dropdown
                    autoClose={"outside"}
                    className="ellipsis customSelect"
                    id="dropdown-basic"
                    style={{ color: "black" }}
                  >
                    <Dropdown.Toggle className="selectpicker justify-content-between">
                      {/* <span className="dropdown-badge me-2">
                    {isLanguage && isLanguage.length > 0
                      ? Object.keys(isLanguage).length
                      : "0"}
                  </span> */}
                      {/* {isLanguage && isLanguage.length > 0 ? (
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
                  )} */}
                      <span style={{ color: "black" }}> Brand</span>
                      <span className="d-Arrow">
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-menu">
                      {dropDownBrands &&
                        dropDownBrands.length > 0 &&
                        dropDownBrands.map((o, index) => (
                          <Dropdown.Item as={"span"} key={index}>
                            <div className="radio-and-check d-flex">
                              <div className="d-flex align-items-center">
                                <FormCheck.Input
                                  name="brands"
                                  type="checkbox"
                                  value={o._id}
                                  onChange={formik.handleChange}
                                  checked={
                                    formik.values.brands &&
                                    formik.values.brands.includes(o._id)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                                <FormCheck.Label className="ps-1">
                                  {o.name}
                                </FormCheck.Label>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                      <Dropdown.Item as={"span"} onClick={formik.handleSubmit}>
                        Apply
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown
                    autoClose={"outside"}
                    className="ellipsis customSelect"
                    id="dropdown-basic"
                    style={{ color: "black" }}
                  >
                    <Dropdown.Toggle className="selectpicker justify-content-between">
                      {/* <span className="dropdown-badge me-2">
                    {isLanguage && isLanguage.length > 0
                      ? Object.keys(isLanguage).length
                      : "0"}
                  </span> */}
                      {/* {isLanguage && isLanguage.length > 0 ? (
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
                  )} */}
                      <span style={{ color: "black" }}> Branch</span>
                      <span className="d-Arrow">
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </Dropdown.Toggle>
                    {branchData && branchData.length > 0 && (
                      <Dropdown.Menu id="dropdown-menu">
                        {branchData &&
                          branchData.map((o, index) => (
                            <Dropdown.Item as={"span"} key={index}>
                              <div className="radio-and-check d-flex">
                                <div className="d-flex align-items-center">
                                  <FormCheck.Input
                                    name="languages"
                                    type="checkbox"
                                    value={o._id ? o._id : null}
                                    onChange={formik.handleChange}
                                    checked={
                                      formik.values.languages &&
                                      formik.values.languages.includes(o._id)
                                    }
                                    onBlur={formik.handleBlur}
                                  />
                                  <FormCheck.Label className="ps-1">
                                    {o.name}
                                  </FormCheck.Label>
                                </div>
                              </div>
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </li>
                <li>
                  <Dropdown
                    autoClose={"outside"}
                    className="ellipsis customSelect"
                    id="dropdown-basic"
                    style={{ color: "black" }}
                  >
                    <Dropdown.Toggle className="selectpicker justify-content-between">
                      {/* <span className="dropdown-badge me-2">
                    {isLanguage && isLanguage.length > 0
                      ? Object.keys(isLanguage).length
                      : "0"}
                  </span> */}
                      {/* {isLanguage && isLanguage.length > 0 ? (
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
                  )} */}
                      <span style={{ color: "black" }}>Experence Type</span>
                      <span className="d-Arrow">
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-menu">
                      {allExpType &&
                        allExpType.map((o, index) => (
                          <Dropdown.Item as={"span"} key={index}>
                            <div className="radio-and-check d-flex">
                              <div className="d-flex align-items-center overflow-hidden">
                                <FormCheck.Input
                                  name="languages"
                                  type="checkbox"
                                  value={o._id}
                                  onChange={formik.handleChange}
                                  checked={
                                    formik.values.languages &&
                                    formik.values.languages.includes(o._id)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                                <FormCheck.Label className="ps-1 exp-dropdown">
                                  {o.title}
                                </FormCheck.Label>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown
                    autoClose={"outside"}
                    className="ellipsis customSelect"
                    id="dropdown-basic"
                    style={{ color: "black" }}
                  >
                    <Dropdown.Toggle className="selectpicker justify-content-between">
                      {/* <span className="dropdown-badge me-2">
                    {isLanguage && isLanguage.length > 0
                      ? Object.keys(isLanguage).length
                      : "0"}
                  </span> */}
                      {/* {isLanguage && isLanguage.length > 0 ? (
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
                  )} */}
                      <span style={{ color: "black" }}>Rating</span>
                      <span className="d-Arrow">
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-menu">
                      {rating_filter &&
                        rating_filter.map((o, index) => (
                          <Dropdown.Item as={"span"} key={index}>
                            <div className="radio-and-check d-flex">
                              <div className="d-flex align-items-center">
                                <FormCheck.Input
                                  name="rating"
                                  type="checkbox"
                                  value={o.value}
                                  onChange={formik.handleChange}
                                  checked={
                                    formik.values.rating &&
                                    formik.values.rating.includes(o.value)
                                  }
                                  onBlur={formik.handleBlur}
                                />
                                <FormCheck.Label className="ps-1">
                                  {o.label}
                                </FormCheck.Label>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown
                    autoClose={"outside"}
                    className="ellipsis customSelect"
                    id="dropdown-basic"
                    style={{ color: "black" }}
                  >
                    <Dropdown.Toggle className="selectpicker justify-content-between">
                      {/* <span className="dropdown-badge me-2">
                    {isLanguage && isLanguage.length > 0
                      ? Object.keys(isLanguage).length
                      : "0"}
                  </span> */}
                      {/* {isLanguage && isLanguage.length > 0 ? (
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
                  )} */}
                      <span style={{ color: "black" }}>Status</span>
                      <span className="d-Arrow">
                        <img src={downArrow} alt="downArrow" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="dropdown-menu">
                      {status_filter &&
                        status_filter.map((o, index) => (
                          <Dropdown.Item as={"span"} key={index}>
                            <div className="radio-and-check d-flex">
                              <div className="d-flex align-items-center">
                                <FormCheck.Input
                                  name="languages"
                                  type="checkbox"
                                  // value={o.key}
                                  // onChange={formik.handleChange}
                                  // checked={
                                  //   formik.values.languages &&
                                  //   formik.values.languages.includes(o.key)
                                  // }
                                  // onBlur={formik.handleBlur}
                                />
                                <FormCheck.Label className="ps-1">
                                  {o.label}
                                </FormCheck.Label>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <div
                    className="datepicker datepIcon"
                    onClick={() => setShowDate(!showDate)}
                  >
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="Date"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </Form>
        </div>
      </div>
      {showDate && (
        <DatePicker
          selectsRange={true}
          // startDate={formik.values.date[0]}
          // endDate={formik.values.date[1]}
          // onChange={(dateArr) => {
          //   formik.setFieldValue("date", dateArr);
          // }}
          isClearable={true}
          inline
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <>
              <div
                style={{
                  margintop: 10,
                  marginbottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px", cursor: "pointer" }}>
                  <span
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    <img src={LeftArrow} alt="monthDecrease" />
                  </span>
                </div>

                <select
                  className="form-select monthsSelect"
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select yearSelect "
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <div style={{ marginLeft: "10px", cursor: "pointer" }}>
                  <span
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    <img src={RightArrow} alt="monthIncrease" />
                  </span>
                </div>
              </div>
            </>
          )}
        />
      )}
    </div>
  );
};

export default CustomerFeedback;
