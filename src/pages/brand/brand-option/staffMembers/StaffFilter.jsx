import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { ratings1, ratings2 } from "../../../../helpers/yup.validation.schema";
import { getBranchesByBrandId } from "../../../../middlewares/branches";
import { getExperienceTypeByBrandId } from "../../../../middlewares/experienceType";
import { dateFormat } from "../../../../helpers/dateFormat";
import { useTranslation } from "react-i18next";
import { getMonth, getYear } from "date-fns";
import LeftArrow from "../../../../assets/images/u_arrow-left.svg";
import RightArrow from "../../../../assets/images/u_arrow-right.svg";
import {
  clearFilter,
  setFliterValue,
} from "../../../../slices/staffMembers.slice";

const StaffFilter = (props) => {
  const { t } = useTranslation();
  const { b_id, setFieldValue, close } = props;
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const { experienceTypeData } = useSelector((state) => state.experience);
  const range = (a, b) => {
    let year = [];
    for (let i = a; i <= b; i++) {
      year.push(i);
    }
    return year;
  };

  const years = range(getYear(new Date()) - 100, getYear(new Date()) + 1, 1);
  const { filter, appliedFiltersCount } = useSelector((state) => state.staff);

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
  useEffect(() => {
    if (b_id) {
      dispatch(getBranchesByBrandId(b_id));
      dispatch(getExperienceTypeByBrandId(b_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b_id]);

  const handleSubmit = (values) => {
    const newValues = {
      branches: values.branches ? values.branches : [],
      expirence_type: values.exp_type ? values.exp_type : [],
      status: {
        enable: values.enable,
        disable: values.disable,
      },
      rating: {
        min: parseInt(values.ratings1),
        max: parseInt(values.ratings2),
      },
      date: {
        start: `${
          values.date[0] !== null && `${dateFormat(values.date[0])}T00:00:00`
        }`,
        end: `${
          values.date[1] !== null && `${dateFormat(values.date[1])}T23:59:59`
        }`,
      },
    };
    const payload = [newValues];
    setFieldValue("filter", payload);
    dispatch(setFliterValue({ ...newValues, date: values.date }));
    close();
  };

  const filterSchema = Yup.object().shape({
    ratings1: ratings1,
    ratings2: ratings2,
  });

  const formik = useFormik({
    initialValues: {
      ratings1: filter?.rating?.min || 0,
      ratings2: filter?.rating?.max || 5,
      branches: filter?.branches || [],
      exp_type: filter?.expirence_type || [],
      enable: filter?.status?.enable || false,
      disable: filter?.status?.disable || false,
      date: filter?.date || [null, null],
    },
    validationSchema: filterSchema,
    onSubmit: handleSubmit,
  });
  const clearAll = () => {
    const clearValue = {
      branches: [],
      expirence_type: [],
      status: {
        enable: false,
        disable: false,
      },
      rating: {
        min: 0,
        max: 5,
      },
      date: [null, null],
    };
    const filterVal = {
      ratings1: 0,
      ratings2: 5,
      branches: [],
      exp_type: [],
      enable: false,
      disable: false,
      date: [null, null],
    };
    dispatch(clearFilter(clearValue));

    setFieldValue("filter", filterVal);
    formik.resetForm();
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
                    className={`brand-rating-input ${
                      formik.touched.ratings1 &&
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
                    className={`brand-rating-input ${
                      formik.touched.ratings2 &&
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
            <Accordion.Header>{t("BRANCHES")}</Accordion.Header>
            <Accordion.Body>
              {branches &&
                branches.map((o) => (
                  <div key={o._id}>
                    <div className="brand-filter-sub-menu-align-left">
                      <div>
                        <Form.Check
                          type="checkbox"
                          name="branches"
                          value={o._id}
                          checked={formik.values.branches.includes(o._id)}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>{o.name}</div>
                    </div>
                  </div>
                ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>{t("EXPERIENCE_TYPE")}</Accordion.Header>
            <Accordion.Body>
              {experienceTypeData &&
                experienceTypeData.map((o) => (
                  <div key={o._id}>
                    <div className="brand-filter-sub-menu-align-left">
                      <div>
                        <Form.Check
                          type="checkbox"
                          name="exp_type"
                          id="service"
                          value={o._id}
                          checked={formik.values.exp_type.includes(o._id)}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>{o.title}</div>
                    </div>
                  </div>
                ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>{t("STATUS")}</Accordion.Header>
            <Accordion.Body>
              <div>
                <div className="brand-filter-sub-menu-align-left">
                  <div>
                    <Form.Check
                      type="checkbox"
                      name="enable"
                      style={{ cursor: "pointer" }}
                      checked={formik.values.enable}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>{t("ENABLE")}</div>
                </div>
              </div>
              <div>
                <div className="brand-filter-sub-menu-align-left">
                  <div>
                    <Form.Check
                      type="checkbox"
                      name="disable"
                      style={{ cursor: "pointer" }}
                      checked={formik.values.disable}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>{t("DISABLE")}</div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
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
            disabled={!formik.isValid}
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

export default StaffFilter;
