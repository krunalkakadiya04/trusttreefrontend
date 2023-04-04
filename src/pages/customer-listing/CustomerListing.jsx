import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import searchImg from "../../assets/images/search.svg";
// import disableButton from "../../assets/images/disable.svg";
import enableButton from "../../assets/images/enable.svg";
import trash from "../../assets/images/trash.svg";
import ellipsis from "../../assets/images/Ellipsis.svg";
import StarRatings from "react-star-ratings";
import { Link, useNavigate } from "react-router-dom";
import CusomerFilter from "./CusomerFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerData,
  getcustomerFeedbackData,
} from "../../middlewares/customer";
import { useFormik } from "formik";
import PaginationHelper from "../../helpers/Pagination";
import PlaceholderLoader from "../user-listing/PlaceholderLoader";
import noBrands from "../../assets/images/noBrands.svg";
import ROUTE_URLS from "../../config/routes";

const CustomerListing = () => {
  const perPage = 25;
  const { t } = useTranslation();
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    customer,
    filter,
    appliedFiltersCount,
    pagination,
    loading,
    feedbackData,
  } = useSelector((state) => state.customer);
  const [isStaffModal, setIsStaffModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSearch, setIsSearch] = useState("");
  const [sort, setSort] = useState([
    { key: "name", column: "name", name: "Name", order: -1, activeSort: true },
    {
      key: "phone_number",
      column: "phone_number",
      name: "Phone Number",
      order: -1,
      activeSort: false,
    },
    {
      key: "rating",
      column: "rating",
      name: "Rating",
      order: -1,
      activeSort: false,
    },
    {
      key: "last_rating",
      column: "last_rating",
      name: "LAST_RATING",
      order: -1,
      activeSort: false,
    },
    {
      key: "feedbacks",
      column: "feedbacks",
      name: "Feedbacks",
      order: -1,
      activeSort: false,
    },
    {
      key: "experience_types",
      column: "experience_types",
      name: "Experience Types",
      order: -1,
      activeSort: false,
    },
    {
      key: "brand",
      column: "brand",
      name: "Brands",
      order: -1,
      activeSort: false,
    },
  ]);

  useEffect(() => {
    if (!loading && initialLoading && customer) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      filter: filter,
      per_page: perPage,
      current_page: currentPage,
      search: isSearch,
      sort: sortObj,
    };
    dispatch(getCustomerData(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, isSearch]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsStaffModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = debounce(function (e) {
    setIsSearch(e.target.value);
    // dispatch(getBranchesListing(payload));
  }, 1000);

  const formik = useFormik({
    initialValues: {
      filter: "",
    },
  });

  const handleSort = (key) => {
    let sortObj = {};
    const newSortOrder = sort.map((o) => {
      if (o.key === key) {
        const newObj = {
          ...o,
          order: o.order === 1 ? -1 : 1,
          activeSort: true,
        };
        sortObj = { ...newObj, column: newObj.key };
        return newObj;
      }
      return { ...o, order: -1, activeSort: false };
    });
    setSort(newSortOrder);
    const payload = {
      filter: filter,
      per_page: perPage,
      current_page: currentPage,
      search: isSearch,
      sort: sortObj,
    };
    dispatch(getCustomerData(payload));
  };

  const handlePagination = (e) => {
    setCurrentPage(e);
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      filter: filter,
      per_page: perPage,
      current_page: e,
      search: isSearch,
      sort: sortObj,
    };
    dispatch(getCustomerData(payload));
  };

  const handleCustomer = (e) => {
    const payload = { customer_id: e };
    dispatch(getcustomerFeedbackData(payload));
    navigate(ROUTE_URLS.CUSTOMER_FEEDBACKS);
  };

  console.log("feedbackData", feedbackData);

  return (
    <>
      <Form>
        <div className="contentWrap">
          <div className="row equalHeight">
            <div className="col-12">
              <div className="contentHead">
                <h1>{t("CUSTOMERS")}</h1>
              </div>
            </div>
            {loading && initialLoading ? (
              <PlaceholderLoader />
            ) : (
              <>
                {(customer && customer.length > 0) ||
                isSearch !== "" ||
                appliedFiltersCount !== 0 ? (
                  <div>
                    <div className="staff-wrp flex">
                      <div className="feedbackSearch branches-inner">
                        <div className="inputWrap">
                          <button>
                            <span className="search-icon">
                              <img src={searchImg} alt="searchImg" />
                            </span>
                          </button>
                          <Form.Control
                            type="text"
                            className="form-control padding-input"
                            placeholder={t("SEARCH_BY_NAME_OR_PHONE")}
                            name="search"
                            onChange={(e) => handleSearch(e)}
                          />
                        </div>
                      </div>
                      <div className="brandFilter  filter-inner">
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100 filter-btn"
                          onClick={() => setIsStaffModal(!isStaffModal)}
                        >
                          <span></span>{" "}
                          <strong className="d-flex">
                            {t("FILTER")}{" "}
                            {appliedFiltersCount !== 0 && (
                              <div className="dropdown-badge">
                                {appliedFiltersCount}
                              </div>
                            )}
                          </strong>
                        </button>
                      </div>
                      <div ref={ref}>
                        {isStaffModal && (
                          <CusomerFilter
                            setFieldValue={formik.setFieldValue}
                            close={() => setIsStaffModal(!isStaffModal)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="categoriesRatingBox">
                      <table className="table">
                        <thead>
                          <tr>
                            {sort &&
                              sort.map((o, index) => (
                                <th key={o.key}>
                                  <span
                                    onClick={(e) => handleSort(o.key)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {t(o.name)}
                                    {o.order !== -1 ? (
                                      <FontAwesomeIcon
                                        key={index}
                                        icon={`angle-up`}
                                      />
                                    ) : (
                                      <FontAwesomeIcon
                                        key={index}
                                        icon={`angle-down`}
                                      />
                                    )}
                                  </span>
                                </th>
                              ))}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer && customer.length > 0 ? (
                            customer.map((o, index) => {
                              return (
                                <tr key={index}>
                                  <td
                                    onClick={() => handleCustomer(o._id)}
                                    // className={
                                    //   o.user_status === "de-activated"
                                    //     ? "disable-row"
                                    //     : ""
                                    // }
                                  >
                                    <div className="staffProfile">
                                      <p>{o.customer_name}</p>
                                    </div>
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    <p>{o.customer_phone}</p>
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    <div className="ratingsWrap">
                                      <div className="ratingsText">
                                        {" "}
                                        {parseFloat(o.rating_avg).toFixed(
                                          2
                                        )}{" "}
                                      </div>
                                      <StarRatings
                                        rating={o.rating_avg}
                                        starDimension="14px"
                                        starSpacing="2px"
                                        starRatedColor="#FFD600"
                                      />
                                    </div>
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    <div className="ratingsWrap">
                                      <div className="ratingsText">
                                        {" "}
                                        {parseFloat(o.last_rating).toFixed(
                                          2
                                        )}{" "}
                                      </div>
                                      <StarRatings
                                        rating={o.last_rating}
                                        starDimension="14px"
                                        starSpacing="2px"
                                        starRatedColor="#FFD600"
                                      />
                                    </div>
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    {o.feed_back_count}
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    {o.experience_count}
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    {o.brand_count}
                                  </td>
                                  <td
                                  // className={
                                  //   o.user_status === "de-activated"
                                  //     ? "disable-row"
                                  //     : ""
                                  // }
                                  >
                                    {/* {userProfile &&
                                      userProfile.permission !==
                                      o.permission && (
                                        <>
                                          {o.permission !== "owner" && ( */}
                                    <div className="edit-exper sidebar-dropdown user-dropdown">
                                      <Dropdown>
                                        <Dropdown.Toggle>
                                          <Link to={""}>
                                            <img
                                              src={ellipsis}
                                              alt="loadding"
                                            />
                                          </Link>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <ul>
                                            <li>
                                              <Dropdown.Item
                                              // onClick={() =>
                                              //   handleDisable(o)
                                              // }
                                              >
                                                <span>
                                                  {/* {o.user_status ===
                                                            "de-activated" ? ( */}
                                                  <img
                                                    src={enableButton}
                                                    alt="enable"
                                                  />
                                                  {/* ) : (
                                                            <img
                                                              src={
                                                                disableButton
                                                              }
                                                              alt="disable"
                                                            />
                                                          )} */}
                                                </span>
                                                {/* {o.user_status ===
                                                          "de-activated"
                                                          ? t("ENABLE") */}
                                                {t("DISABLE")}
                                                {/* } */}
                                              </Dropdown.Item>
                                            </li>
                                            {/* <li>
                                      <Dropdown.Item
                                      // onClick={() =>
                                      //   handleOpen(o._id)
                                      // }
                                      >
                                        <span>
                                          <img
                                            src={Edit}
                                            alt="Edit"
                                          />
                                        </span>
                                        {t("EDIT")}
                                      </Dropdown.Item>
                                    </li> */}
                                            {/* {userProfile &&
                                                      (userProfile.permission ===
                                                        "master" ||
                                                        userProfile.permission ===
                                                        "owner") && ( */}
                                            <li>
                                              <Dropdown.Item
                                              // onClick={() =>
                                              //   handleDelete(o)
                                              // }
                                              >
                                                <img src={trash} alt="trash" />
                                                <span className="del">
                                                  {t("DELETE")}
                                                </span>
                                              </Dropdown.Item>
                                            </li>
                                            {/* )} */}
                                          </ul>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                    {/* )}
                                        </>
                                      )} */}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={8}>{t("NO_CUSTOMER_FOUND")}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="user-add add-new-user d-flex justify-content-between">
                      <div></div>
                      <div>
                        {pagination && (
                          <PaginationHelper
                            itemClick={(o) => handlePagination(o)}
                            activeItem={(o) =>
                              parseInt(pagination.currentPage) === o
                            }
                            prev={() => {
                              handlePagination(
                                parseInt(pagination.currentPage) - 1
                              );
                            }}
                            next={() =>
                              handlePagination(
                                parseInt(pagination.currentPage) + 1
                              )
                            }
                            items={pagination.totalPages}
                            prevDisabled={
                              parseInt(pagination.currentPage) === 1
                            }
                            nextDisabled={
                              parseInt(pagination.currentPage) ===
                              pagination.totalPages
                            }
                            first_page={() =>
                              handlePagination(
                                parseInt(pagination.currentPage) === 1
                              )
                            }
                            last_page={() =>
                              handlePagination(pagination.totalPages)
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <img src={noBrands} alt="" />
                    <h2 className="brands-text justify-content-center">
                      {t("THERE_IS_NO_CUSTOMERS_YET")}
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Form>
    </>
  );
};

export default CustomerListing;
