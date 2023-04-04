import { del, get, post, postFormData, put, putFormData } from ".";

const URI = "/brands/service";

const getCatalogues = (brand_id, payload) => {
  const URL = `${URI}/${brand_id}`;
  return post(URL, payload);
};

const addServiceCategory = (payload, brand_id) => {
  const URL = `${URI}/create/${brand_id}`;
  return post(URL, payload);
};
const addService = (payload, brand_id) => {
  const URL = `${URI}/add-service/${brand_id}`;
  return postFormData(URL, payload);
};
const getOneCategoryToUpdate = (selectId) => {
  const URL = `${URI}/get-single-catalogue/${selectId}`;
  return get(URL);
};
const getOneServiceToUpdate = (s_id) => {
  const URL = `${URI}/get-single-service/${s_id}`;
  return get(URL);
};
const updateCatalogues = (payload, selectId) => {
  const URL = `${URI}/update/${selectId}`;
  return put(URL, payload);
};
const updateService = (payload, selectId) => {
  const URL = `${URI}/${selectId}`;
  return putFormData(URL, payload);
};
const disableEnableCatalogue = (selectId) => {
  const URL = `${URI}/disable-enable/${selectId}`;
  return del(URL);
};
const disableEnableService = (selectId) => {
  const URL = `${URI}/disable-enable-service/${selectId}`;
  return del(URL);
};
const deleteCatalogue = (selectId) => {
  const URL = `${URI}/delete-catalogue/${selectId}`;
  return del(URL);
};
const deleteService = (selectId) => {
  const URL = `${URI}/${selectId}`;
  return del(URL);
};

const getServices = (brand_id, payload) => {
  const URL = `${URI}/get-services/${brand_id}`;
  return post(URL, payload);
};

const getCategoriesDropDown = (brand_id) => {
  const URL = `${URI}/drop-down/${brand_id}`;
  return get(URL);
};

const updateServiceSequence = (payload) => {
  const URL = `${URI}/update-sequence`;
  return put(URL, payload);
};

const ServicesCatalogue = {
  getCatalogues,
  addServiceCategory,
  getOneCategoryToUpdate,
  updateCatalogues,
  disableEnableCatalogue,
  deleteCatalogue,
  disableEnableService,
  deleteService,
  getOneServiceToUpdate,
  addService,
  updateService,
  getServices,
  getCategoriesDropDown,
  updateServiceSequence
};
export default ServicesCatalogue;
