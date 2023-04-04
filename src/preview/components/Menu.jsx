import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import search from "../../assets/images/search.svg";
import AllImages from "./AllImages";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";

const Menu = ({ previewData, setIsShow, show }) => {
  const { t } = useTranslation();

  return (
    <>
      <BackArrow previewData={previewData} backClick={() => setIsShow(!show)} />
      <ProgressiveBar />
      <div className="paddingApp">
        <div className="InputSearch">
          <div className="searchIcon">
            <img src={search} alt="search" />
            <input
              className="InputBox mob_input"
              placeholder={t("SEARCH_NAME")}
              disabled
            />
          </div>
        </div>
        <div className="ProductTabs">
          <Tabs
            defaultActiveKey={`${
              previewData &&
              previewData.product_category &&
              previewData.product_category[0]?.title
            }-0`}
            className="mb-3"
          >
            {previewData.product_category &&
              previewData.product_category.length > 0 &&
              previewData.product_category.map((o, i) => {
                return (
                  <Tab
                    eventKey={`${o.title}-${i}`}
                    title={
                      o.title[t("language")]
                        ? o.title[t("language")]
                        : o.title[t("en")]
                    }
                    key={i}
                  >
                    <ul>
                      <li>
                        <div className="sandos-box">
                          {o.products &&
                            o.products.length > 0 &&
                            o.products.map((j, index) => {
                              return (
                                <div key={index} className="menu_Flex">
                                  <div className="sandos-flex">
                                    {j.logo || !j.logo ? (
                                      <AllImages logo={j.logo} id={j._id} />
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="Text_box">
                                    <div className="sandosBox">
                                      <h6>
                                        {j.name[t("language")]
                                          ? j.name[t("language")]
                                          : j.name[t("en")]}
                                      </h6>
                                      <p className="bigFont">
                                        Lorem ipsum is just for checking the
                                        text
                                        {/* {j.description[t("language")]
                                      ? j.description[t("language")]
                                      : j.description[t("en")]} */}
                                      </p>
                                    </div>
                                    <h4>
                                      {j.price +
                                        " " +
                                        previewData?.brand_design?.currency}
                                    </h4>
                                  </div>
                                  {/* <div className="pricing">
                                    
                                  </div> */}
                                </div>
                              );
                            })}
                        </div>
                      </li>
                    </ul>
                  </Tab>
                );
              })}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Menu;
