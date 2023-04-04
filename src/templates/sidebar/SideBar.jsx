import React, { useState } from "react";
import BackNav from "../../assets/images/BackNav.svg";
import ForwardNav from "../../assets/images/ForwardNav.svg";
import trusTree from "../../assets/images/new-logo.svg";
import "../menu/Dashbord.css";
import { Link, useLocation } from "react-router-dom";
import ROUTE_URLS from "../../config/routes";
import { useTranslation } from "react-i18next";
import Logout from "../../pages/logout/Logout";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

// const dropdownIndicatorStyles = (base, state) => {
//   let changes = {
//     // backgroundColor: 'lightblue',
//     transform: 'rotate(-180deg)',
//   };
//   return Object.assign(base, changes);
// };

const SideBar = () => {
  const { t, i18n } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);
  const { pathname } = useLocation();
  const brandsSubMenus = [
    ROUTE_URLS.BRANDS,
    ROUTE_URLS.BRANDS_OPTIONS,
    // ROUTE_URLS.CATALOGUES,
    ROUTE_URLS.QUESTIONS,
    ROUTE_URLS.LINKS_AND_QR_CODES,
  ];
  const accountSettingsSubMenus = [ROUTE_URLS.PROFILE, ROUTE_URLS.USERS];
  const langaugeSubMenus = [];
  const { userProfile } = useSelector((state) => state.user);
  const { AllLanguages } = useSelector((state) => state.brand);

  const getParentActiveClass = (path, defaultClasses = "") => {
    let classes = defaultClasses;
    if (pathname === path) {
      classes += " active ";
    }
    return classes;
  };

  const getParentActiveClassByChildren = (paths = [], defaultClasses = "") => {
    let classes = defaultClasses;
    if (paths.indexOf(pathname) >= 0) {
      classes += " active ";
    }
    return classes;
  };

  const toggleParentActiveClass = (e, pathsToAvoid = []) => {
    if (pathsToAvoid.indexOf(pathname) < 0) {
      const {
        currentTarget: { classList },
      } = e;
      if (classList.contains("active")) {
        classList.remove("active");
      } else {
        classList.add("active");
      }
    }
  };

  const handleLanguageChange = (e) => {
    localStorage.setItem("lang", e);
    i18n.changeLanguage(e);
    window.location.reload();
  };

  const selectedLanguauge =
    AllLanguages &&
    AllLanguages.find((obj) => {
      return obj.key === localStorage.getItem("lang");
    });

  return (
    <>
      <div className="sidebarContent">
        <div className="MobileHead">
          <Link to={""} id="show-sidebar" className="BackNav NavBox">
            <img src={BackNav} alt="back navigation" />
          </Link>
          <div id="close-sidebar" className="ForwardNav NavBox">
            <img src={ForwardNav} alt="forword navigation" />
          </div>
        </div>
        <div className="Logo">
          <Link to={""}>
            <img src={trusTree} alt="logo" />
          </Link>
        </div>
        <div className="navBar">
          <div
            className="sidebar-menu navBarHead content mCustomScrollbar"
            data-mcs-theme="dark"
            style={{ overflowY: "auto" }}
          >
            <ul className="navUL">
              <li className={getParentActiveClass(ROUTE_URLS.HOME, "homeNav")}>
                <Link to={ROUTE_URLS.HOME}>
                  <em></em>
                  <strong>{t("Home")}</strong>
                </Link>
              </li>
              <li
                className={getParentActiveClass(
                  ROUTE_URLS.CUSTOMERS,
                  "customersNav"
                )}
                onClick={(e) =>
                  toggleParentActiveClass(e, ROUTE_URLS.CUSTOMERS)
                }
              >
                <Link to={ROUTE_URLS.CUSTOMERS}>
                  <em></em>
                  <strong>{t("CUSTOMERS")}</strong>
                </Link>
              </li>
              {/* <li
                className={"customersNav"}
              // onClick={(e) =>
              //   toggleParentActiveClass(e, ROUTE_URLS.CATALOGUES)
              // }
              >
                <Link>
                  <em></em>
                  <strong>{t("CUSTOMERS")}</strong>
                </Link>
              </li> */}
              <li
                className={getParentActiveClass(
                  ROUTE_URLS.FEEDBACKS,
                  "sidebar-dropdown feedbacksNav"
                )}
              >
                <Link to={ROUTE_URLS.FEEDBACKS}>
                  <em></em>
                  <strong>{t("Feedbacks")}</strong> <span>128</span>
                </Link>
                <div className="sidebar-submenu">
                  <ul>
                    <li>
                      <Link to={""}>
                        Trustree Feedbacks<span>101</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={""}>
                        Google Feedbacks<span>27</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={getParentActiveClassByChildren(
                  brandsSubMenus,
                  "brand-sidebar-dropdown brandsNav"
                )}
                onClick={(e) => toggleParentActiveClass(e, brandsSubMenus)}
              >
                <Link>
                  <em></em>

                  <strong>{t("Brands")}</strong>
                </Link>
                <div className="sidebar-submenu">
                  <ul>
                    <li>
                      <Link
                        className={`${pathname === ROUTE_URLS.BRANDS ? "active" : ""
                          }`}
                        to={ROUTE_URLS.BRANDS}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("Brands")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`${pathname === ROUTE_URLS.BRANDS_OPTIONS ? "active" : ""
                          }`}
                        to={ROUTE_URLS.BRANDS_OPTIONS}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("BRAND_OPTIONS")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`${pathname === ROUTE_URLS.QUESTIONS ? "active" : ""
                          }`}
                        to={ROUTE_URLS.QUESTIONS}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("QUESTIONS")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`${pathname === ROUTE_URLS.LINKS_AND_QR_CODES
                          ? "active"
                          : ""
                          }`}
                        to={ROUTE_URLS.LINKS_AND_QR_CODES}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("LINKS_AND_QR_CODES")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={getParentActiveClass(
                  ROUTE_URLS.CATALOGUES,
                  "cataloguesNav"
                )}
                onClick={(e) =>
                  toggleParentActiveClass(e, ROUTE_URLS.CATALOGUES)
                }
              >
                <Link to={ROUTE_URLS.CATALOGUES}>
                  <em></em>
                  <strong>{t("CATALOGUES")}</strong>
                </Link>
              </li>
              <li
                className={getParentActiveClassByChildren(
                  accountSettingsSubMenus,
                  "account-sidebar-dropdown accountsNav"
                )}
                onClick={(e) =>
                  toggleParentActiveClass(e, accountSettingsSubMenus)
                }
              >
                <Link>
                  <em></em>
                  <strong>{t("Account Settings")}</strong>
                </Link>
                <div className="sidebar-submenu">
                  <ul>
                    <li>
                      <Link
                        className={`${pathname === ROUTE_URLS.PROFILE ? "active" : ""
                          }`}
                        to={ROUTE_URLS.PROFILE}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("My Profile")}{" "}
                      </Link>
                    </li>
                    {userProfile &&
                      (userProfile.permission === "master" ||
                        userProfile.permission === "owner") && (
                        <li>
                          <Link
                            className={`${pathname === ROUTE_URLS.USERS ? "active" : ""
                              }`}
                            to={ROUTE_URLS.USERS}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("Users")}
                          </Link>
                        </li>
                      )}
                    <li>
                      <Link>{t("Subscriptions")}</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="navBarFooter">
            <ul className="navUL">
              <li
                className={getParentActiveClassByChildren(
                  langaugeSubMenus,
                  "language-sidebar-dropdown sidebar-dropdown-language languageNav ellipsis"
                )}
              >
                <Dropdown className="dropDown-language-sidebar">
                  <Dropdown.Toggle>
                    {selectedLanguauge ? (
                      <Link>
                        <em></em>
                        {selectedLanguauge.value}
                      </Link>
                    ) : (
                      <Link>
                        <em></em>
                        {t("English")}
                      </Link>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {AllLanguages &&
                      AllLanguages.map((o, i) => (
                        <Dropdown.Item
                          as={"span"}
                          key={i}
                          onClick={() => handleLanguageChange(o.key)}
                        >
                          {o.value}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className="logout-sidebar logoutNav">
                <Link onClick={() => setIsEditMode(true)}>
                  <em></em>
                  <strong>{t("Log out")}</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isEditMode && (
        <Logout show={isEditMode} setIsShow={(flag) => setIsEditMode(flag)} />
      )}
    </>
  );
};
export default SideBar;
