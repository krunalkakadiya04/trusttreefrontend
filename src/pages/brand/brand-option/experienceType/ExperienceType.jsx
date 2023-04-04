import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import expImg from "../../../../assets/images/exp-img.png";
import { deleteExperienceType, disableExperienceType, getExperienceTypeByBrandId, getOneExperienceTypeToUpdate } from "../../../../middlewares/experienceType";
import AddExperienceModal from "./AddExperienceModal";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ellipsis from "../../../../assets/images/Ellipsis.svg";
import trash from "../../../../assets/images/trash.svg";
import disableButton from "../../../../assets/images/disable.svg";
import editButton from "../../../../assets/images/brand-edit.svg";
import enableButton from "../../../../assets/images/enable.svg";
import DeleteModal from "../../../../components/confirmation-modal/DeleteModal";
import DisableModal from "../../../../components/confirmation-modal/DisableModal";
import plus from "../../../../assets/images/Plus.svg";

const ExperienceType = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteObj, setDeleteObj] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteObjTitle, setDeleteObjTitle] = useState("");
  const [isDisableModal, setIsDisableModal] = useState(false);
  const [disableObjTitle, setDisableObjTitle] = useState("");
  const [disableObj, setDisableObj] = useState(null);
  const { experienceTypeData, saveExpMessage, saveExperienceMessage,
    deleteMessage, deleteLoading, disableLoading, disableMessage } = useSelector(
      (state) => state.experience
    );
  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    if (props.selectBrand) {
      dispatch(getExperienceTypeByBrandId(props.selectBrand));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectBrand, saveExpMessage, saveExperienceMessage, deleteMessage, disableMessage])

  const handleEditOpen = (e) => {
    const select_id = e
    dispatch(getOneExperienceTypeToUpdate(select_id))
    setIsEditMode(true)
  }

  const handleDeleteModal = (e, title) => {
    setDeleteObj(e);
    setDeleteObjTitle(title);
    setIsDeleteModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteExperienceType(id));
  }

  const handleDisableModal = (e, title) => {
    setDisableObj(e);
    setDisableObjTitle(title);
    setIsDisableModal(true);
  };

  const handleDisable = (id) => {
    dispatch(disableExperienceType(id));
  };

  return (
    <>
      {experienceTypeData &&
        experienceTypeData.length > 0 ? (
        <div className="experience-wpr-content">
          <div className="experience-inner-content">
            <ul className="exper-ul ">
              {experienceTypeData.map((o) => (
                <li

                  key={o._id}>
                  <div className={`exper-li flex ${o.is_disable
                    ? "customeDisable"
                    : ""
                    }`}>
                    <div className="exper-name">
                      <h6>{o.title}</h6>
                    </div>
                    <div className="brandIcons edit-exper  sidebar-dropdown user-dropdown">
                      {userProfile && userProfile.permission !== "viewer" && (
                        <ul>
                          <Dropdown className="dis-dropdown ">
                            <Dropdown.Toggle>
                              <img src={ellipsis} alt="loadding" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ margin: 0 }}>
                              <li className="exper-drop-ul-li">
                                <Dropdown.Item
                                  onClick={() => handleDisableModal(o, "EXPERIENCE_TYPE")}
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
                                  {o.is_disable ? t("ENABLE") : t("DISABLE")}
                                </Dropdown.Item>
                              </li>
                              <li className="exper-drop-ul-li">
                                <Dropdown.Item
                                  onClick={() => handleEditOpen(o._id)}
                                >
                                  <img src={editButton} alt="edit" />
                                  {t("EDIT")}
                                </Dropdown.Item>
                              </li>
                              <li className="exper-drop-ul-li">
                                <Dropdown.Item
                                  onClick={() => handleDeleteModal(o, "EXPERIENCE_TYPE")}
                                >
                                  <img src={trash} alt="edit" />
                                  <span className='del'>{t("DELETE")}</span>
                                </Dropdown.Item>
                              </li>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {userProfile && userProfile.permission !== "viewer" && (
              <div className="add-new-user">
                <Link
                  className="user-btn pr-0"
                  onClick={() => setIsEditMode(true)}
                >
                  <span className="user-icon">
                    <img src={plus} alt="" />
                  </span>
                  {t("ADD_NEW_EXPERIENCE_TYPE")}
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="experience-wpr flex">
          <div className="experience-inner">
            <img src={expImg} alt="loadding" />
            <p>{t("THERE_IS_NO_EXPERIENECE_TYPE_YET")}</p>
            <div className="exper-btn">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsEditMode(true)}
              >
                {t("ADD_NEW_EXPERIENCE_TYPE")}
              </button>
            </div>
          </div>
        </div>
      )}
      <AddExperienceModal
        show={isEditMode}
        setIsShow={(flag) => setIsEditMode(flag)}
        b_id={props.selectBrand}
      />
      {isDeleteModal && (
        <DeleteModal
          show={isDeleteModal}
          setIsShow={(flag) => setIsDeleteModal(flag)}
          name={deleteObj?.title || deleteObj?.name}
          title={deleteObjTitle}
          click={() => handleDelete(deleteObj._id)}
          Loading={deleteLoading}
          Message={deleteMessage}
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
          Loading={disableLoading}
          Message={disableMessage}
        />
      )}
    </>
  );
};

export default ExperienceType;
