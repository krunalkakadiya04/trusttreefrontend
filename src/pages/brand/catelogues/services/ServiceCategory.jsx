import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  deleteServiceCategory,
  disableEnableService,
  disableEnableServiceCategory,
  getCatalogues,
  getOneCategoryToUpdate,
  getOneServiceToUpdate,
  getServiceSorting,
  updateServiceSequence,
} from "../../../../middlewares/services";
import noBrands from "../../../../assets/images/noBrands.svg";
import editButton from "../../../../assets/images/brand-edit.svg";
import enableButton from "../../../../assets/images/enable.svg";
import disableButton from "../../../../assets/images/disable.svg";
import trash from "../../../../assets/images/trash.svg";
import search from "../../../../assets/images/search.svg";
import ellipsis from "../../../../assets/images/Ellipsis.svg";
import circleDownArrow from "../../../../assets/images/circleDownArrow.svg";
import ArrowTop from "../../../../assets/images/Arrow-Top.svg";
import startOne from "../../../../assets/images/starOne.svg";
import ArrowDown from "../../../../assets/images/Arrow-Down.svg";
import Menu from "../../../../assets/images/menu.svg";
import plus from "../../../../assets/images/Plus.svg";

import {
  Button,
  Dropdown,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  isCloseAllModal,
  isOpenAllModal,
  isOpenModalById,
} from "../../../../slices/services.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import StarRatings from "react-star-ratings";
import ServiceCategoriesAddModal from "./ServiceCategoriesAddModal";
import DisableModal from "../../../../components/confirmation-modal/DisableModal";
import DeleteModal from "../../../../components/confirmation-modal/DeleteModal";
import ServiceAddModal from "./ServiceAddModal";
import PaginationHelper from "../../../../helpers/Pagination";
import CatalogueFilter from "../CatalogueFilter";
import PlaceholderLoader from "../../../user-listing/PlaceholderLoader";
import { updateViaQrOrSurveyData } from "../../../../middlewares/brandDesign";

const ServiceCategory = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ref = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCategoryId, setIsCategoryId] = useState(false);
  const [isServiceEditMode, setIsServiceEditMode] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [isServiceFilter, setIsServiceFilter] = useState(false);
  const [isLanguage, setIsLanguage] = useState([]);
  const [isDisableModal, setIsDisableModal] = useState(false);
  const [disableObjTitle, setDisableObjTitle] = useState("");
  const [disableObj, setDisableObj] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteObjTitle, setDeleteObjTitle] = useState("");
  const [deleteObj, setDeleteObj] = useState(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const perPage = 25;
  const currentPage = 1;
  const {
    catalogue,
    saveMessage,
    languages,
    loading,
    disableCategoryLoading,
    disableCategoryMessage,
    disableServiceLoading,
    disableServiceMessage,
    deleteServiceLoading,
    deleteServiceMessage,
    deleteCategoryLoading,
    deleteCategoryMessage,
    saveUpdateMessage,
    appliedFiltersCount,
    filter,
    pagination,
  } = useSelector((state) => state.service);
  const { AllLanguages } = useSelector((state) => state.brand);
  const { userProfile } = useSelector((state) => state.user);

  const [sort, setSort] = useState([
    {
      key: "name",
      column: "name",
      value: "Service",
      order: -1,
      activeSort: true,
    },
    {
      key: "price",
      column: "price",
      value: "Price",
      order: -1,
      activeSort: false,
    },
    {
      key: "description",
      column: "description",
      value: "Description",
      order: -1,
      activeSort: false,
    },
    {
      key: "rating",
      column: "rating",
      value: "Rating",
      order: -1,
      activeSort: false,
    },
    {
      key: "branch",
      column: "branch",
      value: "Branch",
      order: -1,
      activeSort: false,
    },
    {
      key: "experience_type",
      column: "experience_type",
      value: "Experience Type",
      order: -1,
      activeSort: false,
    },
  ]);

  useEffect(() => {
    if (!loading && initialLoading && catalogue) {
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
      search: searchFilter,
      sort: sortObj,
    };
    const brand_id = props.selectBrand;
    dispatch(getCatalogues(brand_id, payload));
    // dispatch(getServiceCatQrOrSurvey(brand_id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchFilter,
    filter,
    saveMessage,
    disableCategoryMessage,
    disableServiceMessage,
    deleteServiceMessage,
    deleteCategoryMessage,
    saveUpdateMessage,
    props.selectBrand,
  ]);

  useEffect(() => {
    if (
      languages &&
      languages.languages &&
      languages.languages.length !== null
    ) {
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

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsServiceFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleToggle = (e, openState) => {
    const payload = e.target.id;
    const brand_id = props.selectBrand;
    if (!openState) {
      handleGetService(brand_id, { catalogue_id: [payload] });
    }
    dispatch(isOpenModalById(payload));
  };

  const handleDisableModal = (e, title) => {
    setDisableObj(e);
    setDisableObjTitle(title);
    setIsDisableModal(true);
  };
  const handleDisable = (id) => {
    if (disableObjTitle === "SERVICE_CATEGORY") {
      dispatch(disableEnableServiceCategory(id));
    } else {
      dispatch(disableEnableService(id));
    }
  };
  const handleDeleteModal = (e, title) => {
    setDeleteObj(e);
    setDeleteObjTitle(title);
    setIsDeleteModal(true);
  };

  const handleDelete = (id) => {
    if (deleteObjTitle === "SERVICE_CATEGORY") {
      dispatch(deleteServiceCategory(id));
    } else {
      dispatch(deleteService(id));
    }
  };

  const handleGetService = (brand_id, filterPayload = null) => {
    const sortObjData = {
      key: "sequence",
      column: "sequence",
      value: "Service",
      order: 1,
      activeSort: true,
    }
    const _filterPayload = {
      search: searchFilter,
      catalogue_id: [],
      sort: sortObjData,
      filter: filter,
      per_page: 5,
      current_page: currentPage,
      ...filterPayload,
    };
    dispatch(getServiceSorting(brand_id, _filterPayload));
  };

  const handleOpenAll = () => {
    const brand_id = props.selectBrand;
    const catIds = catalogue.map((o) => o._id);
    if (catIds && catIds.length) {
      handleGetService(brand_id, { catalogue_id: catIds });
    }
    dispatch(isOpenAllModal());
  };

  const handleCloseAll = () => {
    dispatch(isCloseAllModal());
  };
  const handleEditOpen = (e) => {
    const selectId = e;
    dispatch(getOneCategoryToUpdate(selectId));
    setIsEditMode(true);
  };

  const handleServiceEditOpen = (e) => {
    dispatch(getOneServiceToUpdate(e));
    setIsServiceEditMode(true);
  };

  const handleAddServiceModal = (e) => {
    setIsCategoryId(e);
    setIsServiceEditMode(true);
  };
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleChange = debounce(function (e) {
    setSearchFilter(e.target.value);
    const sortObj = sort.find((o) => o.activeSort === true);
    const brand_id = props.selectBrand;

    const payload = {
      per_page: perPage,
      current_page: currentPage,
      sort: sortObj,
      search: e.target.value,
      filter: filter,
    };
    dispatch(getCatalogues(brand_id, payload));
  }, 1000);

  const handleSort = (key, cat_id) => {
    const brand_id = props.selectBrand;
    let sortObj = {};
    let cat_id_arr = [cat_id];
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
      catalogue_id: cat_id_arr,
      sort: sortObj,
      filter: filter,
      per_page: 5,
      current_page: currentPage,
    };
    dispatch(getServiceSorting(brand_id, payload));
  };

  const handlePagination = (e) => {
    const brand_id = props.selectBrand;
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: perPage,
      current_page: e,
      sort: sortObj,
      search: searchFilter,
      filter: filter,
    };
    dispatch(getCatalogues(brand_id, payload));
  };

  const handleServicePagination = (e, cat_id) => {
    const brand_id = props.selectBrand;
    let cat_id_arr = [cat_id];
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: 5,
      current_page: e,
      sort: sortObj,
      search: searchFilter,
      filter: filter,
      catalogue_id: cat_id_arr,
    };
    dispatch(getServiceSorting(brand_id, payload));
  };

  const handleQrChange = () => {
    const brand_id = props.selectBrand;

    const payload = {
      qr_status: !props.QRstatus,
      catalogue_type: "service",
    };
    dispatch(updateViaQrOrSurveyData(payload, brand_id));
  };

  const formik = useFormik({
    initialValues: {
      filter: {},
    },
  });

  const dragStart = (e, position) => {
    dragItem.current = position;
    // e.dataTransfer.clearData()
    // e.dataTransfer.setData("number", e.target.id)
    // e.dataTransfer.effectAllowed = "copyMove";
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // e.dataTransfer.effectAllowed = "move"
    // e.dataTransfer.dataTransfer = "move"
    // e.dataTransfer.dropEffect = "copy";
  };

  const drop = (pId, catId) => {
    const payload = {
      service_catalogue_id: catId,
      service_id: pId,
      new_sequence: dragOverItem.current
    }
    dispatch(updateServiceSequence(payload))
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <>
      <div id="tab1" className="tab_content Catalogues-tab-1">
        <div className="Brand-languages experience-wpr-content">
          <div className="Catalogue-container">
            <div className="lg-slider-toggle ">
              <div className="Reward-content">
                {props.QRstatus !== undefined &&
                  <div className="form-control mb-3 mt-3">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={t("VIEW_THE_CATALOGUE_VIA_QR_CODE_OR_SURVEY_LINK")}
                      name="via_qr_or_survey_link"
                      onChange={() => handleQrChange()}
                      value={props.QRstatus}
                      checked={props.QRstatus}
                    />
                  </div>
                }
                {loading && initialLoading ? (
                  <PlaceholderLoader />
                ) : (
                  <>
                    {catalogue?.length > 0 ||
                      searchFilter !== "" ||
                      appliedFiltersCount !== 0 ? (
                      <>
                        <div className="lg-Customer1">
                          <div className="staff-wrp flex">
                            <div className="feedbackSearch branches-inner">
                              <div className="inputWrap">
                                <button>
                                  {" "}
                                  <img src={search} alt="" />{" "}
                                </button>
                                <Form.Control
                                  type="text"
                                  className="form-control padding-input"
                                  placeholder={t("SEARCH_HERE")}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex">
                              <div className="brandFilter filter-inner">
                                <button
                                  className="btn btn-outline-primary w-100 filter-btn"
                                  onClick={() =>
                                    setIsServiceFilter(!isServiceFilter)
                                  }
                                >
                                  <span></span>{" "}
                                  <strong className="d-flex ">
                                    {t("FILTER")}
                                    {appliedFiltersCount !== 0 && (
                                      <div className="dropdown-badge">
                                        {appliedFiltersCount}
                                      </div>
                                    )}
                                  </strong>
                                </button>
                              </div>
                              <div ref={ref}>
                                {isServiceFilter && (
                                  <CatalogueFilter
                                    type={"service"}
                                    show={isServiceFilter}
                                    setIsShow={(flag) => setIsServiceFilter(flag)}
                                    b_id={props.selectBrand}
                                    setFieldValue={formik.setFieldValue}
                                  />
                                )}
                              </div>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    {t("EXPAND_ALL")}
                                  </Tooltip>
                                }
                                popperConfig={{
                                  modifiers: {
                                    preventOverflow: {
                                      enabled: true,
                                    },
                                  },
                                }}
                              >
                                <div
                                  className="down-filter-errow"
                                  onClick={() => handleOpenAll()}
                                >
                                  <span>
                                    <img src={ArrowDown} alt="openAll" />
                                  </span>
                                </div>
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    {t("COLLAPSE_ALL")}
                                  </Tooltip>
                                }
                              >
                                <div
                                  className="up-filter-errow"
                                  onClick={() => handleCloseAll()}
                                >
                                  <span>
                                    <img src={ArrowTop} alt="closeAll" />
                                  </span>
                                </div>
                              </OverlayTrigger>
                            </div>
                          </div>
                          <div
                            className="accordion brandAccordion"
                            id="accordionExample"
                          >
                            {catalogue?.length > 0 ? (
                              catalogue.map((o, index) => {
                                return (
                                  <div
                                    className={`card  ${o.is_disable ? "disable-row " : ""
                                      } ${o.isOpen ? "active" : ""}`}
                                    key={index}
                                  >
                                    <div className="card-header">
                                      <h2 className="mb-0">
                                        <div
                                          className="btn"
                                          id={o._id}
                                          onClick={(e) =>
                                            o.is_disable
                                              ? null
                                              : handleToggle(e, o.isOpen)
                                          }
                                        >
                                          <div
                                            className="brandTitle"
                                            id={o._id}
                                          >
                                            <strong id={o._id}>
                                              {o.title[t("language")]
                                                ? o.title[t("language")]
                                                : o.title[t("en")]}
                                            </strong>
                                          </div>
                                          <div
                                            className="reviewDisplay"
                                            id={o._id}
                                          >
                                            <span id={o._id}>
                                              {parseFloat(
                                                o.total_rating_catalogue
                                              ).toFixed(1)}
                                              <strong id={o._id}>
                                                <img
                                                  src={startOne}
                                                  alt=""
                                                  id={o._id}
                                                />
                                              </strong>
                                            </span>
                                          </div>
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
                                                          onClick={() =>
                                                            handleDisableModal(
                                                              o,
                                                              "SERVICE_CATEGORY"
                                                            )
                                                          }
                                                        >
                                                          {o.is_disable ? (
                                                            <img
                                                              src={enableButton}
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
                                                          {o.is_disable
                                                            ? t("ENABLE")
                                                            : t("DISABLE")}
                                                        </Dropdown.Item>
                                                      </li>
                                                      <li className="exper-drop-ul-li">
                                                        <Dropdown.Item
                                                          onClick={(e) =>
                                                            handleEditOpen(
                                                              o._id
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
                                                      <li className="exper-drop-ul-li">
                                                        <Dropdown.Item
                                                          onClick={() =>
                                                            handleDeleteModal(
                                                              o,
                                                              "SERVICE_CATEGORY"
                                                            )
                                                          }
                                                        >
                                                          <img
                                                            src={trash}
                                                            alt="edit"
                                                          />
                                                          <span className="del">
                                                            {t("DELETE")}
                                                          </span>
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
                                      <div>
                                        <div className="card-body">
                                          <div className="brandTable">
                                            <table className="table">
                                              <thead>
                                                <tr>
                                                  <th></th>
                                                  {sort &&
                                                    sort.map((obj, index) => (
                                                      <th
                                                        key={obj.key}
                                                        className="width260"
                                                      >
                                                        <span
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() =>
                                                            handleSort(
                                                              obj.key,
                                                              o._id
                                                            )
                                                          }
                                                        >
                                                          {obj.value}
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
                                                {o.services &&
                                                  o.services.length &&
                                                  o.services[0].name ? (
                                                  o.services.map(
                                                    (obj, index) => (
                                                      <tr key={index}>
                                                        <td
                                                          className={`draggable ${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                          // onDragOverCapture={(e) => e.preventDefault()}
                                                          onDragStart={(e) => dragStart(e, obj.sequence)}
                                                          onDragEnter={(e) => dragEnter(e, obj.sequence)}
                                                          onDragEnd={(e) => drop(obj._id, o._id)}
                                                          draggable
                                                        >
                                                          <img
                                                            id={obj._id}
                                                            src={Menu}
                                                            alt="menu"
                                                          />
                                                        </td>
                                                        <td
                                                          className={`${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                        >
                                                          <ul className="flex buffalo">
                                                            <li className="buffalo-img">
                                                              {obj.image ? (
                                                                <img
                                                                  src={
                                                                    `${process.env.REACT_APP_BASE_URL}${obj.image}` ||
                                                                    require("../../../../assets/images/noProfile.webp")
                                                                  }
                                                                  onError={(
                                                                    e
                                                                  ) => {
                                                                    e.target.onerror =
                                                                      null;
                                                                    e.target.src =
                                                                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                                                                  }}
                                                                  alt="profile-pic"
                                                                />
                                                              ) : (
                                                                <Avatar
                                                                  name={
                                                                    obj.name[
                                                                      t(
                                                                        "language"
                                                                      )
                                                                    ]
                                                                      ? obj
                                                                        .name[
                                                                      t(
                                                                        "language"
                                                                      )
                                                                      ]
                                                                      : obj
                                                                        .name[
                                                                      t(
                                                                        "en"
                                                                      )
                                                                      ]
                                                                  }
                                                                  size="35px"
                                                                />
                                                              )}
                                                            </li>

                                                            <li className="width px-3 staffProfile">
                                                              <p>
                                                                {" "}
                                                                {obj.name[
                                                                  t("language")
                                                                ] ||
                                                                  obj.name[
                                                                  t("en")
                                                                  ]}
                                                              </p>
                                                            </li>
                                                          </ul>
                                                        </td>
                                                        <td
                                                          className={`${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                        >
                                                          <p>
                                                            {obj.for_sale
                                                              ? t(
                                                                "NOT_FOR_SALE"
                                                              )
                                                              : `${obj.price} ${languages?.currency}`}
                                                          </p>
                                                        </td>
                                                        <td
                                                          className={`${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            } des__Table`}
                                                        >
                                                          <div className="Description-table">
                                                            <p>
                                                              {obj.description[
                                                                t("language")
                                                              ] ||
                                                                obj.description[
                                                                t("en")
                                                                ]}
                                                            </p>
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
                                                                obj.rating_avg
                                                              ).toFixed(2)}{" "}
                                                              <span
                                                                style={{
                                                                  color:
                                                                    " #909090",
                                                                  marginLeft:
                                                                    "3px",
                                                                }}
                                                              >
                                                                ({obj.ratingSum}
                                                                )
                                                              </span>{" "}
                                                            </div>
                                                            <StarRatings
                                                              rating={
                                                                obj.rating_avg
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
                                                          <div className="flex center">
                                                            <li>
                                                              {obj.branches &&
                                                                obj.branches
                                                                  .length ===
                                                                1 ? (
                                                                <span>
                                                                  {obj.branches &&
                                                                    obj
                                                                      .branches[0]
                                                                      ?.name}
                                                                </span>
                                                              ) : (
                                                                <p>
                                                                  {obj.branches &&
                                                                    obj
                                                                      .branches[0]
                                                                      ?.name}
                                                                </p>
                                                              )}
                                                            </li>
                                                            {obj.branches
                                                              ?.length > 1 && (
                                                                <OverlayTrigger
                                                                  placement="bottom"
                                                                  delay={{
                                                                    show: 250,
                                                                    hide: 400,
                                                                  }}
                                                                  overlay={
                                                                    <Tooltip id="button-tooltip-2">
                                                                      {obj.branches &&
                                                                        obj.branches.map(
                                                                          (
                                                                            object
                                                                          ) => (
                                                                            <li
                                                                              key={
                                                                                object._id
                                                                              }
                                                                            >
                                                                              {
                                                                                object.name
                                                                              }
                                                                            </li>
                                                                          )
                                                                        )}
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <li className="settlement-24">
                                                                    +
                                                                    {
                                                                      Object.keys(
                                                                        obj.branch_id
                                                                      ).length
                                                                    }
                                                                  </li>
                                                                </OverlayTrigger>
                                                              )}
                                                          </div>
                                                        </td>
                                                        <td
                                                          className={`${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                        >
                                                          <div className="flex center">
                                                            <li>
                                                              {obj.experience_types &&
                                                                obj
                                                                  .experience_types
                                                                  ?.length ===
                                                                1 ? (
                                                                <span>
                                                                  {obj.experience_types &&
                                                                    obj
                                                                      .experience_types[0]
                                                                      ?.title}
                                                                </span>
                                                              ) : (
                                                                <p>
                                                                  {obj.experience_types &&
                                                                    obj
                                                                      .experience_types[0]
                                                                      ?.title}
                                                                </p>
                                                              )}
                                                            </li>
                                                            {obj
                                                              .experience_types
                                                              ?.length > 1 && (
                                                                <OverlayTrigger
                                                                  placement="bottom"
                                                                  delay={{
                                                                    show: 250,
                                                                    hide: 400,
                                                                  }}
                                                                  overlay={
                                                                    <Tooltip id="button-tooltip-2">
                                                                      {obj.experience_types &&
                                                                        obj.experience_types.map(
                                                                          (
                                                                            object
                                                                          ) => (
                                                                            <li
                                                                              key={
                                                                                object._id
                                                                              }
                                                                            >
                                                                              {
                                                                                object.title
                                                                              }
                                                                            </li>
                                                                          )
                                                                        )}
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <li className="settlement-24">
                                                                    +
                                                                    {obj
                                                                      .experience_type_id
                                                                      .length - 1}
                                                                  </li>
                                                                </OverlayTrigger>
                                                              )}
                                                          </div>
                                                        </td>
                                                        <td
                                                          className={`${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                        >
                                                          <li>
                                                            <div className="edit-exper  sidebar-dropdown user-dropdown">
                                                              {userProfile &&
                                                                userProfile.permission !==
                                                                "viewer" && (
                                                                  <ul>
                                                                    <Dropdown className="dis-dropdown ">
                                                                      <Dropdown.Toggle>
                                                                        <img
                                                                          src={
                                                                            ellipsis
                                                                          }
                                                                          alt="loadding"
                                                                        />
                                                                      </Dropdown.Toggle>
                                                                      <Dropdown.Menu>
                                                                        <ul>
                                                                          <li>
                                                                            <Dropdown.Item
                                                                              onClick={() =>
                                                                                handleDisableModal(
                                                                                  obj,
                                                                                  "SERVICE"
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
                                                                                ? t(
                                                                                  "ENABLE"
                                                                                )
                                                                                : t(
                                                                                  "DISABLE"
                                                                                )}
                                                                            </Dropdown.Item>
                                                                          </li>
                                                                          <li>
                                                                            <Dropdown.Item
                                                                              onClick={(
                                                                                e
                                                                              ) =>
                                                                                handleServiceEditOpen(
                                                                                  obj._id
                                                                                )
                                                                              }
                                                                            >
                                                                              <img
                                                                                src={
                                                                                  editButton
                                                                                }
                                                                                alt="edit"
                                                                              />
                                                                              {t(
                                                                                "EDIT"
                                                                              )}
                                                                            </Dropdown.Item>
                                                                          </li>
                                                                          <li>
                                                                            <Dropdown.Item
                                                                              onClick={() =>
                                                                                handleDeleteModal(
                                                                                  obj,
                                                                                  "SERVICE"
                                                                                )
                                                                              }
                                                                            >
                                                                              <img
                                                                                src={
                                                                                  trash
                                                                                }
                                                                                alt="edit"
                                                                              />
                                                                              <span className="del">
                                                                                {t(
                                                                                  "DELETE"
                                                                                )}
                                                                              </span>
                                                                            </Dropdown.Item>
                                                                          </li>
                                                                        </ul>
                                                                      </Dropdown.Menu>
                                                                    </Dropdown>
                                                                  </ul>
                                                                )}
                                                            </div>
                                                          </li>
                                                        </td>
                                                      </tr>
                                                    )
                                                  )
                                                ) : (
                                                  <tr>
                                                    <td colSpan={9}>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          justifyContent:
                                                            "center",
                                                          marginTop: "10px",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            flexDirection:
                                                              "column",
                                                            alignItems:
                                                              "center",
                                                          }}
                                                        >
                                                          <img
                                                            src={noBrands}
                                                            alt="no Brands"
                                                            style={{
                                                              width: "50%",
                                                            }}
                                                          />
                                                          <div
                                                            style={{
                                                              color: "#909090",
                                                              fontWeight: 500,
                                                              fontSize: "16px",
                                                            }}
                                                          >
                                                            {t(
                                                              "THERE_IS_NO_SERVICE_YET"
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </td>
                                                  </tr>
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
                                              userProfile.permission !==
                                              "viewer" && (
                                                <div className="addBranch">
                                                  <button
                                                    className="plainBTN"
                                                    onClick={(e) =>
                                                      handleAddServiceModal(
                                                        o._id
                                                      )
                                                    }
                                                  >
                                                    <span>
                                                      <img
                                                        src={plus}
                                                        alt="ADD"
                                                      />
                                                    </span>
                                                    <strong>
                                                      {t("ADD_NEW_SERVICE")}
                                                    </strong>
                                                  </button>
                                                </div>
                                              )}
                                            {o.servicePagination &&
                                              o.servicePagination.totalPage !==
                                              null && (
                                                <PaginationHelper
                                                  itemClick={(k) =>
                                                    handleServicePagination(
                                                      k,
                                                      o._id
                                                    )
                                                  }
                                                  activeItem={(k) =>
                                                    parseInt(
                                                      o.servicePagination
                                                        .currentPage
                                                    ) === k
                                                  }
                                                  prev={() => {
                                                    handleServicePagination(
                                                      parseInt(
                                                        o.servicePagination
                                                          .currentPage
                                                      ) - 1,
                                                      o._id
                                                    );
                                                  }}
                                                  next={() =>
                                                    handleServicePagination(
                                                      parseInt(
                                                        o.servicePagination
                                                          .currentPage
                                                      ) + 1,
                                                      o._id
                                                    )
                                                  }
                                                  items={
                                                    o.servicePagination
                                                      .totalPage
                                                  }
                                                  prevDisabled={
                                                    parseInt(
                                                      o.servicePagination
                                                        .currentPage
                                                    ) === 1
                                                  }
                                                  nextDisabled={
                                                    parseInt(
                                                      o.servicePagination
                                                        .currentPage
                                                    ) ===
                                                    o.servicePagination
                                                      .totalPage
                                                  }
                                                  first_page={() =>
                                                    handleServicePagination(
                                                      parseInt(
                                                        o.servicePagination
                                                          .currentPage
                                                      ) === 1,
                                                      o._id
                                                    )
                                                  }
                                                  last_page={() =>
                                                    handleServicePagination(
                                                      o.servicePagination
                                                        .totalPage,
                                                      o._id
                                                    )
                                                  }
                                                />
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <span className="dataFound">
                                {t("NO_DATA_FOUND")}
                              </span>
                            )}
                          </div>
                          <div className="d-flex justify-content-between">
                            {userProfile &&
                              userProfile.permission !== "viewer" && (
                                <button
                                  type="button"
                                  className="user-btn"
                                  onClick={() => setIsEditMode(true)}
                                >
                                  <span className="user-icon">
                                    <img src={plus} alt="ADD" />
                                  </span>
                                  {t("ADD_NEW_CATEGORY")}
                                </button>
                              )}
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
                                  items={pagination.totalPage}
                                  prevDisabled={
                                    parseInt(pagination.currentPage) === 1
                                  }
                                  nextDisabled={
                                    parseInt(pagination.currentPage) ===
                                    pagination.totalPage
                                  }
                                  first_page={() =>
                                    handlePagination(
                                      parseInt(pagination.currentPage) === 1
                                    )
                                  }
                                  last_page={() =>
                                    handlePagination(pagination.totalPage)
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <img src={noBrands} alt="NoBrands" />
                        <h2 className="brands-text justify-content-center">
                          {t("NO_CATEGORIES_HAVE_BEEN_ADDED_TO_THE_LIST")}
                        </h2>
                        {userProfile && userProfile.permission !== "viewer" && (
                          <Button
                            onClick={() => setIsEditMode(true)}
                            className="brandsButton my-0 mx-auto"
                          >
                            {t("ADD_NEW_CATEGORY")}
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditMode && (
        <ServiceCategoriesAddModal
          show={isEditMode}
          setIsShow={(flag) => setIsEditMode(flag)}
          selectBrand={props.selectBrand}
          languages={isLanguage}
        />
      )}
      {isServiceEditMode && (
        <ServiceAddModal
          show={isServiceEditMode}
          setIsShow={(flag) => setIsServiceEditMode(flag)}
          selectBrand={props.selectBrand}
          languages={isLanguage}
          categoryId={isCategoryId}
          data={catalogue}
        />
      )}
      {isDisableModal && (
        <DisableModal
          show={isDisableModal}
          setIsShow={(flag) => setIsDisableModal(flag)}
          name={disableObj?.title || disableObj?.name}
          objDisabled={disableObj?.is_disable}
          title={disableObjTitle}
          click={() => handleDisable(disableObj._id)}
          Loading={disableCategoryLoading || disableServiceLoading}
          Message={disableCategoryMessage || disableServiceMessage}
        />
      )}
      {isDeleteModal && (
        <DeleteModal
          show={isDeleteModal}
          setIsShow={(flag) => setIsDeleteModal(flag)}
          name={deleteObj?.title || deleteObj?.name}
          title={deleteObjTitle}
          click={() => handleDelete(deleteObj._id)}
          Loading={deleteCategoryLoading || deleteServiceLoading}
          Message={deleteCategoryMessage || deleteServiceMessage}
        />
      )}
    </>
  );
};

export default ServiceCategory;
