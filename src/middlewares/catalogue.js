import Design from "../services/brandDesign";
import {
  viaQrError,
  viaQrRequest,
  viaQrSuccess,
} from "../slices/catalogue.slice";

export function getCatalogueQrOrSurvey(brand_id) {
  return (dispatch) => {
    dispatch(viaQrRequest());
    Design.getQrInProOrSer(brand_id)
      .then((response) => {
        const { data, status, error, message } = response.data;
        if (status === 1) {
          dispatch(viaQrSuccess({ data, message }));
        } else {
          dispatch(viaQrError(error));
        }
      })
      .catch((error) => {
        dispatch(viaQrError(error));
      });
  };
}
