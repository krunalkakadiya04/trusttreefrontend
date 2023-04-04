import Design from "../services/brandDesign";
import {
  getDesignError,
  getDesignRequest,
  getDesignSuccess,
  addDesignError,
  addDesignRequest,
  addDesignSuccess,
  updateDesignForQrOrSurveyRequest,
  // updateDesignForQrOrSurveySuccess,
  updateDesignForQrOrSurveyError,
  getIncomplateLanguageRequest,
  getIncomplateLanguageSuccess,
  getIncomplateLanguageError,
} from "../slices/brandDesign.slice";
import {
  viaQrError,
  viaQrRequest,
  viaQrSuccess,
} from "../slices/catalogue.slice";
// import {
//   viaQrErrorPro,
//   viaQrRequestPro,
//   viaQrSuccessPro,
// } from "../slices/productCatalogue.slice";
// import {
//   viaQrError,
//   viaQrRequest,
//   viaQrSuccess,
// } from "../slices/services.slice";

export function getDesign(select_id) {
  return (dispatch) => {
    dispatch(getDesignRequest());
    Design.getDesign(select_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getDesignSuccess(data));
        } else {
          dispatch(getDesignError(error));
        }
      })
      .catch((error) => {
        dispatch(getDesignError(error));
      });
  };
}

export function addDesign(payload, b_id) {
  return (dispatch) => {
    dispatch(addDesignRequest());
    Design.addDesign(payload, b_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addDesignSuccess(message));
        } else {
          dispatch(addDesignError(error));
        }
      })
      .catch((error) => {
        dispatch(addDesignError(error));
      });
  };
}

export function updateViaQrOrSurveyData(payload, b_id) {
  return (dispatch) => {
    dispatch(updateDesignForQrOrSurveyRequest());
    Design.updateQrInProOrSer(payload, b_id)
      .then((response) => {
        Design.getQrInProOrSer(b_id)
          .then((res) => {
            const { message, data, status, error } = res.data;
            dispatch(viaQrRequest());
            if (status === 1) {
              dispatch(viaQrSuccess({ data, message }));
            } else {
              dispatch(viaQrError(error));
            }
          })
          .catch((err) => {
            dispatch(viaQrError(err));
          });
      })
      .catch((error) => {
        dispatch(updateDesignForQrOrSurveyError(error));
      });
  };
}

export function getIncomplateLanguage(select_id) {
  return (dispatch) => {
    dispatch(getIncomplateLanguageRequest());
    Design.getIncomplateLanguage(select_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getIncomplateLanguageSuccess(data));
        } else {
          dispatch(getIncomplateLanguageError(error));
        }
      })
      .catch((error) => {
        dispatch(getIncomplateLanguageError(error));
      });
  };
}
