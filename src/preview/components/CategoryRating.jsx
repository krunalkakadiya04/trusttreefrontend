import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";

const CategoryRating = ({ previewData, object, questionClick, backClick }) => {
  const { buttonColor, buttonTextColor, previewLanguage } = useSelector(
    (state) => state.feedbacks
  );
  const { t } = useTranslation();

  return (
    <>
      <BackArrow previewData={previewData} backClick={backClick} />
      <ProgressiveBar />
      <div>
        <div className="paddingApp">
          <h6 className="folloItem">
            {object && object.name[previewLanguage]}
          </h6>
          <div className="StarRatting">
            <div className="Nestbtn">
              {object &&
                object.category_option &&
                object.category_option.length > 0 &&
                object.category_option.map((o, index) => {
                  return (
                    <div className="category" key={index}>
                      <h5>{o.name[previewLanguage]}</h5>
                      <StarRatings />
                    </div>
                  );
                })}
              &nbsp; &nbsp; &nbsp;
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
                onClick={questionClick}
              >
                {t("NEXT")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryRating;
