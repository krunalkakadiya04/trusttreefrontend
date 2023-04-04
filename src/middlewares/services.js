import ServicesCatalogue from "../services/services";
import {
  addServiceCategoryError,
  addServiceCategoryRequest,
  addServiceCategorySuccess,
  addServiceError,
  addServiceRequest,
  addServiceSuccess,
  catalogueDropDownError,
  catalogueDropDownRequest,
  catalogueDropDownSuccess,
  deleteCatalogueError,
  deleteCatalogueRequest,
  deleteCatalogueSuccess,
  deleteServiceError,
  deleteServiceRequest,
  deleteServiceSuccess,
  disableCatalogueError,
  disableCatalogueRequest,
  disableCatalogueSuccess,
  disableServiceError,
  disableServiceRequest,
  disableServiceSuccess,
  getCataloguesError,
  getCataloguesRequest,
  getCataloguesSuccess,
  getOneCategoryToUpdateError,
  getOneCategoryToUpdateRequest,
  getOneCategoryToUpdateSuccess,
  getOneServiceToUpdateError,
  getOneServiceToUpdateRequest,
  getOneServiceToUpdateSuccess,
  getServiceSortingError,
  getServiceSortingRequest,
  getServiceSortingSuccess,
  updateCataloguesError,
  updateCataloguesRequest,
  updateCataloguesSuccess,
  updateServiceError,
  updateServiceRequest,
  updateServiceSequenceError,
  updateServiceSequenceRequest,
  updateServiceSequenceSuccess,
  updateServiceSuccess,
} from "../slices/services.slice";

export function getCatalogues(brand_id, payload) {
  return (dispatch) => {
    dispatch(getCataloguesRequest());
    ServicesCatalogue.getCatalogues(brand_id, payload)
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

export function getOneCategoryToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneCategoryToUpdateRequest());
    ServicesCatalogue.getOneCategoryToUpdate(selectId)
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
    ServicesCatalogue.updateCatalogues(payload, selectId)
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

export function addServiceCategory(payload, brand_id) {
  return (dispatch) => {
    dispatch(addServiceCategoryRequest());
    ServicesCatalogue.addServiceCategory(payload, brand_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addServiceCategorySuccess(message));
        } else {
          dispatch(addServiceCategoryError(error));
        }
      })
      .catch((error) => {
        dispatch(addServiceCategoryError(error));
      });
  };
}

export function addService(payload, brand_id) {
  return (dispatch) => {
    dispatch(addServiceRequest());
    ServicesCatalogue.addService(payload, brand_id)
      .then((response) => {
        const { message, data, status, error } = response.data;
        if (status === 1) {
          dispatch(addServiceSuccess({ message, data }));
        } else {
          dispatch(addServiceError(error));
        }
      })
      .catch((error) => {
        dispatch(addServiceError(error));
      });
  };
}

export function getOneServiceToUpdate(s_id) {
  return (dispatch) => {
    dispatch(getOneServiceToUpdateRequest());
    ServicesCatalogue.getOneServiceToUpdate(s_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneServiceToUpdateSuccess(data));
        } else {
          dispatch(getOneServiceToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneServiceToUpdateError(error));
      });
  };
}

export function updateService(payload, s_id, previousCatId) {
  return (dispatch) => {
    dispatch(updateServiceRequest());
    ServicesCatalogue.updateService(payload, s_id)
      .then((response) => {
        const { data, message, status, error } = response.data;
        if (status === 1) {
          dispatch(updateServiceSuccess({ message, data, previousCatId }));
        } else {
          dispatch(updateServiceError(error));
        }
      })
      .catch((error) => {
        dispatch(updateServiceError(error));
      });
  };
}

export function disableEnableServiceCategory(id) {
  return (dispatch) => {
    dispatch(disableCatalogueRequest());
    ServicesCatalogue.disableEnableCatalogue(id)
      .then((response) => {
        const { message, status, error } = response.data;
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
export function deleteServiceCategory(id) {
  return (dispatch) => {
    dispatch(deleteCatalogueRequest());
    ServicesCatalogue.deleteCatalogue(id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(deleteCatalogueSuccess(message));
        } else {
          dispatch(deleteCatalogueError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteCatalogueError(error));
      });
  };
}
export function disableEnableService(id) {
  return (dispatch) => {
    dispatch(disableServiceRequest());
    ServicesCatalogue.disableEnableService(id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(disableServiceSuccess(message));
        } else {
          dispatch(disableServiceError(error));
        }
      })
      .catch((error) => {
        dispatch(disableServiceError(error));
      });
  };
}
export function deleteService(id) {
  return (dispatch) => {
    dispatch(deleteServiceRequest());
    ServicesCatalogue.deleteService(id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(deleteServiceSuccess(message));
        } else {
          dispatch(deleteServiceError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteServiceError(error));
      });
  };
}

export function getServiceSorting(brand_id, payload) {
  return (dispatch) => {
    dispatch(getServiceSortingRequest());
    ServicesCatalogue.getServices(brand_id, payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getServiceSortingSuccess(data));
        } else {
          dispatch(getServiceSortingError(error));
        }
      })
      .catch((error) => {
        dispatch(getServiceSortingError(error));
      });
  };
}

export function getCategoryDropdown(brand_id) {
  return (dispatch) => {
    dispatch(catalogueDropDownRequest());
    ServicesCatalogue.getCategoriesDropDown(brand_id)
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

export function updateServiceSequence(payload) {
  return (dispatch) => {
    dispatch(updateServiceSequenceRequest());
    ServicesCatalogue.updateServiceSequence(payload)
      .then((response) => {
        const { status, error, message, data } = response.data;
        if (status === 1) {
          dispatch(updateServiceSequenceSuccess({ message, payload, data }));
        } else {
          dispatch(updateServiceSequenceError(error));
        }
      })
      .catch((error) => {
        dispatch(updateServiceSequenceError(error));
      });
  };
}
