import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import search from "../../assets/images/search.svg";
import AllImages from "./AllImages";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";

const ServiceList = ({ previewData, show, setIsShow }) => {
  const { t } = useTranslation();

  return (
    <>
      <BackArrow previewData={previewData} backClick={() => setIsShow(!show)} />
      <ProgressiveBar />
      <div className="paddingApp">
        <div className="InputSearch">
          <form className="searchIcon">
            <img src={search} alt="search" />
            <input
              className="InputBox mob_input"
              placeholder={t("SEARCH_NAME")}
              disabled
            />
          </form>
        </div>
        <div className="ProductTabs">
          <Tabs defaultActiveKey={"0"} className="mb-3">
            {previewData &&
              previewData.service_category &&
              previewData.service_category.length > 0 &&
              previewData.service_category.map((o, i) => {
                return (
                  <Tab
                    eventKey={`${o.title}-${i}`}
                    title={
                      o.title[t("language")]
                        ? o.title[t("language")]
                        : o.title[t("en")]
                    }
                  >
                    <ul>
                      <li>
                        <div className="sandos-box">
                          {o.services &&
                            o.services.map((j, index) => {
                              return (
                                <div key={index} className="menu_Flex">
                                  <div className="sandos-flex">
                                    {j.image || !j.image ? (
                                      <AllImages logo={j.image} id={j._id} />
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="Text_box">
                                    <div className="sandosBox">
                                      <h6>{j.name[t("language")]}</h6>
                                      <p className="bigFont">
                                        {j.description[t("language")]
                                          ? j.description[t("language")]
                                          : j.description[t("en")]}
                                      </p>
                                    </div>
                                    <h4>
                                      {" "}
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

export default ServiceList;
