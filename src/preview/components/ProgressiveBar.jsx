import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProgressiveBar() {
  const { previewData, questionIndex } = useSelector(
    (state) => state.feedbacks
  );
  return (
    <ProgressBar
      now={(questionIndex / (previewData?.question?.length - 1)) * 100}
      visuallyHidden
      variant="danger"
    />
  );
}

export default ProgressiveBar;
