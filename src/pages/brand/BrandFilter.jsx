import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Accordion } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getBranchesListing } from "../../middlewares/branches";
import { useTranslation } from "react-i18next";
import { getMonth, getYear } from "date-fns";
import LeftArrow from "../../assets/images/u_arrow-left.svg";
import RightArrow from "../../assets/images/u_arrow-right.svg";
import { dateFormat } from "../../helpers/dateFormat";
import {
  setFliterValue,
  setToInitialFliterValue,
} from "../../slices/brands.slice";

const BrandFilter = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setFieldValue, close } = props;
  const { brands } = useSelector((state) => state.brand);
  const selectedBrand = brands.find((o) => o._id === props.brand_id);
  const { filter, appliedFiltersCount } = selectedBrand;
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
  const filterSchema = Yup.object().shape(
    {
      trustree_min: Yup.number()
        .min(0)
        .when("trustree_max", (value, schema) => {
          return schema.max(value);
        }),
      trustree_max: Yup.number()
        .max(5)
        .when("trustree_min", (value, schema) => {
          return schema.min(value);
        }),
      google_min: Yup.number()
        .min(0)
        .when("google_max", (value, schema) => {
          return schema.max(value);
        }),
      google_max: Yup.number()
        .max(5)
        .when("google_min", (value, schema) => {
          return schema.min(value);
        }),
      team_min: Yup.number()
        .min(0)
        .when("team_max", (value, schema) => {
          return schema.max(value);
        }),
      team_max: Yup.number().when("team_min", (value, schema) => {
        return schema.min(value);
      }),
    },
    [
      ["trustree_min", "trustree_max"],
      ["google_min", "google_max"],
      ["team_min", "team_max"],
    ]
  );

  const handleSubmit = (values) => {
    const payload = {
      search: props.search,
      sort: {
        column: props.sort.column,
        order: props.sort.order,
      },
      brand_id: props.brand_id,
      per_page: props.per_page,
      current_page: props.current_page,
      filter: {
        trustree_rating: {
          min: values.trustree_min,
          max: values.trustree_max,
        },
        google_rating: {
          min: values.google_min,
          max: values.google_max,
        },
        low_category: values.low_category,
        best_category: values.best_category,
        team: {
          min: values.team_min,
          max: values.team_max,
        },
        is_disable: { enable: values.enable, disable: values.disable },
        date:
          values.date[0] !== null
            ? {
              start: `${dateFormat(values.date[0])}T00:00:00`,
              end: `${dateFormat(values.date[1])}T23:59:59`,
            }
            : [null, null],
      },
    };
    setFieldValue("filter", payload);
    dispatch(getBranchesListing(payload));
    dispatch(
      setFliterValue({ filter: payload.filter, brand_id: props.brand_id })
    );
    close();
  };

  const formik = useFormik({
    initialValues: {
      trustree_min: filter?.trustree_rating?.min || 0,
      trustree_max: filter?.trustree_rating?.max || 5,
      google_min: filter?.google_rating?.min || 0,
      google_max: filter?.google_rating?.max || 5,
      low_category: filter?.low_category || [],
      best_category: filter?.best_category || [],
      team_min: filter?.team?.min || 0,
      team_max: filter?.team?.max || 20,
      enable: filter?.is_disable?.enable || false,
      disable: filter?.is_disable?.disable || false,
      date: filter?.date || [null, null],
    },
    validationSchema: filterSchema,
    onSubmit: handleSubmit,
  });

  const clearAll = () => {
    dispatch(setToInitialFliterValue(props.brand_id));
    dispatch(
      getBranchesListing({
        search: props.search,
        sort: {
          column: props.sort.column,
          order: props.sort.order,
        },
        brand_id: props.brand_id,
        filter: {},
        per_page: 5,
        current_page: 1,
      })
    );
    close();
  };
  return (
    <div className="position-relative">
      <Form onSubmit={formik.handleSubmit}>
        <div className="brand-modal" style={{ marginTop: "50px" }}>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {/* ----Trustree Filter----- */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t("TRUSTREE_RATING")}</Accordion.Header>
              <Accordion.Body>
                <div className="brand-filter-sub-menu">
                  <div>
                    <Form.Control
                      type="number"
                      name="trustree_min"
                      value={formik.values.trustree_min}
                      className={` brand-rating-input ${formik.errors.trustree_min && "is-invalid"
                        }`}
                      onChange={formik.handleChange}
                      min={0}
                      max={formik.values.trustree_max - 1}
                    />
                  </div>
                  <div>{t("TO")}</div>
                  <div>
                    <Form.Control
                      name="trustree_max"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.trustree_max}
                      className={`brand-rating-input ${formik.errors.trustree_max && "is-invalid"
                        }`}
                      min={formik.values.trustree_min + 1}
                      max={5}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ----Google Filter----- */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>{t("Google Rating")}</Accordion.Header>
              <Accordion.Body>
                <div className="brand-filter-sub-menu">
                  <div>
                    <Form.Control
                      type="number"
                      name="google_min"
                      value={formik.values.google_min}
                      className={` brand-rating-input ${formik.errors.google_min && "is-invalid"
                        }`}
                      onChange={formik.handleChange}
                      max={formik.values.google_max - 1}
                      min={0}
                    />
                  </div>
                  <div>{t("TO")}</div>
                  <div>
                    <Form.Control
                      type="number"
                      name="google_max"
                      value={formik.values.google_max}
                      className={` brand-rating-input ${formik.errors.google_max && "is-invalid"
                        }`}
                      onChange={formik.handleChange}
                      min={formik.values.google_min + 1}
                      max={5}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ----Low Category Filter----- */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>{t("Low Category")}</Accordion.Header>
              <Accordion.Body>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <div>
                      <Form.Check
                        type="checkbox"
                        name="low_category"
                        value="service"
                        id="service"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>{t("SERVICE")}</div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <span>
                      <Form.Check
                        type="checkbox"
                        name="low_category"
                        value="value"
                        id="value"
                        onChange={formik.handleChange}
                      />
                    </span>
                    <span style={{ marginLeft: "10px" }}>{t("VALUE")}</span>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <span>
                      <Form.Check
                        name="low_category"
                        value="food_drink"
                        id="food_drink"
                        onChange={formik.handleChange}
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {t("FOOD_DRINK")}
                    </span>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ----Best Category Filter----- */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>{t("Best Category")}</Accordion.Header>
              <Accordion.Body>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <div>
                      <Form.Check
                        type="checkbox"
                        name="best_category"
                        value="service"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>{t("SERVICE")}</div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <div>
                      <Form.Check
                        type="checkbox"
                        name="best_category"
                        value="value"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>{t("VALUE")}</div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <div>
                      <Form.Check
                        type="checkbox"
                        name="best_category"
                        value="food_and_drink"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>{t("FOOD_DRINK")}</div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ----Team---- */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>{t("Team")}</Accordion.Header>
              <Accordion.Body>
                <div className="brand-filter-sub-menu">
                  <div>
                    <Form.Control
                      type="number"
                      name="team_min"
                      value={formik.values.team_min}
                      className={` brand-rating-input ${formik.errors.team_min && "is-invalid"
                        }`}
                      onChange={formik.handleChange}
                      min={0}
                      max={formik.values.team_max - 1}
                    />
                  </div>
                  <div>{t("TO")}</div>
                  <div>
                    <Form.Control
                      type="number"
                      name="team_max"
                      value={formik.values.team_max}
                      className={` brand-rating-input ${formik.errors.team_max && "is-invalid"
                        }`}
                      onChange={formik.handleChange}
                      min={formik.values.team_min + 1}
                      max={10000}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ---Status--- */}
            <Accordion.Item eventKey="5">
              <Accordion.Header>{t("STATUS")}</Accordion.Header>
              <Accordion.Body>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <span>
                      <Form.Check
                        type="checkbox"
                        name="enable"
                        checked={formik.values.enable}
                        onChange={formik.handleChange}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span style={{ marginLeft: "10px" }}>{t("ENABLE")}</span>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
                <div>
                  <div className="brand-filter-sub-menu-align-left">
                    <span>
                      <Form.Check
                        type="checkbox"
                        name="disable"
                        checked={formik.values.disable}
                        onChange={formik.handleChange}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span style={{ marginLeft: "10px" }}>{t("DISABLE")}</span>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  ></div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* ---Date--- */}
            <Accordion.Item eventKey="6">
              <Accordion.Header>{t("DATE")}</Accordion.Header>
              {/* <Accordion.Body className="d-flex justify-content-center align-items-center"> */}
              <Accordion.Body className="calendar-box text-center">
                {/* <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={false}
                  inline
                /> */}
                <DatePicker
                  selectsRange={true}
                  startDate={formik.values.date[0]}
                  endDate={formik.values.date[1]}
                  onChange={(dateArr) => {
                    formik.setFieldValue("date", dateArr);
                  }}
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
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
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
                <button
                  className="bg-transparent border-0"
                  onClick={() => {
                    formik.setFieldValue("date", [null, null]);
                  }}
                >
                  Clear Selection
                </button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* ---Apply Button--- */}
          <div className="brand-button">
            <Button
              className="brand-apply-btn "
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
            >
              {t("APPLY")}
            </Button>
          </div>

          {appliedFiltersCount > 0 && (
            <div className="brand-button">
              <button
                onClick={() => {
                  formik.resetForm();
                  clearAll();
                }}
                className="clear-all"
                style={{ marginBottom: "16px", textAlign: "center" }}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default BrandFilter;
