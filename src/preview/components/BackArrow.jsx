import React from "react";
import backArrow from "../../assets/images/arrowLeft.svg";

const BackArrow = ({ previewData, backClick }) => {
  return (
    <div className=" BackArrrow_Btn">
      <div className="navBack">
        <img
          src={backArrow}
          style={{ width: "15px", margin: "12px 10px" }}
          onClick={backClick}
          alt="backArrow"
        />
      </div>
      <div className="navLogo">
        <img
          style={{ width: "20px", borderRadius: "3px", marginLeft: "80px" }}
          src={
            `${process.env.REACT_APP_BASE_URL}${previewData?.brand_detail?.logo}` ||
            require("../../assets/images/noProfile.webp")
          }
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = { chickinWorx };
            e.target.src =
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
          }}
          alt="logo"
          // id={previewData.id}
        />
        {/* {props.data?.brand_design?.show_logo === true ? (
          <>
            <img src={ChickinWorx} />
          </>
        ) : (
          <></>
        )} */}
        {/* <BrandLogo object={props.object} /> */}
      </div>
    </div>
  );
};

export default BackArrow;
