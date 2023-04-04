import { get, post, put } from ".";

const URI = "/brands/design";

const getDesign = (select_id) => {
  const URL = `${URI}/${select_id}`;
  return get(URL);
};

const addDesign = (payload, b_id) => {
  const URL = `${URI}/${b_id}`;
  return post(URL, payload);
};

const updateQrInProOrSer = (payload, b_id) => {
  const URL = `${URI}/qr-status-update/${b_id}`;
  return put(URL, payload);
};

const getQrInProOrSer = (b_id) => {
  const URL = `${URI}/get-qr-status/${b_id}`;
  return get(URL);
};

const getIncomplateLanguage = (select_id) => {
  const URL = `${URI}/incomplate-language/${select_id}`;
  return get(URL);
};

const Design = {
  getDesign,
  addDesign,
  updateQrInProOrSer,
  getQrInProOrSer,
  getIncomplateLanguage
};
export default Design;
