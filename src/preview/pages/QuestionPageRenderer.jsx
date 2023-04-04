import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setQuestionIndex } from "../../slices/feedbacks";
import CategoryRating from "../components/CategoryRating";
import MultipleTypeRating from "../components/MultipleTypeRating";
import SelectionRatingQuestion from "../components/SelectionRatingQuestion";
import SingleTypeQuestion from "../components/SingleTypeQuestion";
import SurveyHome from "./SurveyHome";

const QuestionPageRenderer = ({ previewData, click, backClick }) => {
  const dispatch = useDispatch();
  const { questionIndex } = useSelector((state) => state.feedbacks);

  const handleQuestionClick = () => {
    if (previewData?.question?.length - 1 === questionIndex) {
      click();
    } else {
      dispatch(setQuestionIndex(questionIndex + 1));
    }
  };

  const handleQuestionBackClick = () => {
    if (questionIndex === 0) {
      backClick();
    } else {
      dispatch(setQuestionIndex(questionIndex - 1));
    }
  };

  const renderer = (question) => {
    if (question.type === "category rating") {
      return (
        <CategoryRating
          previewData={previewData}
          object={question}
          questionClick={() => handleQuestionClick()}
          backClick={() => handleQuestionBackClick()}
        />
      );
    } else if (question.type === "single") {
      return (
        <SingleTypeQuestion
          previewData={previewData}
          object={question}
          questionClick={() => handleQuestionClick()}
          backClick={() => handleQuestionBackClick()}
        />
      );
    } else if (
      question.type === "staff" ||
      question.type === "product" ||
      question.type === "service"
    ) {
      return (
        <SelectionRatingQuestion
          previewData={previewData}
          object={question}
          questionClick={() => handleQuestionClick()}
          backClick={() => handleQuestionBackClick()}
        />
      );
    } else if (question.type === "multiple") {
      return (
        <MultipleTypeRating
          previewData={previewData}
          object={question}
          questionClick={() => handleQuestionClick()}
          backClick={() => handleQuestionBackClick()}
        />
      );
    } else if (!question) {
      return <SurveyHome />;
    }
  };

  return <div>{renderer(previewData.question[questionIndex])}</div>;
};

export default QuestionPageRenderer;
