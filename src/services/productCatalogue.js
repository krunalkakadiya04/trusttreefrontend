import { del, get, post, postFormData, put, putFormData } from ".";

const URI = "/brands/pro-catalogue";

const getCatalogues = (brand_id, payload) => {
  const URL = `${URI}/${brand_id}`;
  return post(URL, payload);
};

const addCatalogues = (payload, brand_id) => {
  const URL = `${URI}/create/${brand_id}`;
  return post(URL, payload);
};

const getOneCategoryToUpdate = (selectId) => {
  const URL = `${URI}/get-single-catalogue/${selectId}`;
  return get(URL);
};

const updateCatalogues = (payload, selectId) => {
  const URL = `${URI}/update/${selectId}`;
  return put(URL, payload);
};

const deleteCatalogues = (selectId) => {
  const URL = `${URI}/delete-catalogue/${selectId}`;
  return del(URL);
};

const disableCatalogue = (selectId) => {
  const URL = `${URI}/disable-enable/${selectId}`;
  return del(URL);
};

const addProductToCategory = (payload, b_id) => {
  const URL = `${URI}/add-product/${b_id}`;
  return postFormData(URL, payload);
};

const getOneProductToUpdate = (selectId) => {
  const URL = `${URI}/get-single-product/${selectId}`;
  return get(URL);
};

const updateProducts = (payload, selectId) => {
  const URL = `${URI}/${selectId}`;
  return putFormData(URL, payload);
};

const deleteProduct = (selectId) => {
  const URL = `${URI}/${selectId}`;
  return del(URL);
};

const disableProduct = (selectId) => {
  const URL = `${URI}/disable-enable-product/${selectId}`;
  return del(URL);
};

const getProductSorting = (payload, brand_id) => {
  const URL = `${URI}/get-products/${brand_id}`;
  return post(URL, payload);
};
const getCategoriesDropDown = (brand_id) => {
  const URL = `${URI}/drop-down/${brand_id}`;
  return get(URL);
};

const updateProductSequence = (payload) => {
  const URL = `${URI}/update-sequence`;
  return put(URL, payload);
}

const ProductsCatalogue = {
  getCatalogues,
  addCatalogues,
  getOneCategoryToUpdate,
  updateCatalogues,
  deleteCatalogues,
  disableCatalogue,
  addProductToCategory,
  getOneProductToUpdate,
  updateProducts,
  deleteProduct,
  disableProduct,
  getProductSorting,
  getCategoriesDropDown,
  updateProductSequence
};
export default ProductsCatalogue;
