import { createSlice, current } from "@reduxjs/toolkit";
import { PRODUCT_CATALOGUE } from "./slice-names";

export const productCatalogueSlice = createSlice({
  name: PRODUCT_CATALOGUE,
  initialState: {
    loading: true,
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
    isFilter: false,
    appliedFiltersCount: 0,

    productLoading: false,
    productCategory: [],
    productError: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    productSaveLoading: false,
    productSaveMessage: null,
    productSaveError: null,

    updateLoading: false,
    singleCategory: null,
    updateError: "",

    productUpdateLoading: false,
    singleProduct: null,
    productUpdateError: "",

    saveUpdateLoading: false,
    saveUpdateMessage: null,
    saveUpdateError: null,

    productSaveUpdateLoading: true,
    productSaveUpdateMessage: null,
    productSaveUpdateError: null,

    deleteLoading: false,
    deleteMessage: null,
    deleteError: null,

    productDeleteLoading: false,
    productDeleteMessage: null,
    productDeleteError: null,

    disableLoading: false,
    disableMessage: null,
    disableError: null,

    productDisableLoading: false,
    productDisableMessage: null,
    productDisableError: null,

    productSortingLoading: false,
    productSorting: [],
    productSortingError: null,

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
      state.saveUpdateMessage = null;
      state.deleteMessage = null;
      state.disableMessage = null;
      state.productDeleteMessage = null;
      state.productDisableMessage = null;
      state.catalogueDropDownError = null;
      state.dropDownCatalogue = [];
    },
    getCataloguesSuccess: (state, action) => {
      state.loading = false;
      const data =
        action.payload &&
        action.payload.data &&
        action.payload.data.map((o) => {
          return { isOpen: false, productPagination: null, ...o };
        });
      state.catalogue = data;
      state.pagination = action.payload.metaData;
      state.languages = action.payload.lang_det;
    },
    getCataloguesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCataloguesRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addCataloguesSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addCataloguesError: (state, action) => {
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
      state.updateLoading = true;
      state.updateError = "";
      state.singleCategory = null;
    },
    getOneCategoryToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleCategory = action.payload;
    },
    getOneCategoryToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
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
    deleteCataloguesRequest: (state) => {
      state.deleteLoading = true;
      state.deleteMessage = null;
      state.deleteError = null;
    },
    deleteCataloguesSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteMessage = action.payload;
    },
    deleteCataloguesError: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
    resetForm: (state) => {
      state.catalogue = null;
    },
    resetFormUpdate: (state) => {
      state.singleCategory = null;
      state.singleProduct = null;
      state.productSaveUpdateMessage = null;
      state.productSaveMessage = null;
    },
    disableCatalogueRequest: (state) => {
      state.disableLoading = true;
      state.disableMessage = null;
      state.disableError = null;
    },
    disableCatalogueSuccess: (state, action) => {
      state.disableLoading = false;
      state.disableMessage = action.payload;
    },
    disableCatalogueError: (state, action) => {
      state.disableLoading = false;
      state.disableError = action.payload;
    },
    getProductToCategoryRequest: (state) => {
      state.productLoading = true;
      state.productError = "";
    },
    getProductToCategorySuccess: (state, action) => {
      state.productLoading = false;
      state.productCategory = action.payload;
    },
    getProductToCategoryError: (state, action) => {
      state.productLoading = false;
      state.productError = action.payload;
    },
    addProductToCategoryRequest: (state) => {
      state.productSaveLoading = true;
      state.productSaveError = null;
    },
    addProductToCategorySuccess: (state, action) => {
      const data = current(state.catalogue);
      state.productSaveLoading = false;
      state.catalogue = data.map((o) => {
        const products = [...o.product];
        if (o._id === action.payload.b_id) {
          products.push(action.payload.data[0]);
        }
        return { ...o, product: products };
      });
      state.productSaveMessage = action.payload;
    },
    addProductToCategoryError: (state, action) => {
      state.productSaveLoading = false;
      state.productSaveError = action.payload;
      state.productSaveMessage = null;
    },
    getOneProductToUpdateRequest: (state) => {
      state.productUpdateLoading = true;
      state.productUpdateError = "";
      state.singleProduct = null;
    },
    getOneProductToUpdateSuccess: (state, action) => {
      state.productUpdateLoading = false;
      state.singleProduct = action.payload;
    },
    getOneProductToUpdateError: (state, action) => {
      state.productUpdateLoading = false;
      state.productUpdateError = action.payload;
    },
    updateProductsRequest: (state) => {
      state.productSaveUpdateLoading = true;
      state.productSaveUpdateMessage = null;
      state.productSaveUpdateError = null;
    },
    updateProductsSuccess: (state, action) => {
      const data = current(state.catalogue);

      state.productSaveUpdateLoading = false;
      state.catalogue = data.map((o) => {
        const products = [...o.product];
        const productIndex = products.findIndex(
          (obj) => obj._id && obj._id === action.payload.data[0]._id
        );

        if (
          action.payload.previousCatId ===
          action.payload.data[0].product_catalogue_id
        ) {
          if (productIndex >= 0) {
            products.splice(productIndex, 1, action.payload.data[0]);
          }
        }
        if (
          action.payload.previousCatId !==
          action.payload.data[0].product_catalogue_id
        ) {
          const productPriviousIndex = products.findIndex((obj) => {
            return obj.product_catalogue_id === action.payload.previousCatId;
          });
          if (productPriviousIndex > -1) {
            products.splice(productIndex, 1);
          }
          if (
            o._id === action.payload.data[0].product_catalogue_id &&
            o.isOpen
          ) {
            products.push(action.payload.data[0]);
          }
        }

        return { ...o, product: products };
      });
      state.productSaveUpdateMessage = action.payload.message;
    },
    updateProductsError: (state, action) => {
      state.productSaveUpdateLoading = false;
      state.productSaveUpdateError = action.payload;
    },
    deleteProductRequest: (state) => {
      state.productDeleteLoading = true;
      state.productDeleteMessage = null;
      state.productDeleteError = null;
    },
    deleteProductSuccess: (state, action) => {
      state.productDeleteLoading = false;
      state.productDeleteMessage = action.payload;
    },
    deleteProductError: (state, action) => {
      state.productDeleteLoading = false;
      state.productDeleteError = action.payload;
    },
    disableProductRequest: (state) => {
      state.productDisableLoading = true;
      state.productDisableMessage = null;
      state.productDisableError = null;
    },
    disableProductSuccess: (state, action) => {
      state.productDisableLoading = false;
      state.productDisableMessage = action.payload;
    },
    disableProductError: (state, action) => {
      state.productDisableLoading = false;
      state.productDisableError = action.payload;
    },
    getProductSortingRequest: (state) => {
      state.productSortingLoading = true;
      state.productSorting = null;
      state.productSortingError = null;
    },
    getProductSortingSuccess: (state, action) => {
      state.productSortingLoading = false;
      const data = current(state.catalogue);
      state.catalogue = data.map((o) => {
        let products = [...o.product];
        let pagination = { ...o.productPagination };
        action.payload &&
          action.payload.map((obj) => {
            if (o._id === obj.catalogue) {
              products = obj.product;
              pagination = obj.metaData;
            }
            return obj;
          });
        return { ...o, product: products, productPagination: pagination };
      });
    },
    getProductSortingError: (state, action) => {
      state.productSortingLoading = false;
      state.productSortingError = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filter = { ...action.payload, is_active: true };
      state.appliedFiltersCount = getAppliedFiltersCount(action.payload);
    },
    clearFilter: (state, action) => {
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
    updateProductSequenceRequest: (state) => {
      state.sequenceLoading = true;
      state.sequenceMessage = null;
      state.sequenceError = null;
    },
    updateProductSequenceSuccess: (state, action) => {
      const data = current(state.catalogue);
      state.sequenceLoading = false;
      state.sequenceMessage = action.payload.message;
      state.catalogue = data.map((o) => {
        let products = [...o.product];
        if (o._id === action.payload.payload.product_catalogue_id) {
          products = action.payload.data;
        }
        return { ...o, product: products };
      });
    },
    updateProductSequenceError: (state, action) => {
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
  addCataloguesRequest,
  addCataloguesSuccess,
  addCataloguesError,
  isOpenModalById,
  isOpenAllModal,
  isCloseAllModal,
  getOneCategoryToUpdateRequest,
  getOneCategoryToUpdateSuccess,
  getOneCategoryToUpdateError,
  updateCataloguesRequest,
  updateCataloguesSuccess,
  updateCataloguesError,
  deleteCataloguesRequest,
  deleteCataloguesSuccess,
  deleteCataloguesError,
  resetForm,
  resetFormUpdate,
  setFilterValue,
  disableCatalogueRequest,
  disableCatalogueSuccess,
  disableCatalogueError,
  getProductToCategoryRequest,
  getProductToCategorySuccess,
  getProductToCategoryError,
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
  clearFilter,
  catalogueDropDownError,
  catalogueDropDownSuccess,
  catalogueDropDownRequest,
  updateProductSequenceRequest,
  updateProductSequenceSuccess,
  updateProductSequenceError
} = productCatalogueSlice.actions;

export default productCatalogueSlice.reducer;
