import React, { useState } from "react";
import Avatar from "react-avatar";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AllImages from "./AllImages";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";
import SpecificRating from "./SpecificRating";

const SelectionRatingQuestion = ({
  previewData,
  object,
  questionClick,
  backClick,
}) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [isObject, setIsObject] = useState(false);
  const [isType, setIsType] = useState(false);
  const { previewLanguage } = useSelector((state) => state.feedbacks);

  const handleClick = (o, type) => {
    setIsShow(true);
    setIsObject(o);
    setIsType(type);
  };

  return (
    <>
      {!isShow ? (
        <div>
          <BackArrow previewData={previewData} backClick={backClick} />
          <ProgressiveBar />{" "}
          <div className="paddingApp">
            <h6 className="globalText">
              {object && object.name[previewLanguage]}
            </h6>
            <div className="ProductTabs">
              {object.type === "staff" ? (
                <div className="sandos-box">
                  <div className="QuestionFlex">
                    {previewData.staff_members &&
                      previewData.staff_members.length > 0 &&
                      previewData.staff_members.map((o, i) => {
                        return (
                          <div
                            className="BoxRate"
                            key={i}
                            onClick={() => handleClick(o, "staff")}
                          >
                            <div>
                              {o.profile_pic || !o.profile_pic ? (
                                <AllImages logo={o.profile_pic} id={o._id} />
                              ) : (
                                <Avatar
                                  name={
                                    o.name[previewLanguage]
                                      ? o.name[previewLanguage]
                                      : o.name[t("en")]
                                  }
                                  size="35px"
                                  key={o._id}
                                />
                              )}
                              <p>{o.name[previewLanguage]}</p>
                            </div>
                            {/* </LinkContainer> */}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <Tabs
                  // key={i}
                  // activeKey={`${o.title}-${i}`}
                  defaultActiveKey={
                    `${previewData.product_category[0]?.title}-0` ||
                    `${previewData.service_category[0]?.title}-0`
                  }
                  className="mb-3"
                >
                  {object.type === "product"
                    ? previewData?.product_category &&
                      previewData.product_category.length > 0 &&
                      previewData.product_category.map((o, i) => {
                        return (
                          <Tab
                            key={i}
                            eventKey={`${o.title}-${i}`}
                            title={
                              o.title[previewLanguage]
                                ? o.title[previewLanguage]
                                : o.title[t("en")]
                            }
                          >
                            <div className="sandos-box">
                              <div className="QuestionFlex">
                                {o.products.map((j, index) => {
                                  return (
                                    <div
                                      className="BoxRate"
                                      key={index}
                                      onClick={() => handleClick(j, "product")}
                                    >
                                      {j.logo || !j.logo ? (
                                        <AllImages logo={j.logo} id={j._id} />
                                      ) : (
                                        <Avatar
                                          name={
                                            j.name[previewLanguage]
                                              ? j.name[previewLanguage]
                                              : j.name[t("en")]
                                          }
                                          size="35px"
                                          key={o._id}
                                        />
                                      )}
                                      <p>
                                        {j.name[previewLanguage]
                                          ? j.name[previewLanguage]
                                          : j.name[t("en")]}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Tab>
                        );
                      })
                    : previewData?.service_category &&
                      previewData.service_category.length > 0 &&
                      previewData.service_category.map((o, i) => {
                        return (
                          <Tab
                            key={i}
                            eventKey={`${o.title}-${i}`}
                            title={
                              o.title[previewLanguage]
                                ? o.title[previewLanguage]
                                : o.title[t("en")]
                            }
                          >
                            <div className="sandos-box">
                              <div className="QuestionFlex">
                                {o.services.map((j, index) => {
                                  return (
                                    <div
                                      className="BoxRate"
                                      key={index}
                                      onClick={() => handleClick(j, "service")}
                                    >
                                      {j.image || !j.image ? (
                                        <AllImages logo={j.image} id={j._id} />
                                      ) : (
                                        <Avatar
                                          name={
                                            j.name[previewLanguage]
                                              ? j.name[previewLanguage]
                                              : j.name[t("en")]
                                          }
                                          size="35px"
                                          key={o._id}
                                        />
                                      )}
                                      <p>
                                        {j.name[previewLanguage]
                                          ? j.name[previewLanguage]
                                          : j.name[t("en")]}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Tab>
                        );
                      })}
                </Tabs>
              )}{" "}
            </div>
          </div>
        </div>
      ) : (
        <SpecificRating
          previewData={previewData}
          questionClick={questionClick}
          object={isObject}
          type={isType}
          show={isShow}
          setIsShow={(flag) => setIsShow(flag)}
        />
      )}
    </>
  );
};

export default SelectionRatingQuestion;
