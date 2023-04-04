import React from "react";
import "../menu/Dashbord.css";
import exportdata from "../../assets/images/exportData.svg";

const Header = () => {
  return (
    <>
      <div className="Wrapper">
        <div className="contentWrap">
          <div className="contentHead">
            <h1>Home</h1>
            <div className="customSelect ml-auto staticIcon">
              <select className="selectpicker">
                <option>Chickin Worx</option>
                <option>Chickin 01</option>
                <option>Chickin 02</option>
                <option>Chickin 03</option>
                <option>Chickin 04</option>
              </select>
            </div>
            <button className="ml-3 btnIconDashBDR">
              <em>
                <img src={exportdata} alt="export data" />
              </em>
              <strong>Export Data</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
