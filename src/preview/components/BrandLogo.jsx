import React from "react";

const BrandLogo = (props) => {
  return (
    <div className="BrandLogo">
      {/* {props.object?.brand_design?.show_logo === true ? (
        <> */}

      <img
        src={
          `${process.env.REACT_APP_BASE_URL}${props?.object?.brand_detail?.logo}` ||
          require("../../assets/images/noProfile.webp")
        }
        onError={(e) => {
          e.target.onerror = null;
          // e.target.src = { chickinWorx };
          e.target.src =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        }}
        alt="logo"
        id={props.id}
      />
      {/* <img src={props?.object?.brand_detail?.logo} alt="" />
          <img src={chickinWorx} /> */}
      {/* </>
      ) : (
        <>
       <img
            src={
              `${process.env.REACT_APP_BACKEND_BASE_URL}${props?.object?.brand_detail?.logo}` ||
              require("../assets/images/ChickinWorx.svg")
            }
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = { chickinWorx };
              e.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }}
            alt="logo"
            id={props.id}
          />
        </>
      )} */}
    </div>
  );
};

export default BrandLogo;
