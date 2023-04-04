import React from "react";

function AllImages(props) {
  return (
    <div className="Box">
      <img
        src={
          `${process.env.REACT_APP_BASE_URL}${props.logo}` ||
          require("../../assets/images/noProfile.webp")
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        }}
        alt="logo"
        id={props.id}
      />
    </div>
  );
}

export default AllImages;
