import Brands from "../services/brands";
import {
  addBrandError,
  addBrandRequest,
  addBrandSuccess,
  disableEnableBrandError,
  disableEnableBrandRequest,
  disableEnableBrandSuccess,
  dropDownBrandsError,
  dropDownBrandsRequest,
  dropDownBrandsSuccess,
  getbrandListingError,
  getbrandListingRequest,
  getbrandListingSuccess,
  getCurrencyError,
  getCurrencyRequest,
  getCurrencySuccess,
  getLanguagesError,
  getLanguagesRequest,
  getLanguagesSuccess,
  getOneBrandToUpdateError,
  getOneBrandToUpdateRequest,
  getOneBrandToUpdateSuccess,
  updateBrandError,
  updateBrandRequest,
  updateBrandSuccess,
} from "../slices/brands.slice";

export function getbrandListing(payload) {
  return (dispatch) => {
    dispatch(getbrandListingRequest());
    Brands.getbrandListing(payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getbrandListingSuccess(data));
        } else {
          dispatch(getbrandListingError(error));
        }
      })
      .catch((error) => {
        dispatch(getbrandListingError(error));
      });
  };
}

export function getbrandsforDropdown() {
  return (dispatch) => {
    dispatch(dropDownBrandsRequest());
    Brands.getbrandforDropDown()
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(dropDownBrandsSuccess(data));
        } else {
          dispatch(dropDownBrandsError(error));
        }
      })
      .catch((error) => {
        dispatch(dropDownBrandsError(error));
      });
  };
}

export function addBrand(payload) {
  return (dispatch) => {
    dispatch(addBrandRequest());
    Brands.addBrand(payload)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addBrandSuccess(message));
        } else {
          dispatch(addBrandError(error));
        }
      })
      .catch((error) => {
        dispatch(addBrandError(error));
      });
  };
}

export function getOneBrandToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneBrandToUpdateRequest());
    Brands.getOneBrandToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneBrandToUpdateSuccess(data));
        } else {
          dispatch(getOneBrandToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneBrandToUpdateError(error));
      });
  };
}

export function updateBrand(payload, brand_id) {
  return (dispatch) => {
    dispatch(updateBrandRequest());
    Brands.updateBrand(payload, brand_id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateBrandSuccess(message));
        } else {
          dispatch(updateBrandError(error));
        }
      })
      .catch((error) => {
        dispatch(updateBrandError(error));
      });
  };
}

export function getLanguages() {
  return (dispatch) => {
    dispatch(getLanguagesRequest());
    Brands.getLanguages()
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getLanguagesSuccess(data));
        } else {
          dispatch(getLanguagesError(error));
        }
      })
      .catch((error) => {
        dispatch(getLanguagesError(error));
      });
  };
}

export function getCurrency() {
  return (dispatch) => {
    dispatch(getCurrencyRequest());
    Brands.getCurrency()
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getCurrencySuccess(data));
        } else {
          dispatch(getCurrencyError(error));
        }
      })
      .catch((error) => {
        dispatch(getCurrencyError(error));
      });
  };
}

export function disableEnableBrand(b_id) {
  return (dispatch) => {
    dispatch(disableEnableBrandRequest());
    Brands.disEnableBrandsByID(b_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(disableEnableBrandSuccess(message));
        } else {
          dispatch(disableEnableBrandError(error));
        }
      })
      .catch((error) => {
        dispatch(disableEnableBrandError(error));
      });
  };
}
