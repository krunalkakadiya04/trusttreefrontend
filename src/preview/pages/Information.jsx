import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import IntlTelInput from "react-intl-tel-input";
import BrandLogo from "../components/BrandLogo";
import "react-intl-tel-input/dist/main.css";
import { useSelector } from "react-redux";
import backArrow from "../../assets/images/arrowLeft.svg";

const Information = ({ previewData, click, backClick }) => {
  const { t } = useTranslation();
  const { buttonColor, buttonTextColor } = useSelector(
    (state) => state.feedbacks
  );

  return (
    <>
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
      <div className="paddingApp">
        <div className="py-4">
          <BrandLogo object={previewData} />
        </div>

        <div className="info_Section">
          <div className="information_Wpr">
            {previewData && previewData.rewards ? (
              <div>
                <h6>{t("YOUR_GIFT")}</h6>
                <p>{t("GET_GIFT")}</p>
              </div>
            ) : (
              <h6>Complete your information</h6>
            )}
            <div className="InputSearch">
              <div className="searchIcon  px-2">
                <input
                  type="text"
                  name="customer_name"
                  className="form-control mob_input"
                  placeholder={t("Name")}
                  disabled
                />
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  inputClassName="form-control mob_input "
                  style={{
                    width: "100%",
                    marginBottom: "15px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                  disabled
                  formatOnInit={false}
                  format={false}
                  useMobileFullscreenDropdown={false}
                  separateDialCode={false}
                />
                <input
                  type="email"
                  name="customer_email"
                  aria-label="Example text with button addon"
                  className="form-control mob_input"
                  placeholder="Enter your email"
                  disabled
                />
                <ul className="checkbox_Sec">
                  {previewData?.rating_options?.customer_data === "Ask" && (
                    <li>
                      <input type="checkbox" disabled />
                      <label>{t("SHARE")}</label>
                    </li>
                  )}
                  <li>
                    <input type="checkbox" disabled />
                    <label>{t("ASK_TERMS")}</label>
                  </li>
                </ul>
                <div className="Nestbtn">
                  <Button
                    className="mob_Btn"
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
                    {previewData?.rewards ? t("CLAIM_YOUR_GIFT") : t("SUBMIT")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
