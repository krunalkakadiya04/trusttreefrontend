import Rewards from "../services/rewards";
import {
  getRewardsError, getRewardsRequest, getRewardsSuccess,
  addRewardsError, addRewardsRequest, addRewardsSuccess
} from "../slices/rewards.slice";

export function getRewards(brand_id, exp_id) {
  return (dispatch) => {
    dispatch(getRewardsRequest());
    Rewards.getRewards(brand_id, exp_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getRewardsSuccess(data));
        } else {
          dispatch(getRewardsError(error));
        }
      })
      .catch((error) => {
        dispatch(getRewardsError(error));
      });
  };
}


export function addRewards(payload, brand_id, exp_id) {
  return (dispatch) => {
    dispatch(addRewardsRequest());
    Rewards.addRewards(payload, brand_id, exp_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addRewardsSuccess(message));
        } else {
          dispatch(addRewardsError(error));
        }
      })
      .catch((error) => {
        dispatch(addRewardsError(error));
      });
  };
}