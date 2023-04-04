import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../middlewares/users";
import "./profile.scss";
import ROUTE_URLS from "../../config/routes";
import ProfileUpdate from "./ProfileUpdate";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showModal, setIsShowModal] = useState(false);
  const { userProfile, updateLoggedInUserMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLoggedInUserMessage]);

  const handleOpen = () => {
    navigate(ROUTE_URLS.PASSWORD_UPDATE)
  }

  return (
    <>
      {showModal ? (
        <ProfileUpdate
          show={showModal}
          setIsShow={(flag) => setIsShowModal(flag)}
        />
      ) : (
        <div className="contentWrap">
          <div className="contentHead">
            <h1>{t("My Profile")}</h1>
          </div>
          <div className="profile-box">
            <div className="profile-inner">
              <div className="profile">
                <img
                  src={
                    `${process.env.REACT_APP_BASE_URL}${userProfile && userProfile.profile_pic}` ||
                    require("../../assets/images/noProfile.webp")
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }}
                  alt="profile-pic"
                />
              </div>
              <h4 className="profile-name">{userProfile && userProfile.name}</h4>
              <h6>{userProfile && userProfile.email}</h6>
              {userProfile && userProfile.phone_number && <h6>{userProfile.phone_number}</h6>}
              <div className="profile-btn">
                <Button
                  className="btn btn-primary mb-3"
                  onClick={() => setIsShowModal(true)}
                >
                  {t("Edit Data")}
                </Button>
                <Button
                  className="btn btn-outline-secondary"
                  onClick={() => handleOpen()}
                >
                  {t("Change Password")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
