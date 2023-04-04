import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLanguage } from "../../slices/feedbacks";
import BrandLogo from "../components/BrandLogo";

const SurveyHome = ({ previewData, languageData, click }) => {
  const dispatch = useDispatch();
  const { buttonColor, buttonTextColor } = useSelector(
    (state) => state.feedbacks
  );
  const { AllLanguages } = useSelector((state) => state.brand);

  const langData =
    languageData &&
    languageData.map((o) => {
      const newId =
        AllLanguages &&
        AllLanguages.find((obj) => {
          return obj.key === o;
        });
      return newId;
    });

  const handleLanguageClick = (e) => {
    dispatch(setLanguage(e));
    click();
  };

  return (
    <div className="paddingApp">
      <div className="surveyBtn">
        <div className="NavLogo">
          <BrandLogo object={previewData} />
        </div>
        <div className="multiButton">
          {langData &&
            langData.length > 0 &&
            langData.map((languages, i) => {
              return (
                <Button
                  key={i}
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
                  onClick={() => handleLanguageClick(languages.key)}
                >
                  {languages?.value}
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SurveyHome;
