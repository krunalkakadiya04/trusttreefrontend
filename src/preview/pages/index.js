import React from "react";
import HomeReward from "./HomeReward";
import SurveyHome from "./SurveyHome";
import Information from "./Information";
import Footer from "../components/Footer";
import { setIndex } from "../../slices/feedbacks";
import { useSelector, useDispatch } from "react-redux";
import QuestionPageRenderer from "./QuestionPageRenderer";
import SocialMedia from "../components/SocialMedia";

const PreviewSurvey = ({ previewData, languageData }) => {
  const dispatch = useDispatch();
  const { Index } = useSelector((state) => state.feedbacks);

  const componentArray = [
    <SurveyHome
      previewData={previewData}
      languageData={languageData}
      click={() => handleButtonClick()}
      backClick={() => handleBackClick()}
    />,
    <HomeReward
      previewData={previewData}
      click={() => handleButtonClick()}
      backClick={() => handleBackClick()}
    />,
    <QuestionPageRenderer
      previewData={previewData}
      click={() => handleButtonClick()}
      backClick={() => handleBackClick()}
    />,
    <Information
      previewData={previewData}
      click={() => handleButtonClick()}
      backClick={() => handleBackClick()}
    />,
    <SocialMedia backClick={() => handleBackClick()} />,
  ];

  const handleButtonClick = () => {
    dispatch(setIndex(Index + 1));
  };

  const handleBackClick = () => {
    dispatch(setIndex(Index - 1));
  };

  return (
    <>
      <div>
        {componentArray[Index]}
        <Footer />
      </div>
    </>
  );
};

export default PreviewSurvey;
