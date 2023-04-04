import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import gift from "../../assets/images/gift.svg";
import noreward from "../../assets/images/noreward.svg";
import BrandLogo from "../components/BrandLogo";
import Menu from "../components/Menu";
import ServiceList from "../components/ServiceList";
import "../pages/preview.scss";
import backArrow from "../../assets/images/arrowLeft.svg";

const HomeReward = ({ previewData, click, backClick }) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [isShowService, setIsShowService] = useState(false);
  const {
    surveyButton,
    productButton,
    serviceButton,
    buttonColor,
    buttonTextColor,
    previewLanguage,
  } = useSelector((state) => state.feedbacks);

  return (
    <>
      {!isShow && !isShowService ? (
        <div>
          <div className="BackArrrow_Btn">
            <div className="navBack">
              <img
                src={backArrow}
                style={{ width: "15px", margin: "12px 10px" }}
                onClick={backClick}
                alt="backArrow"
              />
            </div>
          </div>
          <div className="mb-3 pt-4">
            <BrandLogo object={previewData} />
          </div>
          <div className="TopBorder"></div>
          <div className="paddingApp">
            <div className="HomeReward">
              <div className="RewardSec">
                {previewData?.brand_design?.via_qr_or_survey_link_service ===
                  true && (
                  <Button
                    style={{
                      backgroundColor: buttonColor
                        ? buttonColor
                        : previewData?.brand_design?.button_colour,
                      color: buttonTextColor
                        ? buttonTextColor
                        : previewData?.brand_design?.button_text_colour,
                      borderColor: buttonColor
                        ? buttonColor
                        : previewData?.brand_design?.button_colour,
                    }}
                    className="btn btn-primary mob_Btn"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {productButton[previewLanguage]
                      ? productButton[previewLanguage]
                      : previewData?.brand_design
                          ?.edit_button_text_products_list["en"]}
                  </Button>
                )}
                {previewData?.brand_design?.via_qr_or_survey_link_service ===
                  true && (
                  <Button
                    className="btn btn-primary mob_Btn"
                    style={{
                      backgroundColor: buttonColor
                        ? buttonColor
                        : previewData?.brand_design?.button_colour,
                      color: buttonTextColor
                        ? buttonTextColor
                        : previewData?.brand_design?.button_text_colour,
                      borderColor: buttonColor
                        ? buttonColor
                        : previewData?.brand_design?.button_colour,
                    }}
                    onClick={() => setIsShowService(!isShowService)}
                  >
                    {serviceButton[previewLanguage]
                      ? serviceButton[previewLanguage]
                      : previewData?.brand_design
                          ?.edit_button_text_services_list["en"]}
                  </Button>
                )}
              </div>
              <div className="borderDashed">
                <h6>{t("GET_BETTER")}</h6>
                <div className="SurvetBox">
                  <div>
                    <img
                      src={
                        previewData?.rewards?.is_reward_on === true
                          ? gift
                          : noreward
                      }
                      alt="gift"
                    />
                    <p>
                      {previewData?.rewards?.is_reward_on === true
                        ? previewData?.rewards?.title[previewLanguage]
                        : null}
                    </p>
                  </div>
                </div>
                <Button
                  className="btn btn-primary mob_Btn"
                  style={{
                    backgroundColor: buttonColor
                      ? buttonColor
                      : previewData?.brand_design?.button_colour,
                    color: buttonTextColor
                      ? buttonTextColor
                      : previewData?.brand_design?.button_text_colour,
                    borderColor: buttonColor
                      ? buttonColor
                      : previewData?.brand_design?.button_colour,
                  }}
                  onClick={click}
                >
                  {surveyButton[previewLanguage]
                    ? surveyButton[previewLanguage]
                    : previewData?.brand_design?.edit_button_text_survey_button[
                        previewLanguage
                      ]}
                </Button>
              </div>
              <ul>
                {previewData?.rewards?.is_reward_on === true &&
                  previewData?.rewards?.terms_and_condition.length > 0 && (
                    <>
                      <li>
                        <strong>{t("TERMS_CONDITION")}</strong>
                      </li>
                      <li>
                        {/* {previewData?.rewards?.is_reward_on === true && ( */}
                        <div>
                          {previewData.rewards?.terms_and_condition.map(
                            (o, i) => {
                              return (
                                <div key={i}>
                                  <p>{o[previewLanguage]}</p>
                                </div>
                              );
                            }
                          )}
                        </div>
                        {/* )} */}
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isShow && (
            <Menu
              previewData={previewData}
              show={isShow}
              setIsShow={(flag) => setIsShow(flag)}
            />
          )}
          {isShowService && (
            <ServiceList
              previewData={previewData}
              show={isShowService}
              setIsShow={(flag) => setIsShowService(flag)}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomeReward;
