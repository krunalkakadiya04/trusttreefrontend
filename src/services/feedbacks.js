import { post } from ".";

const URI = "/brands/feedbacks";

const genrateQr = (payload, select_id) => {
  const URL = `${URI}/get-qr-code/${select_id}`;
  return post(URL, payload);
};

const getFeedbackDataforPreview = (payload) => {
  const URL = `${URI}/get-preview`;
  return post(URL, payload);
};

const Feedbacks = {
  genrateQr,
  getFeedbackDataforPreview
};
export default Feedbacks;