import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import expImg from "../../../../assets/images/exp-img.png";
import {
  getOneStaffMemberToUpdate,
  getStaffMembers,
} from "../../../../middlewares/staffMembers";
import StaffMembersModal from "./StaffMembersModal";
import ellipsis from "../../../../assets/images/Ellipsis.svg";
import {
  Button,
  Dropdown,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import filter from "../../../../assets/images/Filter.svg";
import StaffFilter from "./StaffFilter";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import trash from "../../../../assets/images/trash.svg";
import ToastService from "../../../../helpers/toast-services";
import DeleteModal from "./DeleteModal";
import DisableModal from "./DisableModal";
import { useTranslation } from "react-i18next";
import disableButton from "../../../../assets/images/disable.svg";
import enableButton from "../../../../assets/images/enable.svg";
import StarRatings from "react-star-ratings";
import PaginationHelper from "../../../../helpers/Pagination";
import Avatar from "react-avatar";
import searchImg from "../../../../assets/images/search.svg";
import brandEdit from "../../../../assets/images/brand-edit.svg";
import plus from "../../../../assets/images/Plus.svg";

const Staff = (props) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const perpage = 25;
  const currentPageNumber = 1;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isStaffModal, setIsStaffModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [staffDelete, setStaffDelete] = useState();
  const [isSearch, setIsSearch] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [isLanguage, setIsLanguage] = useState([]);
  const {
    staffMembers,
    saveMessage,
    saveStaffMessage,
    languages,
    deleteMessage,
    deleteLoading,
    pagination,
    disableLoading,
    disableMessage,
    appliedFiltersCount,
  } = useSelector((state) => state.staff);
  const { userProfile } = useSelector((state) => state.user);
  const { AllLanguages } = useSelector((state) => state.brand);
  const [sort, setSort] = useState([
    { key: "name", column: "name", name: "Name", order: -1, activeSort: true },
    {
      key: "rating",
      column: "rating",
      name: "Rating",
      order: -1,
      activeSort: false,
    },
    {
      key: "branch",
      column: "branch",
      name: "Branch",
      order: -1,
      activeSort: false,
    },
    {
      key: "experience_type",
      column: "experience_type",
      name: "EXPERIENCE_TYPE",
      order: -1,
      activeSort: false,
    },
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

  useEffect(() => {
    if (!disableLoading) {
      if (disableMessage) {
        ToastService.success(disableMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableMessage]);

  useEffect(() => {
    if (pagination) setCurrentPage(parseInt(pagination.CurrentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: perpage,
      current_page: currentPageNumber,
      sort: sortObj,
      experience_key:
        formik.values.filter[0] && formik.values.filter[0].expirence_type,
      branch_id: formik.values.filter[0] && formik.values.filter[0].branches,
      rating: formik.values.filter[0] && formik.values.filter[0].rating,
      date:
        formik.values.filter !== "" &&
        formik.values.filter[0] &&
        formik.values.filter[0].date &&
        formik.values.filter[0].date.start !== "false" &&
        formik.values.filter[0].date,
      status: formik.values.filter[0] && formik.values.filter[0].status,
    };
    if (props.selectBrand !== "") {
      dispatch(getStaffMembers(payload, props.selectBrand));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter,
    props.selectBrand,
    saveMessage,
    saveStaffMessage,
    deleteMessage,
    disableMessage,
  ]);

  useEffect(() => {
    if (!deleteLoading) {
      if (deleteMessage) {
        ToastService.success(deleteMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMessage]);

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

  const handleOpenModal = (e) => {
    const selectId = e.target.id;
    dispatch(getOneStaffMemberToUpdate(selectId));
    setIsEditMode(true);
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

  const handleSearch = debounce(function (e) {
    setIsSearch(e.target.value);
    // dispatch(getBranchesListing(payload));
  }, 1000);

  const handleDelete = (e) => {
    setStaffDelete(e);
    setDeleteModal(true);
  };

  const handleDisable = (e) => {
    setStaffDelete(e);
    setDisableModal(true);
  };

  const formik = useFormik({
    initialValues: {
      search: "",
      filter: "",
    },
    // onSubmit: handleSubmit,
  });

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: perpage,
      current_page: currentPageNumber,
      sort: sortObj,
      search: isSearch,
      experience_key:
        formik.values.filter[0] && formik.values.filter[0].expirence_type,
      branch_id: formik.values.filter[0] && formik.values.filter[0].branches,
      rating: formik.values.filter[0] && formik.values.filter[0].rating,
      date:
        formik.values.filter !== "" &&
        formik.values.filter[0] &&
        formik.values.filter[0].date &&
        formik.values.filter[0].date.start !== "false" &&
        formik.values.filter[0].date,
      status: formik.values.filter[0] && formik.values.filter[0].status,
    };
    dispatch(getStaffMembers(payload, props.selectBrand));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch, formik.values.filter]);

  const handlePagination = (e) => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      per_page: perpage,
      current_page: e,
      sort: sortObj,
      search: isSearch,
      experience_key:
        formik.values.filter[0] && formik.values.filter[0].expirence_type,
      branch_id: formik.values.filter[0] && formik.values.filter[0].branches,
      rating: formik.values.filter[0] && formik.values.filter[0].rating,
      date:
        formik.values.filter !== "" &&
        formik.values.filter[0] &&
        formik.values.filter[0].date &&
        formik.values.filter[0].date.start !== "false" &&
        formik.values.filter[0].date,
      status: formik.values.filter[0] && formik.values.filter[0].status,
    };
    dispatch(getStaffMembers(payload, props.selectBrand));
  };

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
      per_page: perpage,
      current_page: currentPage,
      sort: sortObj,
      search: isSearch,
      experience_key:
        formik.values.filter[0] && formik.values.filter[0].expirence_type,
      branch_id: formik.values.filter[0] && formik.values.filter[0].branches,
      rating: formik.values.filter[0] && formik.values.filter[0].rating,
      date:
        formik.values.filter !== "" &&
        formik.values.filter[0] &&
        formik.values.filter[0].date &&
        formik.values.filter[0].date.start !== "false" &&
        formik.values.filter[0].date,
      status: formik.values.filter[0] && formik.values.filter[0].status,
    };
    dispatch(getStaffMembers(payload, props.selectBrand));
  };

  return (
    <>
      {(staffMembers && staffMembers.length > 0) ||
      isSearch !== "" ||
      formik.values.filter !== "" ? (
        <>
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
                  placeholder={t("SEARCH_BY_NAME")}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="brandFilter  filter-inner">
              <button
                className="btn btn-outline-primary w-100 filter-btn"
                onClick={() => setIsStaffModal(!isStaffModal)}
              >
                <span></span>{" "}
                <strong className="d-flex">
                  {t("FILTER")}{" "}
                  {appliedFiltersCount !== 0 && (
                    <div className="dropdown-badge">{appliedFiltersCount}</div>
                  )}
                </strong>
              </button>
            </div>
            <div ref={ref}>
              {isStaffModal && (
                <StaffFilter
                  b_id={props.selectBrand}
                  setFieldValue={formik.setFieldValue}
                  close={() => setIsStaffModal(!isStaffModal)}
                />
              )}
            </div>
          </div>
          <div className="categoriesRatingBox stab-table">
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
                            <FontAwesomeIcon key={index} icon={`angle-up`} />
                          ) : (
                            <FontAwesomeIcon key={index} icon={`angle-down`} />
                          )}
                        </span>
                      </th>
                    ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {staffMembers && staffMembers.length > 0 ? (
                  staffMembers.map((o) => (
                    <tr key={o._id}>
                      <td
                        className={
                          o.is_disabled
                            ? "disable-row b-bottom-1px"
                            : "b-bottom-1px"
                        }
                      >
                        <div className="staffProfile">
                          <span className="staff-img">
                            {o.profile_pic ? (
                              <img
                                src={
                                  `${process.env.REACT_APP_BASE_URL}${o.profile_pic}` ||
                                  require("../../../../assets/images/noProfile.webp")
                                }
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                                }}
                                alt="profile-pic"
                              />
                            ) : (
                              <Avatar
                                name={
                                  o.name[t("language")]
                                    ? o.name[t("language")]
                                    : o.name[t("en")]
                                }
                                size="35px"
                                key={o._id}
                              />
                            )}
                            {/* <img src={`${process.env.REACT_APP_BASE_URL}${o.profile_pic}`} alt="" /> */}
                          </span>
                          <p>
                            {o.name[t("language")]
                              ? o.name[t("language")]
                              : o.name[t("en")]}
                          </p>
                        </div>
                      </td>
                      <td
                        className={
                          o.is_disabled
                            ? "disable-row b-bottom-1px"
                            : "b-bottom-1px"
                        }
                      >
                        <div className="ratingsWrap">
                          <div className="ratingsText">
                            {" "}
                            {o.rating_avg}{" "}
                            <span
                              style={{ color: " #909090", marginLeft: "3px" }}
                            >
                              ({Object.keys(o.rating).length})
                            </span>{" "}
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
                        className={
                          o.is_disabled
                            ? "disable-row b-bottom-1px"
                            : "b-bottom-1px"
                        }
                      >
                        <div className="flex center">
                          <li>
                            {o.branches && o.branches.length === 1 ? (
                              <span>{o.branches && o.branches[0].name}</span>
                            ) : (
                              <p>{o.branches && o.branches[0].name}</p>
                            )}
                          </li>
                          {o.branches.length > 1 && (
                            <OverlayTrigger
                              placement="bottom"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  {o.branches &&
                                    o.branches.map((obj) => (
                                      <li key={obj._id}>{obj.name}</li>
                                    ))}
                                </Tooltip>
                              }
                            >
                              <li className="settlement-24">
                                +{Object.keys(o.branches).length - 1}
                              </li>
                            </OverlayTrigger>
                          )}
                        </div>
                      </td>
                      <td
                        className={
                          o.is_disabled
                            ? "disable-row b-bottom-1px"
                            : "b-bottom-1px"
                        }
                      >
                        <div className="flex center">
                          <li>
                            {o.experience_type &&
                            o.experience_type.length === 1 ? (
                              <span>
                                {o.experience_type &&
                                  o.experience_type[0]?.title}
                              </span>
                            ) : (
                              <p>
                                {o.experience_type &&
                                  o.experience_type[0]?.title}
                              </p>
                            )}
                          </li>
                          {o.experience_type.length > 1 && (
                            <OverlayTrigger
                              placement="bottom"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  {o.experience_type &&
                                    o.experience_type.map((obj) => (
                                      <li key={obj._id}>{obj.title}</li>
                                    ))}
                                </Tooltip>
                              }
                            >
                              <li className="settlement-24">
                                +{Object.keys(o.experience_type).length - 1}
                              </li>
                            </OverlayTrigger>
                          )}
                        </div>
                      </td>
                      {userProfile && userProfile.permission !== "viewer" && (
                        <td
                          className={
                            o.is_disabled
                              ? "disable-row b-bottom-1px"
                              : "b-bottom-1px"
                          }
                        >
                          <li>
                            <div className="edit-exper  sidebar-dropdown user-dropdown">
                              <ul>
                                <Dropdown className="dis-dropdown">
                                  <Dropdown.Toggle>
                                    <img src={ellipsis} alt="loadding" />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <ul>
                                      <li>
                                        <Dropdown.Item
                                          onClick={() => handleDisable(o)}
                                        >
                                          {o.is_disabled ? (
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
                                          {o.is_disabled
                                            ? t("ENABLE")
                                            : t("DISABLE")}
                                        </Dropdown.Item>
                                      </li>
                                      <li>
                                        <Dropdown.Item
                                          id={o._id}
                                          onClick={(e) => handleOpenModal(e)}
                                        >
                                          <img
                                            src={brandEdit}
                                            alt="brand-edit"
                                            id={o._id}
                                          />
                                          {t("EDIT")}
                                        </Dropdown.Item>
                                      </li>
                                      <li>
                                        <Dropdown.Item
                                          onClick={() => handleDelete(o)}
                                        >
                                          <img src={trash} alt="trash" />
                                          <span className="del">
                                            {t("DELETE")}
                                          </span>
                                        </Dropdown.Item>
                                      </li>
                                    </ul>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </ul>
                            </div>
                          </li>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>{t("NO_DATA_FOUND")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            {userProfile && userProfile.permission !== "viewer" && (
              <button
                type="button"
                className="user-btn"
                onClick={() => setIsEditMode(true)}
              >
                <span className="user-icon">
                  <img src={plus} alt="plus" />
                </span>
                {t("ADD_NEW_STAFF_MEMBER")}
              </button>
            )}
            <div>
              <PaginationHelper
                itemClick={(o) => handlePagination(o)}
                activeItem={(o) => parseInt(pagination.CurrentPage) === o}
                prev={() => {
                  handlePagination(parseInt(pagination.CurrentPage) - 1);
                }}
                next={() =>
                  handlePagination(parseInt(pagination.CurrentPage) + 1)
                }
                items={pagination.TotalPages}
                prevDisabled={parseInt(pagination.CurrentPage) === 1}
                nextDisabled={
                  parseInt(pagination.CurrentPage) === pagination.TotalPages
                }
                first_page={() =>
                  handlePagination(parseInt(pagination.CurrentPage) === 1)
                }
                last_page={() => handlePagination(pagination.TotalPages)}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="experience-wpr flex">
          <div className="experience-inner">
            <img src={expImg} alt="loadding" />
            <p>There is No Staff Members Yet</p>
            <div className="exper-btn">
              <Button
                type="button"
                className=""
                onClick={() => setIsEditMode(true)}
              >
                Add New Staff Members
              </Button>
            </div>
          </div>
        </div>
      )}
      <StaffMembersModal
        show={isEditMode}
        setIsShow={(flag) => setIsEditMode(flag)}
        b_id={props.selectBrand}
        languages={isLanguage}
      />
      {deleteModal && (
        <DeleteModal
          show={deleteModal}
          setIsShow={(flag) => setDeleteModal(flag)}
          staffDelete={staffDelete}
        />
      )}
      {disableModal && (
        <DisableModal
          show={disableModal}
          setIsShow={(flag) => setDisableModal(flag)}
          staffDelete={staffDelete}
        />
      )}
    </>
  );
};

export default Staff;
