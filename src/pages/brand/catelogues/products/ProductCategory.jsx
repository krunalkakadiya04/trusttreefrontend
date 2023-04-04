import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dropdown,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import CategoriesAddModal from "./CategoriesAddModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCatalogues,
  deleteProduct,
  disableCatalogue,
  disableProduct,
  getCatalogues,
  getOneCategoryToUpdate,
  getOneProductToUpdate,
  getProductSorting,
  updateProductSequence,
} from "../../../../middlewares/productCatalogue";
import noBrands from "../../../../assets/images/noBrands.svg";
import ellipsis from "../../../../assets/images/Ellipsis.svg";
import trash from "../../../../assets/images/trash.svg";
import disableButton from "../../../../assets/images/disable.svg";
import editButton from "../../../../assets/images/brand-edit.svg";
import enableButton from "../../../../assets/images/enable.svg";
import Menu from "../../../../assets/images/menu.svg";
import search from "../../../../assets/images/search.svg";
import ArrowDown from "../../../../assets/images/Arrow-Down.svg";
import ArrowTop from "../../../../assets/images/Arrow-Top.svg";
import circleDownArrow from "../../../../assets/images/circleDownArrow.svg";
import { useTranslation } from "react-i18next";
import startOne from "../../../../assets/images/starOne.svg";
import {
  isCloseAllModal,
  isOpenAllModal,
  isOpenModalById,
} from "../../../../slices/productCatalogue.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import plus from "../../../../assets/images/Plus.svg";
import CatalogueFilter from "../CatalogueFilter";
import ProductsAddModal from "./ProductsAddModal";
import PaginationHelper from "../../../../helpers/Pagination";
import noBranchesFound from "../../../../assets/images/noBrands.svg";
import Avatar from "react-avatar";
import StarRatings from "react-star-ratings";
import PlaceholderLoader from "../../../user-listing/PlaceholderLoader";
import DisableModal from "../../../../components/confirmation-modal/DisableModal";
import DeleteModal from "../../../../components/confirmation-modal/DeleteModal";
import { updateViaQrOrSurveyData } from "../../../../middlewares/brandDesign";

const ProductCategory = (props) => {
  const { t } = useTranslation();
  const ref = useRef(null)
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductFilterModal, setIsProductFilterModal] = useState(false);
  const [isDisableModal, setIsDisableModal] = useState(false);
  const [disableObjTitle, setDisableObjTitle] = useState("");
  const [disableObj, setDisableObj] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteObj, setDeleteObj] = useState(null);
  const [deleteObjTitle, setDeleteObjTitle] = useState("");
  const [isSearch, setIsSearch] = useState("");
  const [isLanguage, setIsLanguage] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    catalogue,
    saveMessage,
    saveUpdateMessage,
    appliedFiltersCount,
    loading,
    pagination,
    filter,
    deleteMessage,
    disableMessage,
    languages,
    disableLoading,
    productDisableLoading,
    productDisableMessage,
    deleteLoading,
    productDeleteLoading,
    productDeleteMessage,
  } = useSelector((state) => state.product);
  const { AllLanguages } = useSelector((state) => state.brand);
  const { userProfile } = useSelector((state) => state.user);
  const [sort, setSort] = useState([
    {
      key: "name",
      column: "product",
      value: "PRODUCT",
      order: -1,
      activeSort: true,
    },
    {
      key: "price",
      column: "price",
      value: "PRICE",
      order: -1,
      activeSort: false,
    },
    {
      key: "description",
      column: "description",
      value: "DESCRIPTION",
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
      value: "BRANCH",
      order: -1,
      activeSort: false,
    },
    {
      key: "experience_type",
      column: "experience_type_id",
      value: "EXPERIENCE_TYPE",
      order: -1,
      activeSort: false,
    },
  ]);

  const perPage = 25;
  const currentPage = 1;
  const brand_id = props.selectBrand;

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      filter: filter,
      per_page: perPage,
      current_page: currentPage,
      search: isSearch,
      sort: sortObj,
    };
    dispatch(getCatalogues(brand_id, payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSearch,
    filter,
    saveMessage,
    brand_id,
    saveUpdateMessage,
    deleteMessage,
    disableMessage,
    productDisableMessage,
    productDeleteMessage,
  ]);

  useEffect(() => {
    if (!loading && initialLoading && catalogue) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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
      setIsProductFilterModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleGetProducts = (brand_id, filterPayload = null) => {
    const sortObjData = {
      key: "sequence",
      column: "sequence",
      value: "PRODUCT",
      order: 1,
      activeSort: true,
    }
    const _filterPayload = {
      search: isSearch,
      catalogue_id: [],
      sort: sortObjData,
      filter: filter,
      per_page: 5,
      current_page: currentPage,
      ...filterPayload,
    };
    dispatch(getProductSorting(_filterPayload, brand_id));
  };

  const handleToggle = (e, openState) => {
    const payload = e.target.id;
    if (!openState) {
      handleGetProducts(brand_id, { catalogue_id: [payload] });
    }
    dispatch(isOpenModalById(payload));
  };

  const handleOpenAll = () => {
    const catIds = catalogue.map((o) => o._id);
    if (catIds && catIds.length) {
      handleGetProducts(brand_id, { catalogue_id: catIds });
    }
    dispatch(isOpenAllModal());
  };

  const handleCloseAll = () => {
    dispatch(isCloseAllModal());
  };

  const formik = useFormik({
    initialValues: {
      via_qr_or_survey_link: false,
      filter: {},
    },
  });

  const handleEditOpen = (e) => {
    const selectId = e;
    dispatch(getOneCategoryToUpdate(selectId));
    setIsEditMode(true);
  };

  const handleSort = (key, cat_id) => {
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
      search: isSearch,
      catalogue_id: cat_id_arr,
      sort: sortObj,
      filter: filter,
      per_page: 5,
      current_page: currentPage,
    };
    dispatch(getProductSorting(payload, brand_id));
  };

  const handlePagination = (e) => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: perPage,
      current_page: e,
      sort: sortObj,
      search: isSearch,
      filter: filter,
    };
    dispatch(getCatalogues(brand_id, payload));
  };

  const handleProductPagination = (e, cat_id) => {
    let cat_id_arr = [cat_id];
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: 5,
      current_page: e,
      sort: sortObj,
      search: isSearch,
      filter: filter,
      catalogue_id: cat_id_arr,
    };
    dispatch(getProductSorting(payload, brand_id));
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
    setIsSearch(e.target.value);
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: perPage,
      current_page: currentPage,
      sort: sortObj,
      search: e.target.value,
      filter: filter,
    };
    dispatch(getCatalogues(brand_id, payload));
  }, 1000);

  const handleOpen = (e) => {
    setCategoryId(e);
    setIsProductModalOpen(true);
  };

  const handleProductModal = (e, i) => {
    dispatch(getOneProductToUpdate(e));
    setIsProductModalOpen(true);
    setCategoryId("");
  };

  const handleDisableModal = (e, title) => {
    setDisableObj(e);
    setDisableObjTitle(title);
    setIsDisableModal(true);
  };

  const handleDisable = (id) => {
    if (disableObjTitle === "PRODUCTS_CATEGORY") {
      dispatch(disableCatalogue(id));
    } else {
      dispatch(disableProduct(id));
    }
  };

  const handleDeleteModal = (e, title) => {
    setDeleteObj(e);
    setDeleteObjTitle(title);
    setIsDeleteModal(true);
  };

  const handleDelete = (id) => {
    if (deleteObjTitle === "PRODUCTS_CATEGORY") {
      dispatch(deleteCatalogues(id));
    } else {
      dispatch(deleteProduct(id));
    }
  };

  const handleQrChange = () => {
    const brand_id = props.selectBrand;

    const payload = {
      qr_status: !props.QRstatus,
      catalogue_type: "product",
    };
    dispatch(updateViaQrOrSurveyData(payload, brand_id));
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
    // e.dataTransfer.clearData()
    // e.dataTransfer.setData("number", e.target.id)
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // e.dataTransfer.effectAllowed = "move"
    // e.dataTransfer.dataTransfer = "move"
  };

  const drop = (pId, catId) => {
    const payload = {
      product_catalogue_id: catId,
      product_id: pId,
      new_sequence: dragOverItem.current
    }
    dispatch(updateProductSequence(payload))
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
                    {(catalogue && catalogue.length > 0) ||
                      isSearch !== "" ||
                      appliedFiltersCount !== 0 ? (
                      <>
                        <div className="lg-Customer1">
                          <div className="staff-wrp flex">
                            <div className="feedbackSearch branches-inner">
                              <div className="inputWrap">
                                <button>
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
                                    setIsProductFilterModal(
                                      !isProductFilterModal
                                    )
                                  }
                                >
                                  <span></span>{" "}
                                  <strong className="d-flex ">
                                    {t("FILTER")}{" "}
                                    {appliedFiltersCount !== 0 && (
                                      <div className="dropdown-badge ">
                                        {appliedFiltersCount}
                                      </div>
                                    )}
                                  </strong>
                                </button>
                              </div>
                              <div ref={ref}>
                                {isProductFilterModal && (
                                  <CatalogueFilter
                                    show={isProductFilterModal}
                                    setIsShow={(flag) =>
                                      setIsProductFilterModal(flag)
                                    }
                                    b_id={props.selectBrand}
                                    setFieldValue={formik.setFieldValue}
                                  />
                                )}
                              </div>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip>{t("EXPAND_ALL")}</Tooltip>}
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
                                overlay={<Tooltip>{t("COLLAPSE_ALL")}</Tooltip>}
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
                            {catalogue && catalogue?.length > 0 ? (
                              catalogue.map((o, index) => {
                                return (
                                  <div
                                    className={`card ${o.is_disable ? "disable-row " : ""
                                      } ${o.isOpen ? "active" : ""}`}
                                    key={index}
                                  >
                                    <div className="card-header">
                                      <h2 className="mb-0">
                                        <div
                                          id={o._id}
                                          className="btn"
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
                                              {(
                                                o.total_rating_catalogue /
                                                o.rating_avg_count
                                              ).toFixed(1)}
                                              <strong id={o._id}>
                                                <img
                                                  src={startOne}
                                                  alt=""
                                                  id={o._id}
                                                />
                                              </strong>
                                            </span>{" "}
                                          </div>
                                          <div
                                            className="brandIcons edit-exper  sidebar-dropdown user-dropdown"
                                            id={o._id}
                                          >
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
                                                              "PRODUCTS_CATEGORY"
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
                                                          onClick={() =>
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
                                                              "PRODUCTS_CATEGORY"
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
                                                {o.product &&
                                                  o.product.length > 0 &&
                                                  o.product[0].name ? (
                                                  o.product.map(
                                                    (obj, index) => (
                                                      <tr key={index}>
                                                        <td
                                                          className={`draggable ${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                          // onDragOver={(e) => e.preventDefault()}
                                                          onDragStart={(e) => dragStart(e, obj.sequence)}
                                                          onDragEnter={(e) => dragEnter(e, obj.sequence)}
                                                          onDragEnd={() => drop(obj._id, o._id)}
                                                          draggable
                                                        >
                                                          <img
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
                                                            <li className="staff-img">
                                                              {obj.logo !==
                                                                null ? (
                                                                <img
                                                                  src={
                                                                    `${process.env.REACT_APP_BASE_URL}${obj.logo}` ||
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
                                                                ]
                                                                  ? obj.name[
                                                                  t(
                                                                    "language"
                                                                  )
                                                                  ]
                                                                  : obj.name[
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
                                                          {obj.for_sale ===
                                                            true ? (
                                                            <p>
                                                              {t(
                                                                "NOT_FOR_SALE"
                                                              )}
                                                            </p>
                                                          ) : (
                                                            <p>
                                                              {` ${obj.price} ${languages?.currency}`}
                                                            </p>
                                                          )}
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
                                                              ]
                                                                ? obj
                                                                  .description[
                                                                t(
                                                                  "language"
                                                                )
                                                                ]
                                                                : obj
                                                                  .description[
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
                                                          <ul className="flex center ">
                                                            <li className="settlement-flex">
                                                              {obj.branches &&
                                                                obj.branches
                                                                  .length > 1 ? (
                                                                <p>
                                                                  {obj.branches &&
                                                                    obj
                                                                      .branches[0]
                                                                      .name}
                                                                </p>
                                                              ) : (
                                                                <span>
                                                                  {obj.branches &&
                                                                    obj
                                                                      .branches[0]
                                                                      .name}
                                                                </span>
                                                              )}
                                                            </li>
                                                            {obj.branches &&
                                                              obj.branches
                                                                .length > 1 && (
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
                                                                    {obj.branches &&
                                                                      obj
                                                                        .branches
                                                                        .length}
                                                                  </li>
                                                                </OverlayTrigger>
                                                              )}
                                                          </ul>
                                                        </td>
                                                        <td
                                                          className={`${obj.is_disable
                                                            ? "disable-row "
                                                            : ""
                                                            }`}
                                                        >
                                                          <ul className="flex center ">
                                                            <li className="settlement-flex">
                                                              {obj.experience_types &&
                                                                obj
                                                                  .experience_types
                                                                  .length > 1 ? (
                                                                <p>
                                                                  {obj.experience_types &&
                                                                    obj
                                                                      .experience_types[0]
                                                                      ?.title}
                                                                </p>
                                                              ) : (
                                                                <span>
                                                                  {obj.experience_types &&
                                                                    obj
                                                                      .experience_types[0]
                                                                      ?.title}
                                                                </span>
                                                              )}
                                                            </li>
                                                            {obj.experience_types &&
                                                              obj
                                                                .experience_types
                                                                .length > 1 && (
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
                                                                            s
                                                                          ) => (
                                                                            <li
                                                                              key={
                                                                                s._id
                                                                              }
                                                                            >
                                                                              {
                                                                                s.title
                                                                              }
                                                                            </li>
                                                                          )
                                                                        )}
                                                                    </Tooltip>
                                                                  }
                                                                >
                                                                  <li className="settlement-24">
                                                                    +
                                                                    {obj.experience_types &&
                                                                      obj
                                                                        .experience_types
                                                                        .length}
                                                                  </li>
                                                                </OverlayTrigger>
                                                              )}
                                                          </ul>
                                                        </td>
                                                        <td
                                                          className={
                                                            obj.is_disable
                                                              ? "disable-row b-bottom-1px"
                                                              : "b-bottom-1px"
                                                          }
                                                        >
                                                          {userProfile &&
                                                            userProfile.permission !==
                                                            "viewer" && (
                                                              <li>
                                                                <div className="edit-exper  sidebar-dropdown user-dropdown">
                                                                  <ul>
                                                                    <Dropdown className="dis-dropdown">
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
                                                                                  "PRODUCT"
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
                                                                              id={
                                                                                obj._id
                                                                              }
                                                                              onClick={() =>
                                                                                handleProductModal(
                                                                                  obj._id,
                                                                                  index
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
                                                                                  "PRODUCT"
                                                                                )
                                                                              }
                                                                            >
                                                                              <img
                                                                                src={
                                                                                  trash
                                                                                }
                                                                                alt="trash"
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
                                                                </div>
                                                              </li>
                                                            )}
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
                                                            src={
                                                              noBranchesFound
                                                            }
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
                                                              "THERE_IS_NO_PRODUCT_YET"
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
                                                      handleOpen(o._id)
                                                    }
                                                  >
                                                    <span>
                                                      <img src={plus} alt="" />
                                                    </span>
                                                    <strong>
                                                      {t("ADD_NEW_PRODUCT")}
                                                    </strong>
                                                  </button>
                                                </div>
                                              )}
                                            {o.productPagination &&
                                              o.productPagination !== null && (
                                                <PaginationHelper
                                                  itemClick={(k) =>
                                                    handleProductPagination(
                                                      k,
                                                      o._id
                                                    )
                                                  }
                                                  activeItem={(k) =>
                                                    parseInt(
                                                      o.productPagination
                                                        .currentPage
                                                    ) === k
                                                  }
                                                  prev={() => {
                                                    handleProductPagination(
                                                      parseInt(
                                                        o.productPagination
                                                          .currentPage
                                                      ) - 1,
                                                      o._id
                                                    );
                                                  }}
                                                  next={() =>
                                                    handleProductPagination(
                                                      parseInt(
                                                        o.productPagination
                                                          .currentPage
                                                      ) + 1,
                                                      o._id
                                                    )
                                                  }
                                                  items={
                                                    o.productPagination
                                                      .totalPage
                                                  }
                                                  prevDisabled={
                                                    parseInt(
                                                      o.productPagination
                                                        .currentPage
                                                    ) === 1
                                                  }
                                                  nextDisabled={
                                                    parseInt(
                                                      o.productPagination
                                                        .currentPage
                                                    ) ===
                                                    o.productPagination
                                                      .totalPage
                                                  }
                                                  first_page={() =>
                                                    handleProductPagination(
                                                      parseInt(
                                                        o.productPagination
                                                          .currentPage
                                                      ) === 1,
                                                      o._id
                                                    )
                                                  }
                                                  last_page={() =>
                                                    handleProductPagination(
                                                      o.productPagination
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
                                {" "}
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
                        <img src={noBrands} alt="" />
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
        <CategoriesAddModal
          show={isEditMode}
          setIsShow={(flag) => setIsEditMode(flag)}
          selectBrand={props.selectBrand}
          languages={isLanguage}
        />
      )}
      {isProductModalOpen && (
        <ProductsAddModal
          show={isProductModalOpen}
          setIsShow={(flag) => setIsProductModalOpen(flag)}
          categoryId={categoryId}
          selectBrand={props.selectBrand}
          languages={isLanguage}
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
          Loading={disableLoading || productDisableLoading}
          Message={disableMessage || productDisableMessage}
        />
      )}
      {isDeleteModal && (
        <DeleteModal
          show={isDeleteModal}
          setIsShow={(flag) => setIsDeleteModal(flag)}
          name={deleteObj?.title || deleteObj?.name}
          title={deleteObjTitle}
          click={() => handleDelete(deleteObj._id)}
          Loading={deleteLoading || productDeleteLoading}
          Message={deleteMessage || productDeleteMessage}
        />
      )}
    </>
  );
};

export default ProductCategory;
