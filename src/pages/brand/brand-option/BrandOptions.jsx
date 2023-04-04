import React, { useEffect, useState } from "react";
import { Dropdown, Form, Tab, Tabs } from "react-bootstrap";
import ExperienceType from "./experienceType/ExperienceType";
import Staff from "./staffMembers/Staff";
import Rewards from "./rewards/Rewards";
import Ratings from "./ratings/Ratings";
import SocialMedia from "./socialMedia/SocialMedia";
import BrandDesign from "./brandDesign/BrandDesign";
import { useDispatch, useSelector } from "react-redux";
import { getbrandsforDropdown } from "../../../middlewares/brands";
import { useTranslation } from "react-i18next";
import Avatar from "react-avatar";
import IFrame from "../../../components/iFrame/IFrame";

const BrandOptions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dropDownBrands: brands } = useSelector((state) => state.brand);
  const [selectBrand, setSelectBrand] = useState("");

  useEffect(() => {
    dispatch(getbrandsforDropdown());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (brands.length) {
      setSelectBrand(brands[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands]);

  const handleChange = (e) => {
    setSelectBrand(e);
  };

  const brand_name =
    brands &&
    brands.find((obj) => {
      return obj._id === selectBrand;
    });

  return (
    <div className="contentWrap">
      <div className="contentHead justify-content-between">
        <h1>{t("BRAND_OPTIONS")}</h1>
        <Form>
          <div className="customSelect ms-auto staticIcon max-width-245 multipul">
            {brand_name && (
              <Dropdown className="ellipsis">
                <Dropdown.Toggle className="form-control">
                  <div className="d-flex w-100 align-items-center ImgSelect">
                    <span>
                      {brand_name.logo ? (
                        <img
                          src={
                            `${process.env.REACT_APP_BASE_URL}${brand_name.logo}` ||
                            require("../../../assets/images/noProfile.webp")
                          }
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                          }}
                          alt="logo"
                        />
                      ) : (
                        <>
                          <Avatar
                            name={brand_name.name}
                            size="30px"
                            maxInitials={2}
                            key={brand_name._id}
                          />
                        </>
                      )}
                    </span>
                    <span className="dropdown-value ms-2">
                      {brand_name.name}
                    </span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={"span"} disabled>
                    {t("SELECT_BRAND")}
                  </Dropdown.Item>
                  {brands &&
                    brands.length > 0 &&
                    brands.map((o, i) => (
                      <Dropdown.Item
                        as={"span"}
                        value={o._id}
                        key={i}
                        onClick={() => handleChange(o._id)}
                      >
                        <span>
                          {o.logo ? (
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${o.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          ) : (
                            <>
                              <Avatar
                                name={o.name}
                                size="18px"
                                maxInitials={2}
                                key={o._id}
                              />
                            </>
                          )}
                        </span>
                        {o.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Form>
      </div>
      <div className="brand-wpr flex">
        <div className="tab_cstm_wrapper">
          <Tabs className="tabs tab_panel_new flex">
            <Tab eventKey="home" title={t("BRAND")} className="nav-items">
              {selectBrand && <BrandDesign selectBrand={selectBrand} />}
            </Tab>
            <Tab
              eventKey="Experience Type"
              title={t("EXPERIENCE_TYPE")}
              className="nav-items"
            >
              {selectBrand && <ExperienceType selectBrand={selectBrand} />}
            </Tab>
            <Tab eventKey="Reward" title={t("REWARD")} className="nav-items">
              {selectBrand && <Rewards selectBrand={selectBrand} />}
            </Tab>
            <Tab eventKey="Staffs" title={t("STAFFS")} className="nav-items">
              {selectBrand && <Staff selectBrand={selectBrand} />}
            </Tab>
            <Tab eventKey="Ratings" title={t("RATINGS")} className="nav-items">
              {selectBrand && <Ratings selectBrand={selectBrand} />}
            </Tab>
            <Tab
              eventKey="social Media"
              title={t("SOCIAL_MEDIA")}
              className="nav-items"
            >
              {selectBrand && <SocialMedia selectBrand={selectBrand} />}
            </Tab>
          </Tabs>
        </div>
        <div className="brand-mobile-phone">
          {/* <img src={phoneImg} alt="loadding" /> */}
          {selectBrand && <IFrame selectBrand={selectBrand} />}
        </div>
      </div>
    </div>
  );
};

export default BrandOptions;
