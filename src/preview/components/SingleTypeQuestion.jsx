import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";

const SingleTypeQuestion = ({
  previewData,
  object,
  questionClick,
  backClick,
}) => {
  const { t } = useTranslation();
  const { buttonColor, buttonTextColor, previewLanguage } = useSelector(
    (state) => state.feedbacks
  );

  return (
    <div>
      <BackArrow previewData={previewData} backClick={backClick} />
      <ProgressiveBar />
      <div className="paddingApp">
        <ul className="QueFlex">
          <li>
            <h6 className="globalText">
              {/* {page === 2 || page === 3 ? (
                  <p>{`${props.object.name[t("language")].replace(
                    /([\{(])(.+?)([\})])/g,
                    `${ratingName}`
                  )}`}</p>
                ) : ( */}
              <p>{object && object.name[previewLanguage]}</p>
              {/* )} */}
            </h6>
            <div className="paddingTextarea">
              <textarea
                className="form-control"
                as="textarea"
                rows={8}
                name="opinion"
                placeholder={t("SHARE_YOUR_OPINION")}
                disabled
              />
            </div>
          </li>
          <li>
            <div className="Nestbtn">
              <Button
                type="button"
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
              {object && object.optional === true && (
                <p
                  className="skipBtn"
                  style={{ color: buttonColor, cursor: "pointer" }}
                  onClick={questionClick}
                >
                  {t("SKIP")}
                </p>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleTypeQuestion;
