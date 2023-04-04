import { createSlice, current } from "@reduxjs/toolkit";
import { SERVICE_CATALOGUE } from "./slice-names";

export const serviceCatalogueSlice = createSlice({
  name: SERVICE_CATALOGUE,
  initialState: {
    loading: false,
    catalogue: [],

    message: "",
    error: "",
    languages: null,
    pagination: null,
    filter: {
      experience_key: [],
      rating: { min: 0, max: 5 },
      price: { min: 0, max: 10000 },
      status: { enable: false, disable: false },
      branch_id: [],
    },
    appliedFiltersCount: 0,

    categoryUpdateLoading: false,
    categoryUpdateError: null,
    singleCategory: null,

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    saveUpdateLoading: false,
    saveUpdateMessage: null,
    saveUpdateError: null,

    disableCategoryLoading: false,
    disableCategoryMessage: null,
    disableCategoryError: null,

    deleteCategoryLoading: false,
    deleteCategoryMessage: null,
    deleteCategoryError: null,

    disableServiceLoading: false,
    disableServiceMessage: null,
    disableServiceError: null,

    deleteServiceLoading: false,
    deleteServiceMessage: null,
    deleteServiceError: null,

    serviceSaveUpdateLoading: false,
    serviceSaveUpdateMessage: null,
    serviceSaveUpdateError: null,

    serviceSaveLoading: false,
    serviceSaveError: null,
    serviceSaveMessage: null,

    serviceUpdateLoading: false,
    serviceUpdateError: null,
    singleService: null,

    serviceSortingLoading: false,
    serviceSorting: null,
    serviceSortingError: null,

    catalogueDropDownLoading: false,
    catalogueDropDownError: null,
    dropDownCatalogue: [],

    sequenceLoading: false,
    sequenceMessage: null,
    sequenceError: null
  },
  reducers: {
    getCataloguesRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
      state.singleCategory = null;
      state.singleService = null;
      state.saveUpdateMessage = null;
      state.disableCategoryMessage = null;
      state.disableServiceMessage = null;
      state.deleteServiceMessage = null;
      state.deleteCategoryMessage = null;
      state.serviceSaveError = null;
      state.serviceSaveMessage = null;
      state.serviceSaveUpdateMessage = null;
      state.serviceSaveUpdateError = null;
      state.catalogueDropDownError = null;

      state.dropDownCatalogue = [];
    },
    getCataloguesSuccess: (state, action) => {
      state.loading = false;
      state.catalogue =
        action.payload.data &&
        action.payload.data.map((o) => {
          return { isOpen: false, servicePagination: null, ...o };
        });
      state.pagination = action.payload.metaData;
      state.languages = action.payload.lang_det;
    },
    getCataloguesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getServicesListingRequest: (state) => {
    //   state.loading = true;
    //   state.error = "";
    // },
    // getServicesListingSuccess: (state, action) => {
    //   state.loading = false;
    //   const prevCatalogue = current(state.catalogue);
    //   state.catalogue = prevCatalogue.map((o) => {
    //     const newObj = { ...o };
    //     if (o._id === action.payload.brand_id) {
    //       newObj.services = action.payload.data;
    //     }
    //     return newObj;
    //   });
    // },
    // getServicesListingError: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    addServiceCategoryRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addServiceCategorySuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addServiceCategoryError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    isOpenModalById: (state, action) => {
      const prevCatalogue = current(state.catalogue);
      state.catalogue = prevCatalogue.map((o) => {
        const newObj = { ...o };
        if (o._id === action.payload) {
          newObj.isOpen = !newObj.isOpen;
        }
        return newObj;
      });
    },
    isOpenAllModal: (state) => {
      const prevCatalogue = current(state.catalogue);
      state.catalogue = prevCatalogue.map((o) => {
        const newObj = { ...o };
        newObj.isOpen = true;
        return newObj;
      });
    },
    isCloseAllModal: (state) => {
      const prevCatalogue = current(state.catalogue);
      state.catalogue = prevCatalogue.map((o) => {
        const newObj = { ...o };
        newObj.isOpen = false;
        return newObj;
      });
    },
    getOneCategoryToUpdateRequest: (state) => {
      state.categoryUpdateLoading = true;
      state.categoryUpdateError = null;
      state.singleCategory = null;
    },
    getOneCategoryToUpdateSuccess: (state, action) => {
      state.categoryUpdateLoading = false;
      state.singleCategory = action.payload;
    },
    getOneCategoryToUpdateError: (state, action) => {
      state.categoryUpdateLoading = false;
      state.categoryUpdateError = action.payload;
    },
    updateCataloguesRequest: (state) => {
      state.saveUpdateLoading = true;
      state.saveUpdateMessage = null;
      state.saveUpdateError = null;
    },
    updateCataloguesSuccess: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateMessage = action.payload;
    },
    updateCataloguesError: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateError = action.payload;
    },

    disableCatalogueRequest: (state) => {
      state.disableCategoryLoading = true;
      state.disableCategoryMessage = null;
      state.disableCategoryError = null;
    },
    disableCatalogueSuccess: (state, action) => {
      state.disableCategoryLoading = false;
      state.disableCategoryMessage = action.payload;
    },
    disableCatalogueError: (state, action) => {
      state.disableCategoryLoading = false;
      state.disableCategoryError = action.payload;
    },
    deleteCatalogueRequest: (state) => {
      state.deleteCategoryLoading = true;
      state.deleteCategoryMessage = null;
      state.deleteCategoryError = null;
    },
    deleteCatalogueSuccess: (state, action) => {
      state.deleteCategoryLoading = false;
      state.deleteCategoryMessage = action.payload;
    },
    deleteCatalogueError: (state, action) => {
      state.deleteCategoryLoading = false;
      state.deleteCategoryError = action.payload;
    },

    getOneServiceToUpdateRequest: (state) => {
      state.serviceUpdateLoading = true;
      state.serviceUpdateError = null;
      state.singleService = null;
    },
    getOneServiceToUpdateSuccess: (state, action) => {
      state.serviceUpdateLoading = false;
      state.singleService = action.payload;
    },
    getOneServiceToUpdateError: (state, action) => {
      state.serviceUpdateLoading = false;
      state.serviceUpdateError = action.payload;
    },
    updateServiceRequest: (state) => {
      state.serviceSaveUpdateLoading = true;
      state.serviceSaveUpdateError = null;
      state.serviceSaveUpdateMessage = null;
    },
    updateServiceSuccess: (state, action) => {
      const data = current(state.catalogue);
      state.serviceSaveUpdateLoading = false;
      state.catalogue = data.map((o) => {
        const service = [...o.services];
        const serviceIndex = service.findIndex(
          (obj) => obj._id && obj._id === action.payload.data[0]._id
        );
        if (
          action.payload.previousCatId ===
          action.payload.data[0].service_catalogue_id
        ) {
          if (serviceIndex >= 0) {
            service.splice(serviceIndex, 1, action.payload.data[0]);
          }
        }
        if (
          action.payload.previousCatId !==
          action.payload.data[0].service_catalogue_id
        ) {
          const servicePriviousIndex = service.findIndex((obj) => {
            return obj.service_catalogue_id === action.payload.previousCatId;
          });
          if (servicePriviousIndex > -1) {
            service.splice(serviceIndex, 1);
          }
          if (
            o._id === action.payload.data[0].service_catalogue_id &&
            o.isOpen
          ) {
            service.push(action.payload.data[0]);
          }
        }
        return { ...o, services: service };
      });
      state.serviceSaveUpdateMessage = action.payload;
    },
    updateServiceError: (state, action) => {
      state.serviceSaveUpdateLoading = false;
      state.serviceSaveUpdateError = action.payload;
    },
    addServiceRequest: (state) => {
      state.serviceSaveLoading = true;
      state.serviceSaveError = null;
      state.serviceSaveMessage = null;
    },
    addServiceSuccess: (state, action) => {
      const data = current(state.catalogue);
      state.serviceSaveLoading = false;
      state.catalogue = data.map((o) => {
        const services = [...o.services];
        if (o._id === action.payload.data[0].service_catalogue_id) {
          services.push(action.payload.data[0]);
        }
        return { ...o, services: services };
      });
      state.serviceSaveMessage = action.payload.message;
    },
    addServiceError: (state, action) => {
      state.serviceSaveLoading = false;
      state.serviceSaveError = action.payload;
    },
    disableServiceRequest: (state) => {
      state.disableServiceLoading = true;
      state.disableServiceMessage = null;
      state.disableServiceError = null;
    },
    disableServiceSuccess: (state, action) => {
      state.disableServiceLoading = false;
      state.disableServiceMessage = action.payload;
    },
    disableServiceError: (state, action) => {
      state.disableServiceLoading = false;
      state.disableServiceError = action.payload;
    },
    deleteServiceRequest: (state) => {
      state.deleteServiceLoading = true;
      state.deleteServiceMessage = null;
      state.deleteServiceError = null;
    },
    deleteServiceSuccess: (state, action) => {
      state.deleteServiceLoading = false;
      state.deleteServiceMessage = action.payload;
    },
    deleteServiceError: (state, action) => {
      state.deleteServiceLoading = false;
      state.deleteServiceError = action.payload;
    },
    resetForm: (state) => {
      state.catalogue = [];
    },
    resetFormUpdate: (state) => {
      state.singleCategory = null;
      state.singleService = null;
      state.saveUpdateMessage = null;
      state.saveMessage = null;
      state.serviceSaveMessage = null;
      state.serviceSaveUpdateMessage = null;
    },
    getServiceSortingRequest: (state) => {
      state.serviceSortingLoading = true;
      state.serviceSorting = null;
      state.serviceSortingError = null;
    },
    getServiceSortingSuccess: (state, action) => {
      state.serviceSortingLoading = false;
      const data = current(state.catalogue);
      state.catalogue = data.map((o) => {
        let service = [...o.services];
        let pagination = { ...o.servicePagination };
        action.payload &&
          action.payload.map((obj) => {
            if (o._id === obj.catalogue) {
              service = obj.services;
              pagination = obj.metaData;
            }
            return obj;
          });
        return { ...o, services: service, servicePagination: pagination };
      });
    },
    getServiceSortingError: (state, action) => {
      state.serviceSortingLoading = false;
      state.serviceSortingError = action.payload;
    },
    setServiceFilterValue: (state, action) => {
      state.filter = { ...action.payload, is_active: true };
      state.appliedFiltersCount = getAppliedFiltersCount(action.payload);
    },
    clearServiceFilter: (state, action) => {
      state.filter = { ...action.payload };
      state.appliedFiltersCount = 0;
    },
    catalogueDropDownRequest: (state, action) => {
      state.catalogueDropDownLoading = true;
      state.catalogueDropDownError = null;
      state.dropDownCatalogue = [];
    },
    catalogueDropDownSuccess: (state, action) => {
      state.catalogueDropDownLoading = false;
      state.dropDownCatalogue = action.payload;
    },
    catalogueDropDownError: (state, action) => {
      state.catalogueDropDownLoading = false;
      state.catalogueDropDownError = action.payload;
    },
    updateServiceSequenceRequest: (state) => {
      state.sequenceLoading = true;
      state.sequenceMessage = null;
      state.sequenceError = null;
    },
    updateServiceSequenceSuccess: (state, action) => {
      const data = current(state.catalogue);
      state.sequenceLoading = false;
      state.sequenceMessage = action.payload.message;
      state.catalogue = data.map((o) => {
        let service = [...o.services];
        if (o._id === action.payload.payload.service_catalogue_id) {
          service = action.payload.data
        }
        return { ...o, services: service };
      })
    },
    updateServiceSequenceError: (state, action) => {
      state.sequenceLoading = false;
      state.sequenceError = action.payload;
    },
  },
});

const getAppliedFiltersCount = (filters) => {
  let appliedCounter = 0;
  if (
    filters.rating &&
    (filters.rating.min !== 0 || filters.rating.max !== 5)
  ) {
    appliedCounter += 1;
  }
  if (filters.branch_id && filters.branch_id.length > 0) {
    appliedCounter += 1;
  }
  if (filters.experience_key && filters.experience_key.length > 0) {
    appliedCounter += 1;
  }
  if (
    filters.status &&
    (filters.status.enable !== false || filters.status.disable !== false)
  ) {
    appliedCounter += 1;
  }
  if (
    filters.price &&
    (filters.price.min !== 0 || filters.price.max !== 10000)
  ) {
    appliedCounter += 1;
  }
  return appliedCounter;
};

export const {
  getCataloguesRequest,
  getCataloguesSuccess,
  getCataloguesError,
  addServiceCategoryRequest,
  addServiceCategorySuccess,
  addServiceCategoryError,
  isCloseAllModal,
  isOpenAllModal,
  isOpenModalById,
  getOneServiceToUpdateRequest,
  getOneServiceToUpdateSuccess,
  getOneServiceToUpdateError,
  getOneCategoryToUpdateRequest,
  getOneCategoryToUpdateSuccess,
  getOneCategoryToUpdateError,
  updateCataloguesRequest,
  updateCataloguesSuccess,
  updateCataloguesError,
  resetFormUpdate,
  resetForm,
  disableCatalogueError,
  disableCatalogueSuccess,
  disableCatalogueRequest,
  deleteCatalogueRequest,
  deleteCatalogueSuccess,
  deleteCatalogueError,
  disableServiceRequest,
  disableServiceSuccess,
  disableServiceError,
  deleteServiceRequest,
  deleteServiceSuccess,
  deleteServiceError,
  addServiceRequest,
  addServiceError,
  addServiceSuccess,
  updateServiceError,
  updateServiceSuccess,
  updateServiceRequest,
  setServiceFilterValue,
  clearServiceFilter,
  getServiceSortingRequest,
  getServiceSortingSuccess,
  getServiceSortingError,
  catalogueDropDownError,
  catalogueDropDownSuccess,
  catalogueDropDownRequest,
  updateServiceSequenceRequest,
  updateServiceSequenceSuccess,
  updateServiceSequenceError
  // reset_form
} = serviceCatalogueSlice.actions;

export default serviceCatalogueSlice.reducer;
