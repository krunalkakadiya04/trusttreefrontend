import React, { useEffect, useState } from "react";
import "../../templates/menu/Dashbord.css";
import { useDispatch, useSelector } from "react-redux";
import { getSelectUserToUpdate, getUsers } from "../../middlewares/users";
import { dateAndTimeFormat } from "../../helpers/dateFormat";
import { Button, Dropdown, Form } from "react-bootstrap";
import UserModal from "./UserModal";
import UpdateModal from "./UpdateModal";
import ellipsis from "../../assets/images/Ellipsis.svg";
import { useTranslation } from "react-i18next";
import PlaceholderLoader from "./PlaceholderLoader";
import { sendInviteAgain } from "../../middlewares/auth";
import ToastService from "../../helpers/toast-services";
import { resetInivationMessage } from "../../slices/auth.slice";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import trash from "../../assets/images/trash.svg";
import DeleteModal from "./DeleteModal";
import DisableModal from "./DisableModal";
import Avatar from "react-avatar";
import disableButton from "../../assets/images/disable.svg";
import enableButton from "../../assets/images/enable.svg";
import PaginationHelper from "../../helpers/Pagination";
import searchImg from '../../assets/images/search.svg'
import smsTracking from '../../assets/images/sms-tracking.svg'
import Edit from '../../assets/images/brand-edit.svg'
import plus from '../../assets/images/Plus.svg'

const UserList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [userDelete, setUserDelete] = useState();
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("");
  const [sort, setSort] = useState([
    { key: "name", column: "name", name: "Name", order: -1, activeSort: true },
    {
      key: "email",
      column: "email",
      name: "Email",
      order: -1,
      activeSort: false,
    },
    {
      key: "permission",
      column: "permission",
      name: "Permission",
      order: -1,
      activeSort: false,
    },
    {
      key: "last_login",
      column: "last_login",
      name: "Last Login",
      order: -1,
      activeSort: false,
    },
  ]);
  const [search, setSearch] = useState("");
  const {
    users,
    singleUser,
    saveUpdateMessage,
    saveMessage,
    loading,
    deleteUserLoading,
    deleteUserMessage,
    disableUserLoading,
    disableUserMessage,
    pagination,
    userProfile
  } = useSelector((state) => state.user)

  const { ivitationLoading, invitationMessage } = useSelector(
    (state) => state.auth
  );

  const perpage = 25;
  const currentPageNumber = 1;

  useEffect(() => {
    setCurrentPage(parseInt(pagination && pagination.CurrentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    if (!deleteUserLoading) {
      if (deleteUserMessage) {
        ToastService.success(deleteUserMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUserMessage]);

  useEffect(() => {
    if (!disableUserLoading) {
      if (disableUserMessage) {
        ToastService.success(disableUserMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableUserMessage]);

  useEffect(() => {
    if (!ivitationLoading) {
      if (invitationMessage) {
        ToastService.success(invitationMessage);
        dispatch(resetInivationMessage(null));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationMessage]);

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      perPage: perpage,
      currentPage: currentPageNumber,
      sort: sortObj,
      search: search,
    };
    dispatch(getUsers(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveMessage, saveUpdateMessage, deleteUserMessage, disableUserMessage]);

  useEffect(() => {
    if (!loading && initialLoading && users) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleOpen = (e) => {
    const id = e;
    dispatch(getSelectUserToUpdate(id));
    setIsOpen(true);
  };

  const handleClick = (e) => {
    const user_id = e.target.id;
    dispatch(sendInviteAgain(user_id));
  };

  const handleDelete = (e) => {
    setUserDelete(e);
    setDeleteModal(true);
  };

  const handleDisable = (e) => {
    setUserDelete(e);
    setDisableModal(true);
  };

  const handlePagination = (e) => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      perPage: perpage,
      currentPage: e,
      sort: sortObj,
      search: search,
    };
    dispatch(getUsers(payload));
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
      perPage: perpage,
      currentPage: currentPage,
      sort: sortObj,
      search: search,
    };
    dispatch(getUsers(payload));
  };

  const handleSubmit = (values) => {
    setSearch(values.filterUser);
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      search: values.filterUser,
      perPage: perpage,
      currentPage: currentPageNumber,
      sort: sortObj,
    };
    dispatch(getUsers(payload));
  };

  const formik = useFormik({
    initialValues: {
      filterUser: "",
    },
    onSubmit: handleSubmit,
  });

  const handleSearch = (e) => {
    formik.handleChange(e);
    setSearch(e.target.value);
  };

  useEffect(() => {
    const sortObj = sort.find((o) => o.activeSort === true);
    const payload = {
      perPage: perpage,
      currentPage: currentPageNumber,
      sort: sortObj,
      search: search,
      filter: formik.values.filter,
    };
    dispatch(getUsers(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, formik.values.filter]);

  return (
    <>
      <Form>
        <div className="contentWrap">
          <div className="row equalHeight">
            <div className="col-12">
              <div className="contentHead"><h1>{t("Users")}</h1></div>
              <div className="">
                {/* <h1>{t("Users")}</h1> */}
                <div className="feedbackSearch branches-inner mb-4">
                  <div className="inputWrap">
                    <button>
                      <span className="search-icon">
                        <img src={searchImg} alt="searchImg" />
                      </span>
                    </button>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder={t("SEARCH_BY_NAME_OR_EMAIL")}
                      name="filterUser"
                      value={formik.values.filterUser}
                      onChange={(e) => handleSearch(e)}
                    />
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
                      {loading && initialLoading ? (
                        <tr>
                          <td colSpan={5}>
                            <PlaceholderLoader />
                          </td>
                        </tr>
                      ) : (
                        <>
                          {users && users.length > 0 ? (
                            users.map((o, index) => {
                              return (
                                <tr key={index} id={o._id}>
                                  <td
                                    className={
                                      o.user_status === "de-activated"
                                        ? "disable-row"
                                        : ""
                                    }
                                  >
                                    <div className="staffProfile">
                                      <span className="staff-img">
                                        {o.profile_pic === null ? (
                                          <>
                                            <Avatar name={o.name} size="35px" />
                                          </>
                                        ) : (
                                          <img
                                            src={
                                              `${process.env.REACT_APP_BASE_URL}${o.profile_pic}` ||
                                              require("../../assets/images/noProfile.webp")
                                            }
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                                            }}
                                            alt="profile of staff"
                                          />
                                        )}
                                      </span>
                                      <p>{o.name}</p>
                                    </div>
                                  </td>
                                  <td
                                    className={
                                      o.user_status === "de-activated"
                                        ? "disable-row"
                                        : ""
                                    }
                                  >
                                    <p>{o.email}</p>
                                  </td>
                                  <td
                                    className={
                                      o.user_status === "de-activated"
                                        ? "disable-row"
                                        : ""
                                    }
                                  >
                                    <p>{capitalizeFirstLetter(o.permission)}</p>
                                  </td>
                                  <td
                                    className={
                                      o.user_status === "de-activated"
                                        ? "disable-row"
                                        : ""
                                    }
                                  >
                                    {o.password ? (
                                      <p>
                                        {o.last_login !== null
                                          ? dateAndTimeFormat(o.last_login)
                                          : "null"}
                                      </p>
                                    ) : (
                                      <Button
                                        id={o._id}
                                        className="resend-invitation user-listing"
                                        onClick={(e) => {
                                          o.user_status === "de-activated"
                                            ? e.stopPropagation()
                                            : handleClick(e);
                                        }}
                                      >
                                        <span>
                                          <img src={smsTracking} alt="smsTracking" />
                                        </span>
                                        {t("RESEND_INVITATION")}
                                      </Button>
                                    )}
                                  </td>
                                  <td
                                    className={
                                      o.user_status === "de-activated"
                                        ? "disable-row"
                                        : ""
                                    }
                                  >
                                    {userProfile &&
                                      (userProfile.permission !== o.permission) && (
                                        <>
                                          {o.permission !== "owner" && (

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
                                                        onClick={() =>
                                                          handleDisable(o)
                                                        }
                                                      >
                                                        <span>
                                                          {o.user_status ===
                                                            "de-activated" ? (
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
                                                        </span>
                                                        {o.user_status ===
                                                          "de-activated"
                                                          ? t("ENABLE") : t("DISABLE")}
                                                      </Dropdown.Item>
                                                    </li>
                                                    <li>
                                                      <Dropdown.Item
                                                        onClick={() =>
                                                          handleOpen(o._id)
                                                        }
                                                      >
                                                        <span id={o._id}>
                                                          <img src={Edit} alt="Edit" />
                                                        </span>
                                                        {t("EDIT")}
                                                      </Dropdown.Item>
                                                    </li>
                                                    {userProfile &&
                                                      (userProfile.permission ===
                                                        "master" ||
                                                        userProfile.permission ===
                                                        "owner") && (
                                                        <li>
                                                          <Dropdown.Item
                                                            onClick={() =>
                                                              handleDelete(o)
                                                            }
                                                          >
                                                            <img
                                                              src={trash}
                                                              alt="trash"
                                                            />
                                                            <span className="del">
                                                              {t("DELETE")}
                                                            </span>
                                                          </Dropdown.Item>
                                                        </li>
                                                      )}
                                                  </ul>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            </div>

                                          )}
                                        </>
                                      )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={5}>{t("NO_USER_FOUND")}</td>
                            </tr>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="user-add add-new-user d-flex justify-content-between">
              {userProfile &&
                (userProfile.permission === "master" ||
                  userProfile.permission === "owner") && (
                  <div>
                    <button
                      type="button"
                      className="user-btn"
                      onClick={() => setIsEditMode(true)}
                    >
                      <span className="user-icon">
                        <img src={plus} alt="plus" />
                      </span>
                      {t("ADD_NEW_USER")}
                    </button>
                  </div>
                )}
              <div>
                {pagination &&
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
                      parseInt(pagination.CurrentPage) ===
                      pagination.TotalPages
                    }
                    first_page={() =>
                      handlePagination(parseInt(pagination.CurrentPage) === 1)
                    }
                    last_page={() => handlePagination(pagination.TotalPages)}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </Form>
      <UserModal
        show={isEditMode}
        setIsShow={(flag) => setIsEditMode(flag)}
        userProfile={userProfile}
      />
      {singleUser && singleUser !== null && (
        <UpdateModal
          show={isOpen}
          setIsShow={(flag) => setIsOpen(flag)}
          userProfile={userProfile}
        />
      )}
      {deleteModal && (
        <DeleteModal
          show={deleteModal}
          setIsShow={(flag) => setDeleteModal(flag)}
          userDelete={userDelete}
        />
      )}
      {disableModal && (
        <DisableModal
          show={disableModal}
          setIsShow={(flag) => setDisableModal(flag)}
          userDelete={userDelete}
        />
      )}
    </>
  );
};

export default UserList;
