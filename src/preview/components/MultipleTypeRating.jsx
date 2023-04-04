import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";

const MultipleTypeRating = ({
  previewData,
  object,
  questionClick,
  backClick,
}) => {
  const { previewLanguage } = useSelector((state) => state.feedbacks);

  return (
    <>
      <BackArrow previewData={previewData} backClick={backClick} />
      <ProgressiveBar />
      <div className="paddingApp">
        <h6 className="globalText">{object && object.name[previewLanguage]}</h6>
        <div className="SocialSection">
          {object?.options?.map((data, i) => {
            return (
              <div className="multiButton" key={i}>
                <Button
                  className="btn mob_Btn hoverRateBtn"
                  style={{
                    background: "transparent",
                    color: "black",
                  }}
                  onClick={questionClick}
                >
                  {data}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MultipleTypeRating;
