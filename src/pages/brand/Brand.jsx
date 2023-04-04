import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import startOne from "../../assets/images/starOne.svg";
import ellipsis from "../../assets/images/Ellipsis.svg";
import disableButton from "../../assets/images/disable.svg";
import enableButton from "../../assets/images/enable.svg";
import editButton from "../../assets/images/brand-edit.svg";
import circleDownArrow from "../../assets/images/circleDownArrow.svg";
import noBranchesFound from "../../assets/images/noBrands.svg";
import search from "../../assets/images/search.svg";
import plus from "../../assets/images/Plus.svg";
import noBrands from "../../assets/images/noBrands.svg";
import "./brand.scss";
import { useDispatch, useSelector } from "react-redux";
import { getbrandListing, getOneBrandToUpdate } from "../../middlewares/brands";
import BrandsAddModal from "./BrandsAddModal";
import BranchAddModal from "./BranchAddModal";
import {
  getBranchesListing,
  getOneBranchToUpdate,
} from "../../middlewares/branches";
import { Button, Dropdown } from "react-bootstrap";
import { isOpenModalById, setFilterToggle } from "../../slices/brands.slice";
import { useTranslation } from "react-i18next";
import BrandFilter from "./BrandFilter";
import chart from "../../assets/images/chart.svg";
import BrandChart from "./BrandChart";
import PaginationHelper from "../../helpers/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import DisableBrandModal from "./DisableBrandModal";
import { resetForm } from "../../slices/branches.slice";
import PlaceholderLoader from "../user-listing/PlaceholderLoader";
import Avatar from "react-avatar";
import DisableBranchModal from "./DisableBranchModal";

const Brand = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [disableModal, setDisableModal] = useState(false);
  const [disableBranchModal, setDisableBranchModal] = useState(false);
  const [brandDisable, setBrandDisable] = useState();
  const [branchDisable, setBranchDisable] = useState();
  const [initialLoading, setInitialLoading] = useState(true);
  const [chartShow, setChartShow] = useState(false);
  const {
    brands,
    loading,
    saveMessage,
    saveUpdateMessage,
    pagination,
    disEnableMessage,
  } = useSelector((state) => state.brand);
  const { userProfile } = useSelector((state) => state.user);
  const { saveBranchMessage, saveBranchUpdateMessage, disEnableBranchMessage } =
    useSelector((state) => state.branch);

  const [openBrandId, setOpenBrandId] = useState(null);
  const [branchID, setBranchID] = useState(null);
  const [branchName, setBranchName] = useState(null);
  const [sort, setSort] = useState([
    {
      key: "branch",
      column: "branch",
      value: "Branch",
      order: -1,
      activeSort: true,
    },
    {
      key: "rating",
      column: "rating",
      value: "Rating",
      order: -1,
      activeSort: false,
    },
    {
      key: "google_rating",
      column: "google_rating",
      value: "Google Rating",
      order: -1,
      activeSort: false,
    },
    {
      key: "performance",
      column: "performance",
      value: "Performance",
      order: -1,
      activeSort: false,
    },
    {
      key: "team",
      column: "team",
      value: "Team",
      order: -1,
      activeSort: false,
    },
    {
      key: "products",
      column: "products",
      value: "Products",
      order: -1,
      activeSort: false,
    },
    {
      key: "low_category",
      column: "low_category",
      value: "Low Catgeory",
      order: -1,
      activeSort: false,
    },
    {
      key: "best_category",
      column: "best_category",
      value: "Best Catgeory",
      order: -1,
      activeSort: false,
    },
  ]);

  const perPage = 5;
  const perPageBrand = 25;
  const currentPage = 1;

  const defaultFilter = {
    trustree_rating: {
      min: 0,
      max: 5,
    },
    google_rating: {
      min: 0,
      max: 5,
    },
    low_category: [],
    best_category: [],
    team: {
      min: 0,
      max: 20,
    },
    is_disable: { enable: false, disable: false },
    date: [null, null],
  };

  useEffect(() => {
    if (!loading && initialLoading && brands) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const payload = {
      perPage: perPageBrand,
      currentPage: currentPage,
    };
    dispatch(getbrandListing(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage, saveUpdateMessage, disEnableMessage]);

  const handleOpen = (e) => {
    const b_Id = e;
    setBrandId(b_Id);
    setIsOpen(true);
  };

  const handleEditOpen = (e) => {
    const selectId = e.target.id;
    dispatch(getOneBrandToUpdate(selectId));
    setIsEditMode(true);
  };

  const handleBranchModalOpen = (e, b_id) => {
    const selectId = e.target.id;
    dispatch(getOneBranchToUpdate(selectId));
    setIsOpen(true);
    setBrandId(b_id);
  };

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      search: "",
      brand_id: openBrandId,
      sort: sortObj,
      filter: defaultFilter,
      per_page: perPage,
      current_page: currentPage,
    }
    if (openBrandId) {
      dispatch(getBranchesListing(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openBrandId]);

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      search: "",
      brand_id: brandId,
      sort: sortObj,
      filter: defaultFilter,
      per_page: perPage,
      current_page: currentPage,
    };
    if (brandId) {
      dispatch(getBranchesListing(payload));
    }
    dispatch(resetForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    saveMessage,
    saveBranchMessage,
    saveBranchUpdateMessage,
    disEnableBranchMessage,
  ]);

  const handleToggle = (e) => {
    const payload = e.target.id;
    setOpenBrandId(payload);
    dispatch(isOpenModalById(payload));
  };

  const handleBrandFilterModal = (index) => {
    dispatch(setFilterToggle(index));
  };

  const handleSort = (key, b_id) => {
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
      search: searchFilter,
      brand_id: b_id,
      current_page: filter.currentPage ? filter.currentPage : currentPage,
      per_page: filter.perPage ? filter.perPage : perPage,
      sort: sortObj,
      filter: filter.filter ? filter.filter : defaultFilter,
    };

    dispatch(getBranchesListing(payload));
  };

  const formik = useFormik({
    initialValues: {
      filter: "",
    },
  });

  const filter = formik.values.filter;

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleChange = debounce(function (e, b_id) {
    setSearchFilter(e.target.value);
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      search: e.target.value,
      brand_id: b_id,
      sort: sortObj,
      filter: filter.filter ? filter.filter : defaultFilter,
      current_page: filter.currentPage ? filter.currentPage : currentPage,
      per_page: filter.perPage ? filter.perPage : perPage,
    };

    dispatch(getBranchesListing(payload));
  }, 1000);

  const handleBrandPagination = (e) => {
    const payload = {
      currentPage: e,
      perPage: perPageBrand,
    };
    dispatch(getbrandListing(payload));
  };

  const handleBranchPagination = (e, b_id) => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      search: searchFilter,
      brand_id: b_id,
      sort: sortObj,
      filter: filter.filter ? filter.filter : defaultFilter,
      current_page: filter.currentPage ? filter.currentPage : e,
      per_page: filter.perPage ? filter.perPage : perPage,
    };
    dispatch(getBranchesListing(payload));
  };

  const handleChartOpen = (id, name) => {
    setChartShow(true);
    setBranchID(id);
    setBranchName(name);
  };

  const handleBranchDisable = (obj) => {
    setBrandId(obj.brand_id);
    setBranchDisable(obj);
    setDisableBranchModal(true);
  };

  const handleDisable = (e) => {
    setBrandDisable(e);
    setDisableModal(true);
  };

  return (
    <>
      <div className="contentWrap">
        <div className="contentHead">
          <h1>{t("Brands")}</h1>
        </div>
        {loading && initialLoading ? (
          <PlaceholderLoader />
        ) : (
          <>
            {brands && brands.length > 0 ? (
              <>
                <div className="accordion brandAccordion" id="accordionExample">
                  {brands.map((o, index) => {
                    return (
                      <div
                        className={`card ${o.is_disable ? "disable-row " : ""
                          } ${o.isOpen ? "active" : ""}`}
                        key={o._id}
                      >
                        <div className="card-header">
                          <h2 className="mb-0">
                            <div
                              className="btn"
                              id={o._id}
                              onClick={(e) =>
                                o.is_disable ? null : handleToggle(e, index)
                              }
                            >
                              <div className="brandTitle" id={o._id}>
                                <span id={o._id}>
                                  <div className="brandImg">
                                    {o.logo ? (
                                      <img
                                        src={
                                          `${process.env.REACT_APP_BASE_URL}${o.logo}` ||
                                          require("../../assets/images/noProfile.webp")
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                                        }}
                                        alt="logo"
                                        id={o._id}
                                      />
                                    ) : (
                                      <>
                                        <Avatar
                                          name={o.name}
                                          size="40px"
                                          key={o._id}
                                        />
                                      </>
                                    )}
                                  </div>
                                </span>
                                <strong id={o._id}>{o.name}</strong>
                              </div>
                              <div className="reviewDisplay" id={o._id}>
                                <span
                                  // style={{
                                  //   display: "inline-flex",
                                  //   flexDirection: "",
                                  // }}
                                  id={o._id}
                                >
                                  {parseFloat(
                                    (o.google_ratings_avg +
                                      o.trustree_ratings_avg) /
                                    2
                                  ).toFixed(1)}
                                  <strong id={o._id}>
                                    <img src={startOne} alt="" id={o._id} />
                                  </strong>
                                </span>{" "}
                              </div>
                              <div className="brandIcons edit-exper  sidebar-dropdown user-dropdown">
                                {userProfile &&
                                  userProfile.permission !== "viewer" && (
                                    <ul>
                                      <Dropdown className="dis-dropdown">
                                        <Dropdown.Toggle>
                                          <img src={ellipsis} alt="loadding" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ margin: 0 }}>
                                          <li className="exper-drop-ul-li">
                                            <Dropdown.Item
                                              onClick={() => handleDisable(o)}
                                            >
                                              {o.is_disable ? (
                                                <img
                                                  src={enableButton}
                                                  alt="enable"
                                                />
                                              ) : (
                                                <img
                                                  src={disableButton}
                                                  alt="disable"
                                                />
                                              )}
                                              {o.is_disable
                                                ? t("ENABLE")
                                                : t("DISABLE")}
                                            </Dropdown.Item>
                                          </li>
                                          <li className="exper-drop-ul-li">
                                            <Dropdown.Item
                                              id={o._id}
                                              onClick={(e) => handleEditOpen(e)}
                                            >
                                              <img
                                                src={editButton}
                                                alt="edit"
                                              />
                                              {t("EDIT")}
                                            </Dropdown.Item>
                                          </li>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </ul>
                                  )}
                                <span id={o._id}>
                                  {o.isOpen ? (
                                    <img
                                      className="upArrow"
                                      src={circleDownArrow}
                                      alt=""
                                      id={o._id}
                                    />
                                  ) : (
                                    <img
                                      src={circleDownArrow}
                                      alt=""
                                      id={o._id}
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                          </h2>
                        </div>
                        {o.isOpen && (
                          <div className="card-body">
                            <div className="brandInfo">
                              <ul>
                                <li>
                                  <span>{t("BRANCHES")}</span>{" "}
                                  <strong>
                                    {o.branches &&
                                      o.branches.data &&
                                      o.branches.data.length
                                      ? o.branches.data.length
                                      : 0}
                                  </strong>
                                </li>
                                <li>
                                  <span>{t("TRUSTREE_RATING")}</span>{" "}
                                  <strong>
                                    {parseFloat(o.trustree_ratings_avg).toFixed(
                                      2
                                    )}
                                  </strong>
                                </li>
                                <li>
                                  <span>{t("RATINGS")}</span>{" "}
                                  <strong>{o.trustree_ratings_count}</strong>
                                </li>
                                <li>
                                  <span>{t("Google Rating")}</span>{" "}
                                  <strong>
                                    {parseFloat(o.google_ratings_avg).toFixed(
                                      2
                                    )}
                                  </strong>
                                </li>
                                <li>
                                  <span>{t("Google Ratings")}</span>{" "}
                                  <strong>{o.google_ratings_count}</strong>
                                </li>
                                <li>
                                  <span>{t("Experience Types")}</span>{" "}
                                  <strong>{o.experience_types?.length}</strong>
                                </li>
                              </ul>
                            </div>
                            <div className="flex mb-4">
                              <div className="feedbackSearch branches-inner">
                                <div className="inputWrap">
                                  <button>
                                    {" "}
                                    <img src={search} alt="" />{" "}
                                  </button>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="search"
                                    onChange={(e) => {
                                      e.persist();
                                      handleChange(e, o._id);
                                    }}
                                    placeholder={t("SEARCH_BY_NAME")}
                                  />
                                </div>
                              </div>
                              {/* Brand Filter Button */}
                              <div className="brandFilter filter-inner ">
                                <button
                                  className="btn btn-outline-primary w-100 filter-btn"
                                  onClick={() => handleBrandFilterModal(index)}
                                >
                                  <span></span>{" "}
                                  <strong className="d-flex ">
                                    {t("FILTER")}{" "}
                                    {o.appliedFiltersCount !== 0 && (
                                      <div className="dropdown-badge">
                                        {o.appliedFiltersCount}
                                      </div>
                                    )}
                                  </strong>
                                </button>
                              </div>
                              {o.isFilterOpen && (
                                <BrandFilter
                                  per_page={perPage}
                                  current_page={currentPage}
                                  search={searchFilter}
                                  sort={sort}
                                  setFieldValue={formik.setFieldValue}
                                  brand_id={o._id}
                                  close={() => handleBrandFilterModal(index)}
                                />
                              )}
                            </div>
                            <div className="brandTable">
                              <table className="table">
                                <thead>
                                  <tr>
                                    {sort &&
                                      sort.map((obj, index) => (
                                        <th key={obj.key} className="width260">
                                          <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleSort(obj.key, o._id)
                                            }
                                          >
                                            {t(obj.value)}
                                            {obj.order !== -1 ? (
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
                                  {o.branches &&
                                    o.branches.data &&
                                    o.branches.data.length > 0 ? (
                                    o.branches.data.map((obj, index) => {
                                      return (
                                        <tr key={index}>
                                          <td
                                            className={`width260 ${obj.is_disable
                                              ? "disable-row"
                                              : ""
                                              }`}
                                          >
                                            <div className="branchTitle">
                                              <p>{obj.name}</p>
                                              <span>{obj.address}</span>
                                            </div>
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            <div className="ratingsWrap">
                                              <div className="ratingsText">
                                                {" "}
                                                {parseFloat(
                                                  obj.trustree_ratings_avg
                                                ).toFixed(2)}{" "}
                                                <span
                                                  style={{
                                                    color: " #909090",
                                                    marginLeft: "3px",
                                                  }}
                                                >
                                                  ({obj.trustree_ratings_count})
                                                </span>{" "}
                                              </div>
                                              <StarRatings
                                                rating={
                                                  obj.trustree_ratings_avg
                                                }
                                                starDimension="14px"
                                                starSpacing="2px"
                                                starRatedColor="#FFD600"
                                              />
                                            </div>
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            <div className="ratingsWrap">
                                              <div className="ratingsText">
                                                {" "}
                                                {parseFloat(
                                                  obj.google_ratings_avg
                                                ).toFixed(2)}{" "}
                                                <span
                                                  style={{
                                                    color: " #909090",
                                                    marginLeft: "3px",
                                                  }}
                                                >
                                                  ({obj.trustree_ratings_count})
                                                </span>{" "}
                                              </div>
                                              <StarRatings
                                                rating={obj.google_ratings_avg}
                                                starDimension="14px"
                                                starSpacing="2px"
                                                starRatedColor="#FFD600"
                                              />
                                            </div>
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            <div>
                                              <img
                                                src={chart}
                                                alt=""
                                                onClick={() => {
                                                  handleChartOpen(
                                                    obj._id,
                                                    obj.name
                                                  );
                                                }}
                                              />
                                            </div>
                                            {chartShow &&
                                              obj._id === branchID &&
                                              obj.name === branchName && (
                                                <BrandChart
                                                  branch_name={branchName}
                                                  branch_id={branchID}
                                                  show={chartShow}
                                                  hide={() =>
                                                    setChartShow(false)
                                                  }
                                                />
                                              )}
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            {obj.teams_count}
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            12
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            Service
                                          </td>
                                          <td
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            Value
                                          </td>
                                          <td
                                            id={obj._id}
                                            className={`${obj.is_disable
                                              ? "disable-row "
                                              : ""
                                              }`}
                                          >
                                            <div className="brandIcons edit-exper  sidebar-dropdown user-dropdown">
                                              {userProfile &&
                                                userProfile.permission !==
                                                "viewer" && (
                                                  <ul>
                                                    <Dropdown className="dis-dropdown ">
                                                      <Dropdown.Toggle>
                                                        <img
                                                          src={ellipsis}
                                                          alt="loadding"
                                                        />
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu
                                                        style={{ margin: 0 }}
                                                      >
                                                        <li className="exper-drop-ul-li">
                                                          <Dropdown.Item
                                                            id={obj._id}
                                                            onClick={() =>
                                                              handleBranchDisable(
                                                                obj
                                                              )
                                                            }
                                                          >
                                                            {obj.is_disable ? (
                                                              <img
                                                                src={
                                                                  enableButton
                                                                }
                                                                alt="enable"
                                                              />
                                                            ) : (
                                                              <img
                                                                src={
                                                                  disableButton
                                                                }
                                                                alt="disable"
                                                              />
                                                            )}
                                                            {obj.is_disable
                                                              ? t("ENABLE")
                                                              : t("DISABLE")}
                                                          </Dropdown.Item>
                                                        </li>
                                                        <li className="exper-drop-ul-li">
                                                          <Dropdown.Item
                                                            id={obj._id}
                                                            onClick={(e) =>
                                                              handleBranchModalOpen(
                                                                e,
                                                                obj.brand_id
                                                              )
                                                            }
                                                          >
                                                            <img
                                                              src={editButton}
                                                              alt="edit"
                                                            />
                                                            {t("EDIT")}
                                                          </Dropdown.Item>
                                                        </li>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                  </ul>
                                                )}
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <>
                                      <tr>
                                        <td colSpan={9}>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                              }}
                                            >
                                              <img
                                                src={noBranchesFound}
                                                alt="no Brands"
                                                style={{ width: "50%" }}
                                              />
                                              <div
                                                style={{
                                                  color: "#909090",
                                                  fontWeight: 500,
                                                  fontSize: "16px",
                                                }}
                                              >
                                                {t("NO_BRANCH")}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {userProfile &&
                                userProfile.permission !== "viewer" && (
                                  <div className="addBranch">
                                    <button
                                      className="plainBTN"
                                      onClick={(e) => handleOpen(o._id)}
                                    >
                                      <span>
                                        <img src={plus} alt="" />
                                      </span>
                                      <strong>{t("ADD_NEW_BRANCH")}</strong>
                                    </button>
                                  </div>
                                )}
                              {o.branches &&
                                o.branches.data.length > 0 &&
                                o.branches.metaData ? (
                                <PaginationHelper
                                  itemClick={(j) =>
                                    handleBranchPagination(j, o._id)
                                  }
                                  activeItem={(j) =>
                                    parseInt(
                                      o.branches?.metaData?.currentPage
                                    ) === j
                                  }
                                  prev={() => {
                                    handleBranchPagination(
                                      parseInt(
                                        o.branches?.metaData?.currentPage
                                      ) - 1,
                                      o._id
                                    );
                                  }}
                                  next={() =>
                                    handleBranchPagination(
                                      parseInt(
                                        o.branches.metaData.currentPage
                                      ) + 1,
                                      o._id
                                    )
                                  }
                                  items={o.branches?.metaData?.totalPage}
                                  prevDisabled={
                                    parseInt(
                                      o.branches?.metaData?.currentPage
                                    ) === 1
                                  }
                                  nextDisabled={
                                    parseInt(
                                      o.branches?.metaData?.currentPage
                                    ) === o.branches?.metaData?.totalPage
                                  }
                                  first_page={() =>
                                    handleBranchPagination(
                                      parseInt(
                                        o.branches?.metaData?.currentPage
                                      ) === 1,
                                      o._id
                                    )
                                  }
                                  last_page={() =>
                                    handleBranchPagination(
                                      parseInt(o.branches?.metaData?.totalPage),
                                      o._id
                                    )
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {userProfile && userProfile.permission !== "viewer" && (
                    <div className="addBranch">
                      <button
                        className="plainBTN"
                        onClick={() => setIsEditMode(true)}
                      >
                        <span>
                          <img src={plus} alt="" />
                        </span>
                        <strong>{t("ADD_NEW_BRAND")}</strong>
                      </button>
                    </div>
                  )}

                  <PaginationHelper
                    itemClick={(o) => handleBrandPagination(o)}
                    activeItem={(o) => parseInt(pagination.currentPage) === o}
                    prev={() => {
                      handleBrandPagination(
                        parseInt(pagination.currentPage) - 1
                      );
                    }}
                    next={() =>
                      handleBrandPagination(
                        parseInt(pagination.currentPage) + 1
                      )
                    }
                    items={pagination.totalPages}
                    prevDisabled={parseInt(pagination.currentPage) === 1}
                    nextDisabled={
                      parseInt(pagination.currentPage) === pagination.totalPages
                    }
                    first_page={() =>
                      handleBrandPagination(
                        parseInt(pagination.currentPage) === 1
                      )
                    }
                    last_page={() =>
                      handleBrandPagination(parseInt(pagination.totalPages))
                    }
                  />
                </div>
              </>
            ) : (
              <div className="noBrands">
                <img src={noBrands} alt="" />
                <h2 className="brands-text">{t("NO_BRANDS")}</h2>
                {userProfile && userProfile.permission !== "viewer" && (
                  <Button
                    onClick={() => setIsEditMode(true)}
                    className="brandsButton"
                  >
                    {t("ADD_NEW_BRAND")}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <BrandsAddModal
        show={isEditMode}
        setIsShow={(flag) => setIsEditMode(flag)}
      />
      <BranchAddModal
        show={isOpen}
        setIsShow={(flag) => setIsOpen(flag)}
        selectBrandId={brandId}
      />
      {disableModal && (
        <DisableBrandModal
          show={disableModal}
          setIsShow={(flag) => setDisableModal(flag)}
          brandDisable={brandDisable}
        />
      )}
      {disableBranchModal && (
        <DisableBranchModal
          show={disableBranchModal}
          setIsShow={(flag) => setDisableBranchModal(flag)}
          branchDisable={branchDisable}
        />
      )}
    </>
  );
};

export default Brand;
