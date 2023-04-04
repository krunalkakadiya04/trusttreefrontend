import React from "react";
import BrandLogo from "./BrandLogo";
import Google from "../../assets/images/Google.svg";
import insta from "../../assets/images/instagram.svg";
import fb from "../../assets/images/facebook.svg";
import { useSelector } from "react-redux";
import backArrow from "../../assets/images/arrowLeft.svg";
import { useTranslation } from "react-i18next";

const SocialMedia = ({ previewData, backClick }) => {
  const { t } = useTranslation();
  const { userProfile } = useSelector((state) => state.user);

  return (
    <div className="paddingApp">
      <div className=" BackArrrow_Btn">
        <div className="navBack">
          <img
            src={backArrow}
            style={{ width: "15px", margin: "12px 10px" }}
            onClick={backClick}
            alt="backArrow"
          />
        </div>
      </div>
      <div className="FollowInfo">
        <div className="BrandFollow">
          <BrandLogo object={previewData} />
          {previewData?.rewards ? (
            <>
              <h6>{t("YOUR_GIFT_SENT_TO_EMAIL")}</h6>
              <h6>{userProfile?.email}</h6>
            </>
          ) : (
            <h6>{t("THANK_YOU")}</h6>
          )}
        </div>
        <ul className="information_Wpr">
          <li>
            {" "}
            <p>
              <strong>{t("DO_US_A_FAVOR")}</strong>
              <br />
              {t("AND_SHARE_YOUR")}
              <strong> {t("STARS")} </strong>
              {t("RATING_ON_GOOGLE")}
            </p>
          </li>
          <li className="reviweLeave">
            <h4>{t("LEAVE_REVIEW")}</h4>
            <div>
              <img alt="" src={Google} />{" "}
            </div>
          </li>
        </ul>

        <div className="FollowSection">
          <h6>{t("FOLLOW_US")}</h6>
          <div className="followImg">
            <img style={{margin:"2px"}} alt="" src={fb} />
            <img style={{margin:"2px"}} alt="" src={insta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
