import Ratings from "../services/ratings";
import {
  getRatingsError, getRatingsRequest, getRatingsSuccess,
  addRatingsError, addRatingsRequest, addRatingsSuccess
} from "../slices/ratings.slice";

export function getRatings(select_id) {
  return (dispatch) => {
    dispatch(getRatingsRequest());
    Ratings.getRatings(select_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getRatingsSuccess(data));
        } else {
          dispatch(getRatingsError(error));
        }
      })
      .catch((error) => {
        dispatch(getRatingsError(error));
      });
  };
}


export function addRatings(payload, select_id) {
  return (dispatch) => {
    dispatch(addRatingsRequest());
    Ratings.addRatings(payload, select_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addRatingsSuccess(message));
        } else {
          dispatch(addRatingsError(error));
        }
      })
      .catch((error) => {
        dispatch(addRatingsError(error));
      });
  };
}