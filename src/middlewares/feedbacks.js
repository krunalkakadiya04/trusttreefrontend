import Feedbacks from "../services/feedbacks";
import { genrateQrError, genrateQrRequest, genrateQrSuccess, getFeedbackDataforPreviewError, getFeedbackDataforPreviewRequest, getFeedbackDataforPreviewSuccess } from "../slices/feedbacks";

export function genrateQr(payload, select_id) {
  return (dispatch) => {
    dispatch(genrateQrRequest());
    Feedbacks.genrateQr(payload, select_id)
      .then((response) => {
        const { message, status, error, data } = response.data;
        if (status === 1) {
          dispatch(genrateQrSuccess({ data, message }));
        } else {
          dispatch(genrateQrError(error));
        }
      })
      .catch((error) => {
        dispatch(genrateQrError(error));
      });
  };
}

export function getFeedbackDataforPreview(payload) {
  return (dispatch) => {
    dispatch(getFeedbackDataforPreviewRequest());
    Feedbacks.getFeedbackDataforPreview(payload)
      .then((response) => {
        const { status, data, error } = response.data;
        if (status === 1) {
          dispatch(getFeedbackDataforPreviewSuccess(data));
        } else {
          dispatch(getFeedbackDataforPreviewError(error));
        }
      })
      .catch((error) => {
        dispatch(getFeedbackDataforPreviewError(error));
      });
  };
}