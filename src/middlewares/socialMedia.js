import SocialMedia from "../services/socialMedia";
import {
  getSocialMediaError, getSocialMediaRequest, getSocialMediaSuccess,
  addSocialMediaError, addSocialMediaRequest, addSocialMediaSuccess
} from "../slices/socialMedia.slice";

export function getSocialMedia(select_id) {
  return (dispatch) => {
    dispatch(getSocialMediaRequest());
    SocialMedia.getSocialMedia(select_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getSocialMediaSuccess(data));
        } else {
          dispatch(getSocialMediaError(error));
        }
      })
      .catch((error) => {
        dispatch(getSocialMediaError(error));
      });
  };
}

export function addSocialMedia(payload, select_id) {
  return (dispatch) => {
    dispatch(addSocialMediaRequest());
    SocialMedia.addSocialMedia(payload, select_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addSocialMediaSuccess(message));
        } else {
          dispatch(addSocialMediaError(error));
        }
      })
      .catch((error) => {
        dispatch(addSocialMediaError(error));
      });
  };
}