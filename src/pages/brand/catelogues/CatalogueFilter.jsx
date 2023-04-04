import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Accordion, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  price1,
  price2,
  ratings1,
  ratings2,
} from "../../../helpers/yup.validation.schema";
import { getBranchesByBrandId } from "../../../middlewares/branches";
import { getExperienceTypeByBrandId } from "../../../middlewares/experienceType";
import {
  clearFilter,
  setFilterValue,
} from "../../../slices/productCatalogue.slice";

import { useTranslation } from "react-i18next";
import {
  clearServiceFilter,
  setServiceFilterValue,
} from "../../../slices/services.slice";

const CatalogueFilter = (props) => {
  const { t } = useTranslation();
  const { setFieldValue } = props;
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const { experienceTypeData } = useSelector((state) => state.experience);
  const { filter, appliedFiltersCount } = useSelector((state) => state.product);
  const { filter: serviceFilter, appliedFiltersCount: serviceFilterCount } =
    useSelector((state) => state.service);

  useEffect(() => {
    const b_id = props.b_id;
    if (b_id) {
      dispatch(getBranchesByBrandId(b_id));
      dispatch(getExperienceTypeByBrandId(b_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.b_id]);

  const handleSubmit = (values) => {
    const newvalues = {
      // price: values.price,
      branch_id: values.branches,
      experience_key: values.exp_type,
      status: {
        enable: values.enable,
        disable: values.disable,
      },
      rating: {
        min: parseInt(values.ratings1),
        max: parseInt(values.ratings2),
      },
      price: {
        min: parseInt(values.price1),
        max: parseInt(values.price2),
      },
    };
    setFieldValue("filter", newvalues);
    if (props.type !== "service") {
      dispatch(setFilterValue(newvalues));
    } else {
      dispatch(setServiceFilterValue(newvalues));
    }
    props.setIsShow(!props.show);
  };

  const filterSchema = Yup.object().shape({
    ratings1: ratings1,
    ratings2: ratings2,
    price1: price1,
    price2: price2,
  });

  const formik = useFormik({
    initialValues:
      props.type !== "service"
        ? {
          ratings1: filter && filter.rating && filter.rating.min,
          ratings2: filter && filter.rating && filter.rating.max,
          price1: filter && filter.price && filter.price.min,
          price2: filter && filter.price && filter.price.max,
          branches: filter && filter.branch_id,
          exp_type: filter && filter.experience_key,
          enable: filter && filter.rating && filter.status.enable,
          disable: filter && filter.rating && filter.status.disable,
        }
        : {
          ratings1: serviceFilter?.rating.min,
          ratings2: serviceFilter?.rating.max,
          price1: serviceFilter?.price.min,
          price2: serviceFilter?.price.max,
          branches: serviceFilter?.branch_id,
          exp_type: serviceFilter?.experience_key,
          enable: serviceFilter?.status.enable,
          disable: serviceFilter?.status.disable,
        },
    validationSchema: filterSchema,
    onSubmit: handleSubmit,
  });

  const clearAll = () => {
    const clearValue = {
      experience_key: [],
      rating: { min: 0, max: 5 },
      price: { min: 0, max: 10000 },
      status: { enable: false, disable: false },
      branch_id: [],
    };
    if (props.type !== "service") {
      dispatch(clearFilter(clearValue));
    } else {
      dispatch(clearServiceFilter(clearValue));
    }
    setFieldValue("filter", clearValue);
    formik.resetForm();
    props.setIsShow(!props.show);
  };

  return (
    <div className="position-relative mt-4">
      <div className="brand-modal" style={{ marginTop: "25px" }}>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t("PRICE")}</Accordion.Header>
            <Accordion.Body>
              <div className="brand-filter-sub-menu">
                <div>
                  <Form.Control
                    type="number"
                    name="price1"
                    min="0"
                    max="10000"
                    placeholder="0"
                    className={`brand-rating-input ${formik.touched.price1 &&
                      formik.errors.price1 &&
                      "is-invalid"
                      }`}
                    onWheel={(e) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                    // onScroll={(e) => e.}
                    value={formik.values.price1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="mt-2">{t("TO")}</div>
                <div>
                  <Form.Control
                    name="price2"
                    type="number"
                    placeholder="10000"
                    min="1"
                    max="10000"
                    className={`brand-rating-input ${formik.touched.price2 &&
                      formik.errors.price2 &&
                      "is-invalid"
                      }`}
                    onWheel={(e) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                    value={formik.values.price2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
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
                    onWheel={(e) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                    value={formik.values.ratings1}
                    onChange={formik.handleChange}
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
                    onWheel={(e) => {
                      e.preventDefault();
                      e.target.blur();
                    }}
                    value={formik.values.ratings2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
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
                          checked={
                            formik.values.branches &&
                            formik.values.branches.includes(o._id)
                          }
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>{o.name}</div>
                    </div>
                  </div>
                ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
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
                          checked={
                            formik.values.exp_type &&
                            formik.values.exp_type.includes(o._id)
                          }
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>{o.title}</div>
                    </div>
                  </div>
                ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>{t("STATUS")}</Accordion.Header>
            <Accordion.Body>
              <div>
                <div className="brand-filter-sub-menu-align-left">
                  <span>
                    <Form.Check
                      type="checkbox"
                      name="enable"
                      style={{ cursor: "pointer" }}
                      checked={formik.values.enable}
                      onChange={formik.handleChange}
                    />
                  </span>
                  <span style={{ marginLeft: "10px" }}>{t("ENABLE")}</span>
                </div>
              </div>
              <div>
                <div className="brand-filter-sub-menu-align-left">
                  <span>
                    <Form.Check
                      type="checkbox"
                      name="disable"
                      style={{ cursor: "pointer" }}
                      checked={formik.values.disable}
                      onChange={formik.handleChange}
                    />
                  </span>
                  <span style={{ marginLeft: "10px" }}>{t("DISABLE")}</span>
                </div>
              </div>
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
        {(props.type !== "service"
          ? appliedFiltersCount > 0
          : serviceFilterCount > 0) && (
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

export default CatalogueFilter;
