import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/images/new-logo.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="Logo_bottom">
      <ul>
        <li>
          <Link>عربي</Link>
        </li>
        <li>
          {" "}
          <span style={{marginRight:"2px"}}>{t("BY")}</span> <img src={logo} alt="logo" />
        </li>
      </ul>
    </div>
  );
};

export default Footer;
