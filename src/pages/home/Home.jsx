import React from "react";
import "../login/Login.css";
// import logo from "../../assets/images/logo.svg";
import MainMenu from "../../templates/menu/MainMenu";
import exportdata from "../../assets/images/exportData.svg";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <div className="login-body">
        <div className="logo-login">
          <img src={logo} alt="logo" />
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "white" }}>
            Welcome to Trustree!, This is Home Page.
          </h3>
        </div>
      </div> */}
      <div className="contentWrap">
        <div className="contentHead">
          <h1>{t("Home")}</h1>
          <div className="customSelect ms-auto staticIcon">
            <Form.Select className="selectpicker">
              <option>{t("Chickin Worx")}</option>
              <option>Chickin 01</option>
              <option>Chickin 02</option>
              <option>Chickin 03</option>
              <option>Chickin 04</option>
            </Form.Select>
          </div>
          <button className="ms-3 btnIconDashBDR">
            <em>
              <img src={exportdata} alt="export data" />
            </em>
            <strong>{t("EXPORT_DATA")}</strong>
          </button>
        </div>
      </div>
      <MainMenu />
    </>
  );
};

export default Home;
