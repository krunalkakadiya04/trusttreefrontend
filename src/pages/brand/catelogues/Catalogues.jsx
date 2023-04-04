import React, { useEffect, useState } from "react";
import { Badge, Dropdown, Form, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getbrandsforDropdown } from "../../../middlewares/brands";
import ProductCategory from "./products/ProductCategory";
import ServiceCategory from "./services/ServiceCategory";
import "./catelogues.scss";
import { resetForm } from "../../../slices/productCatalogue.slice";
import { getCatalogueQrOrSurvey } from "../../../middlewares/catalogue";
import Avatar from "react-avatar";

export const Catalogues = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectBrand, setSelectBrand] = useState("");
  const { dropDownBrands: brands } = useSelector((state) => state.brand);
  const { catalogue } = useSelector((state) => state.product);
  const { viaQrOrSurvey } = useSelector((state) => state.catalogue);
  const { catalogue: serviceCat } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getbrandsforDropdown());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (brands && brands.length > 0) {
      setSelectBrand(brands[0]._id);
    }
  }, [brands]);

  useEffect(() => {
    dispatch(resetForm());
    if (selectBrand !== "") {
      dispatch(getCatalogueQrOrSurvey(selectBrand));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectBrand]);

  const handleChange = (e) => {
    setSelectBrand(e);
  };

  const brand_name = brands && brands.find((obj) => {
    return obj._id === selectBrand;
  })


  return (
    <div className="contentWrap">
      <div className="contentHead justify-content-between">
        <h1>{t("CATALOGUES")}</h1>
        <Form>
          <div className="customSelect ms-auto staticIcon max-width-245 multipul">
            {brand_name &&
              <Dropdown className='ellipsis'>
                <Dropdown.Toggle
                  className="form-control"
                >
                  <div className='d-flex w-100 align-items-center ImgSelect'>
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
                    <span className='dropdown-value ms-2'>{brand_name.name}</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={'span'} disabled>{t("SELECT_BRAND")}</Dropdown.Item>
                  {brands && brands.length > 0 && brands.map((o, i) => (
                    <Dropdown.Item as={'span'} value={o._id} key={i}
                      onClick={() => handleChange(o._id)}><span >
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
                      </span>{o.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            }
          </div>
        </Form>
      </div>
      <div className="Catalogues-wpr">
        <div className="Catalogues-inner">
          <Tabs className="tabs tab_panel_new Catalogues-flex flex">
            <Tab
              eventKey="Products Catalogue"
              className="catalogue-nav-items"
              tabClassName="Catalogues-tab"
              title={
                <React.Fragment>
                  {t("PRODUCTS_CATALOGUE")}
                  <Badge className="num color-gray">
                    {catalogue && catalogue.length > 0
                      ? Object.keys(catalogue).length
                      : "0"}
                  </Badge>
                </React.Fragment>
              }
            >
              {selectBrand && (
                <ProductCategory
                  selectBrand={selectBrand}
                  QRstatus={viaQrOrSurvey?.via_qr_or_survey_link_product}
                />
              )}
            </Tab>
            <Tab
              eventKey="Services Catalogue"
              tabClassName="Catalogues-tab"
              title={
                <React.Fragment>
                  {t("SERVICES_CATALOGUE")}
                  <Badge className="num color-gray">
                    {serviceCat && serviceCat.length > 0
                      ? Object.keys(serviceCat).length
                      : 0}
                  </Badge>
                </React.Fragment>
              }
            >
              {selectBrand && (
                <ServiceCategory
                  selectBrand={selectBrand}
                  QRstatus={viaQrOrSurvey?.via_qr_or_survey_link_service}
                />
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
