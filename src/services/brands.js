import { del, get, post, postFormData, putFormData } from ".";

const URI = "/brands";

const getbrandListing = (payload) => {
  const URL = `${URI}`;
  return post(URL, payload);
};
const getbrandforDropDown = () => {
  const URL = `${URI}/brands-dropdown`;
  return get(URL);
};

const addBrand = (payload) => {
  const URL = `${URI}/create`;
  return postFormData(URL, payload);
};

const getOneBrandToUpdate = (selectId) => {
  const URL = `${URI}/update/${selectId}`;
  return get(URL);
};

const updateBrand = (payload, brand_id) => {
  const URL = `${URI}/update/${brand_id}`;
  return putFormData(URL, payload);
};

const getLanguages = () => {
  const URL = `${URI}/get-languages`;
  return get(URL);
};

const getCurrency = () => {
  const URL = `${URI}/get-currency`;
  return get(URL);
};

const disEnableBrandsByID = (b_id) => {
  const URL = `${URI}/disable-enable/${b_id}`;
  return del(URL);
};

const Brands = {
  getbrandListing,
  addBrand,
  getOneBrandToUpdate,
  updateBrand,
  getLanguages,
  getbrandforDropDown,
  disEnableBrandsByID,
  getCurrency
};
export default Brands;
