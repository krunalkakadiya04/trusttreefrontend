import React from "react";
import * as Yup from "yup";
import { getMonth, getYear } from "date-fns";
import { Accordion, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { dateFormat } from "../../helpers/dateFormat";
import { clearFilter, setFilterValue } from "../../slices/customer.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  brands1,
  brands2,
  experience_type1,
  experience_type2,
  feedback1,
  feedback2,
  last_ratings1,
  last_ratings2,
  ratings1,
  ratings2,
} from "../../helpers/yup.validation.schema";

const CusomerFilter = ({ setFieldValue, close }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filter, appliedFiltersCount } = useSelector(
    (state) => state.customer
  );
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
    const newValues = {
      rating: {
        min: parseInt(values.ratings1),
        max: parseInt(values.ratings2),
      },
      last_rating: {
        min: parseInt(values.last_ratings1),
        max: parseInt(values.last_ratings2),
      },
      feedback: {
        min: parseInt(values.feedback1),
        max: parseInt(values.feedback2),
      },
      experience_type: {
        min: parseInt(values.experience_type1),
        max: parseInt(values.experience_type2),
      },
      brand: {
        min: parseInt(values.brands1),
        max: parseInt(values.brands2),
      },
      date:
        values.date[0] !== null
          ? {
            start: `${dateFormat(values.date[0])}T00:00:00`,
            end: `${dateFormat(values.date[1])}T23:59:59`,
          }
          : [null, null],
    };
    setFieldValue("filter", newValues);
    dispatch(setFilterValue(newValues));
    close();
  };

  const filterSchema = Yup.object().shape({
    ratings1: ratings1,
    ratings2: ratings2,
    last_ratings1: last_ratings1,
    last_ratings2: last_ratings2,
    feedback1: feedback1,
    feedback2: feedback2,
    experience_type1: experience_type1,
    experience_type2: experience_type2,
    brands1: brands1,
    brands2: brands2,
  });

  const formik = useFormik({
    initialValues: {
      ratings1: filter && filter.rating && filter.rating.min,
      ratings2: filter && filter.rating && filter.rating.max,
      last_ratings1: filter && filter.last_rating && filter.last_rating.min,
      last_ratings2: filter && filter.last_rating && filter.last_rating.max,
      feedback1: filter && filter.feedback && filter.feedback.min,
      feedback2: filter && filter.feedback && filter.feedback.max,
      experience_type1:
        filter && filter.experience_type && filter.experience_type.min,
      experience_type2:
        filter && filter.experience_type && filter.experience_type.max,
      brands1: filter && filter.brand && filter.brand.min,
      brands2: filter && filter.brand && filter.brand.max,
      date: filter?.date || [null, null],
    },
    validationSchema: filterSchema,
    onSubmit: handleSubmit,
  });

  const clearAll = () => {
    const clearValue = {
      rating: { min: 0, max: 5 },
      last_rating: { min: 0, max: 5 },
      feedback: { min: 0, max: 5 },
      experience_type: { min: 0, max: 5 },
      brand: { min: 0, max: 5 },
      date: [null, null],
    };
    dispatch(clearFilter(clearValue));
    setFieldValue("filter", clearValue);
    close();
  };

  return (
    <div className="position-relative">
      <div className="brand-modal" style={{ marginTop: "25px" }}>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t("RATINGS")}</Accordion.Header>
            <Accordion.Body>
              <div className="brand-filter-sub-menu">
                <div>
                  <Form.Control
                    type="number"
                    name="ratings1"
                    min="0"
                    max="5"
                    placeholder="0"
                    className={`brand-rating-input ${formik.touched.ratings1 &&
                      formik.errors.ratings1 &&
                      "is-invalid"
                      }`}
                    value={formik.values.ratings1}
                    onChange={formik.handleChange}
                    onWheel={(e) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="mt-2">{t("TO")}</div>
                <div>
                  <Form.Control
                    name="ratings2"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    className={`brand-rating-input ${formik.touched.ratings2 &&
                      formik.errors.ratings2 &&
                      "is-invalid"
                      }`}
                    value={formik.values.ratings2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onWheel={(e) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>{t("LAST_RATING")}</Accordion.Header>
            <Accordion.Body>
              <div className="brand-filter-sub-menu">
                <div>
                  <Form.Control
                    type="number"
                    name="last_ratings1"
                    min="0"
                    max="5"
                    placeholder="0"
                    className={`brand-rating-input ${formik.touched.last_ratings1 &&
                      formik.errors.last_ratings1 &&
                      "is-invalid"
                      }`}
                    value={formik.values.last_ratings1}
                    onChange={formik.handleChange}
                    // onWheel={(e) => {
                    //   e.preventDefault();
                    //   e.target.blur();
                    // }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="mt-2">{t("TO")}</div>
                <div>
                  <Form.Control
                    name="last_ratings2"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    className={`brand-rating-input ${formik.touched.last_ratings2 &&
                      formik.errors.last_ratings2 &&
                      "is-invalid"
                      }`}
                    value={formik.values.last_ratings2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // onWheel={(e) => {
                  //   e.preventDefault();
                  //   e.target.blur();
                  // }}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>{t("Feedbacks")}</Accordion.Header>
            <Accordion.Body>
              <div className="brand-filter-sub-menu">
                <div>
                  <Form.Control
                    type="number"
                    name="feedback1"
                    min="0"
                    max="5"
                    placeholder="0"
                    className={`brand-rating-input ${formik.touched.feedback1 &&
                      formik.errors.feedback1 &&
                      "is-invalid"
                      }`}
                    value={formik.values.feedback1}
                    onChange={formik.handleChange}
                    // onWheel={(e) => {
                    //   e.preventDefault();
                    //   e.target.blur();
                    // }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="mt-2">{t("TO")}</div>
                <div>
                  <Form.Control
                    name="feedback2"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    className={`brand-rating-input ${formik.touched.feedback2 &&
                      formik.errors.feedback2 &&
                      "is-invalid"
                      }`}
                    value={formik.values.feedback2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // onWheel={(e) => {
                  //   e.preventDefault();
                  //   e.target.blur();
                  // }}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>{t("EXPERIENCE_TYPE")}</Accordion.Header>
            <Accordion.Body>
              <div className="brand-filter-sub-menu">
                <div>
                  <Form.Control
                    type="number"
                    name="experience_type1"
                    min="0"
                    max="5"
                    placeholder="0"
                    className={`brand-rating-input ${formik.touched.experience_type1 &&
                      formik.errors.experience_type1 &&
                      "is-invalid"
                      }`}
                    value={formik.values.experience_type1}
                    onChange={formik.handleChange}
                    // onWheel={(e) => {
                    //   e.preventDefault();
                    //   e.target.blur();
                    // }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="mt-2">{t("TO")}</div>
                <div>
                  <Form.Control
                    name="experience_type2"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    className={`brand-rating-input ${formik.touched.experience_type2 &&
                      formik.errors.experience_type2 &&
                      "is-invalid"
                      }`}
                    value={formik.values.experience_type2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // onWheel={(e) => {
                  //   e.preventDefault();
                  //   e.target.blur();
                  // }}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>{t("Brands")}</Accordion.Header>
            <Accordion.Body>
              <div className="brand-filter-sub-menu">
                <div>
                  <Form.Control
                    type="number"
                    name="brands1"
                    min="0"
                    max="5"
                    placeholder="0"
                    className={`brand-rating-input ${formik.touched.brands1 &&
                      formik.errors.brands1 &&
                      "is-invalid"
                      }`}
                    value={formik.values.brands1}
                    onChange={formik.handleChange}
                    // onWheel={(e) => {
                    //   e.preventDefault();
                    //   e.target.blur();
                    // }}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="mt-2">{t("TO")}</div>
                <div>
                  <Form.Control
                    name="brands2"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="5"
                    className={`brand-rating-input ${formik.touched.brands2 &&
                      formik.errors.brands2 &&
                      "is-invalid"
                      }`}
                    value={formik.values.brands2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  // onWheel={(e) => {
                  //   e.preventDefault();
                  //   e.target.blur();
                  // }}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>{t("DATE")}</Accordion.Header>
            <Accordion.Body className="calendar-box text-center">
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
                          {/* <img src={LeftArrow} alt="monthDecrease" /> */}
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
                          {/* <img src={RightArrow} alt="monthIncrease" /> */}
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
                {t("CLEAR_SELECTION")}
              </button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="brand-button">
          <Button
            className="brand-apply-btn"
            type="submit"
            onClick={formik.handleSubmit}
          // disabled={!formik.isValid}
          >
            {t("APPLY")}
          </Button>
        </div>
        {appliedFiltersCount > 0 && (
          <div className="brand-button">
            <button
              onClick={() => clearAll()}
              className="clear-all"
              style={{ marginBottom: "16px", textAlign: "center" }}
            >
              {t("CLEAR_ALL")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CusomerFilter;
