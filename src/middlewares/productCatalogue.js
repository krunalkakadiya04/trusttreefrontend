import ProductsCatalogue from "../services/productCatalogue";
import {
  getCataloguesRequest,
  getCataloguesSuccess,
  getCataloguesError,
  addCataloguesRequest,
  addCataloguesSuccess,
  addCataloguesError,
  getOneCategoryToUpdateRequest,
  getOneCategoryToUpdateSuccess,
  getOneCategoryToUpdateError,
  updateCataloguesRequest,
  updateCataloguesSuccess,
  updateCataloguesError,
  deleteCataloguesRequest,
  deleteCataloguesSuccess,
  deleteCataloguesError,
  disableCatalogueRequest,
  disableCatalogueSuccess,
  disableCatalogueError,
  addProductToCategoryRequest,
  addProductToCategorySuccess,
  addProductToCategoryError,
  getOneProductToUpdateRequest,
  getOneProductToUpdateSuccess,
  getOneProductToUpdateError,
  updateProductsRequest,
  updateProductsSuccess,
  updateProductsError,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductError,
  disableProductRequest,
  disableProductSuccess,
  disableProductError,
  getProductSortingRequest,
  getProductSortingSuccess,
  getProductSortingError,
  catalogueDropDownRequest,
  catalogueDropDownSuccess,
  catalogueDropDownError,
  updateProductSequenceRequest,
  updateProductSequenceSuccess,
  updateProductSequenceError,
} from "../slices/productCatalogue.slice";

export function getCatalogues(brand_id, payload) {
  return (dispatch) => {
    dispatch(getCataloguesRequest());
    ProductsCatalogue.getCatalogues(brand_id, payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getCataloguesSuccess(data));
        } else {
          dispatch(getCataloguesError(error));
        }
      })
      .catch((error) => {
        dispatch(getCataloguesError(error));
      });
  };
}

export function addCatalogues(payload, brand_id) {
  return (dispatch) => {
    dispatch(addCataloguesRequest());
    ProductsCatalogue.addCatalogues(payload, brand_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addCataloguesSuccess(message));
        } else {
          dispatch(addCataloguesError(error));
        }
      })
      .catch((error) => {
        dispatch(addCataloguesError(error));
      });
  };
}

export function getOneCategoryToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneCategoryToUpdateRequest());
    ProductsCatalogue.getOneCategoryToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneCategoryToUpdateSuccess(data));
        } else {
          dispatch(getOneCategoryToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneCategoryToUpdateError(error));
      });
  };
}

export function updateCatalogues(payload, selectId) {
  return (dispatch) => {
    dispatch(updateCataloguesRequest());
    ProductsCatalogue.updateCatalogues(payload, selectId)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(updateCataloguesSuccess(message));
        } else {
          dispatch(updateCataloguesError(error));
        }
      })
      .catch((error) => {
        dispatch(updateCataloguesError(error));
      });
  };
}

export function deleteCatalogues(staff_Id) {
  return (dispatch) => {
    dispatch(deleteCataloguesRequest());
    ProductsCatalogue.deleteCatalogues(staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(deleteCataloguesSuccess(message));
        } else {
          dispatch(deleteCataloguesError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteCataloguesError(error));
      });
  };
}

export function disableCatalogue(staff_Id) {
  return (dispatch) => {
    dispatch(disableCatalogueRequest());
    ProductsCatalogue.disableCatalogue(staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(disableCatalogueSuccess(message));
        } else {
          dispatch(disableCatalogueError(error));
        }
      })
      .catch((error) => {
        dispatch(disableCatalogueError(error));
      });
  };
}

export function addProductToCategory(payload, b_id) {
  return (dispatch) => {
    dispatch(addProductToCategoryRequest());
    ProductsCatalogue.addProductToCategory(payload, b_id)
      .then((response) => {
        const { message, status, error, data } = response.data;
        if (status === 1) {
          dispatch(addProductToCategorySuccess({ message, data, b_id }));
        } else {
          dispatch(addProductToCategoryError(error));
        }
      })
      .catch((error) => {
        dispatch(addProductToCategoryError(error));
      });
  };
}

export function getOneProductToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneProductToUpdateRequest());
    ProductsCatalogue.getOneProductToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneProductToUpdateSuccess(data));
        } else {
          dispatch(getOneProductToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneProductToUpdateError(error));
      });
  };
}

export function updateProducts(payload, selectId, previousCatId) {
  return (dispatch) => {
    dispatch(updateProductsRequest());
    ProductsCatalogue.updateProducts(payload, selectId)
      .then((response) => {
        const { message, status, error, data } = response.data;
        if (status === 1) {
          dispatch(updateProductsSuccess({ message, data, previousCatId }));
        } else {
          dispatch(updateProductsError(error));
        }
      })
      .catch((error) => {
        dispatch(updateProductsError(error));
      });
  };
}

export function deleteProduct(staff_Id) {
  return (dispatch) => {
    dispatch(deleteProductRequest());
    ProductsCatalogue.deleteProduct(staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(deleteProductSuccess(message));
        } else {
          dispatch(deleteProductError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteProductError(error));
      });
  };
}

export function disableProduct(staff_Id) {
  return (dispatch) => {
    dispatch(disableProductRequest());
    ProductsCatalogue.disableProduct(staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(disableProductSuccess(message));
        } else {
          dispatch(disableProductError(error));
        }
      })
      .catch((error) => {
        dispatch(disableProductError(error));
      });
  };
}

export function getProductSorting(brand_id, payload) {
  return (dispatch) => {
    dispatch(getProductSortingRequest());
    ProductsCatalogue.getProductSorting(brand_id, payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getProductSortingSuccess(data));
        } else {
          dispatch(getProductSortingError(error));
        }
      })
      .catch((error) => {
        dispatch(getProductSortingError(error));
      });
  };
}

export function getCategoryDropdown(brand_id) {
  return (dispatch) => {
    dispatch(catalogueDropDownRequest());
    ProductsCatalogue.getCategoriesDropDown(brand_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(catalogueDropDownSuccess(data));
        } else {
          dispatch(catalogueDropDownError(error));
        }
      })
      .catch((error) => {
        dispatch(catalogueDropDownError(error));
      });
  };
}

export function updateProductSequence(payload) {
  return (dispatch) => {
    dispatch(updateProductSequenceRequest());
    ProductsCatalogue.updateProductSequence(payload)
      .then((response) => {
        const { status, error, message, data } = response.data;
        if (status === 1) {
          dispatch(updateProductSequenceSuccess({ message, payload, data }));
        } else {
          dispatch(updateProductSequenceError(error));
        }
      })
      .catch((error) => {
        dispatch(updateProductSequenceError(error));
      });
  };
}
