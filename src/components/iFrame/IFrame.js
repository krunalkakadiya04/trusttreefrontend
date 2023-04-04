import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackDataforPreview } from "../../middlewares/feedbacks";
import PreviewSurvey from "../../preview/pages";

const IFrame = ({ selectBrand, expId }) => {
  const dispatch = useDispatch();
  const { previewData, languageData } = useSelector((state) => state.feedbacks);

  useEffect(() => {
    const payload = {
      brand_id: selectBrand,
    };
    if (expId) {
      payload.experience_type_id = expId;
    }
    dispatch(getFeedbackDataforPreview(payload));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectBrand, expId]);

  return (
    <>
      <div className="MobileScreen">
        <div className="dataContect">
          <PreviewSurvey
            previewData={previewData}
            languageData={languageData}
          />
        </div>
      </div>
    </>
  );
};

export default IFrame;
