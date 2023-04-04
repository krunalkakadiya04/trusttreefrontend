import { createSlice, current } from "@reduxjs/toolkit";

import { BRANDS } from "./slice-names";

const initialFilterObj = {
  trustree_rating: {
    min: 0,
    max: 5,
  },
  google_rating: {
    min: 0,
    max: 5,
  },
  low_category: [],
  best_category: [],
  team: {
    min: 0,
    max: 20,
  },
  is_disable: { enable: false, disable: false },
  date: [null, null],
};

export const brandSlice = createSlice({
  name: BRANDS,
  initialState: {
    loading: true,
    brands: [],
    message: "",
    error: "",
    pagination: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    updateLoading: false,
    singleBrand: null,
    updateError: "",

    dropDownBrandsLoading: false,
    dropDownBrands: [],
    dropDownBrandsError: null,

    saveUpdateLoading: false,
    saveUpdateMessage: null,
    saveUpdateError: null,

    disEnableLoading: false,
    disEnableMessage: null,
    disEnableError: null,

    languageLoading: false,
    AllLanguages: null,
    languageError: "",

    currencyLoading: false,
    AllCurrency: null,
    currencyError: "",

    // filter: {
    //   trustree_rating: {
    //     min: 0,
    //     max: 5,
    //   },
    //   google_rating: {
    //     min: 0,
    //     max: 5,
    //   },
    //   low_category: [],
    //   best_category: [],
    //   team: {
    //     min: 0,
    //     max: 20,
    //   },
    //   is_disable: { enable: false, disable: false },
    //   date: [null, null],
    // },
    // appliedFiltersCount: 0,
  },
  reducers: {
    getbrandListingRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = "";
      state.saveUpdateMessage = null;
      state.singleBrand = null;
      state.disEnableMessage = null;
      state.disEnableError = null;
    },
    getbrandListingSuccess: (state, action) => {
      state.loading = false;
      const data =
        action.payload.data &&
        action.payload.data.map((o) => {
          return {
            isOpen: false,
            isFilterOpen: false,
            branches: [],
            ...o,
            filter: initialFilterObj,
            appliedFiltersCount: 0,
          };
        });
      state.brands = data;
      state.pagination = action.payload.metaData;
      state.saveUpdateMessage = null;
    },
    getbrandListingError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBrandRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addBrandSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addBrandError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    isOpenModalById: (state, action) => {
      const prevBrands = current(state.brands);
      state.brands = prevBrands.map((o) => {
        const newObj = { ...o, isFilterOpen: false };
        if (o._id === action.payload) {
          newObj.isOpen = !newObj.isOpen;
        }
        return newObj;
      });
    },
    setFilterToggle: (state, action) => {
      const prevBrands = current(state.brands);
      state.brands = prevBrands.map((o, i) => {
        const newObj = { ...o };
        if (i === action.payload) {
          newObj.isFilterOpen = !newObj.isFilterOpen;
        } else {
          newObj.isFilterOpen = false;
        }
        return newObj;
      });
    },
    isBrandBranches: (state, action) => {
      const prevBrands = current(state.brands);
      state.brands = prevBrands.map((o) => {
        const newObj = { ...o };
        if (o._id === action.payload) {
          newObj.isOpen = !newObj.isOpen;
        }
        return newObj;
      });
    },
    getBranchesListingRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    getBranchesListingSuccess: (state, action) => {
      state.loading = false;
      const prevBrands = current(state.brands);
      state.brands = prevBrands.map((o) => {
        const newObj = { ...o };
        if (o._id === action.payload.brand_id) {
          newObj.branches = action.payload.data;
        }
        return newObj;
      });
    },
    getBranchesListingError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getOneBrandToUpdateRequest: (state) => {
      state.updateLoading = true;
      state.updateError = "";
      state.saveMessage = "";
      state.singleBrand = null;
    },
    getOneBrandToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleBrand = action.payload;
    },
    getOneBrandToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    resetForm: (state, action) => {
      state.singleBrand = null;
    },
    updateBrandRequest: (state) => {
      state.saveUpdateLoading = true;
      state.saveUpdateMessage = null;
      state.saveUpdateError = null;
    },
    updateBrandSuccess: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateMessage = action.payload;
    },
    updateBrandError: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateError = action.payload;
    },
    getLanguagesRequest: (state) => {
      state.languageLoading = true;
      state.AllLanguages = null;
      state.languageError = null;
    },
    getLanguagesSuccess: (state, action) => {
      state.languageLoading = false;
      state.AllLanguages = action.payload;
    },
    getLanguagesError: (state, action) => {
      state.languageLoading = false;
      state.languageError = action.payload;
    },
    getCurrencyRequest: (state) => {
      state.currencyLoading = true;
      state.AllCurrency = null;
      state.currencyError = null;
    },
    getCurrencySuccess: (state, action) => {
      state.currencyLoading = false;
      state.AllCurrency = action.payload;
    },
    getCurrencyError: (state, action) => {
      state.currencyLoading = false;
      state.currencyError = action.payload;
    },
    dropDownBrandsRequest: (state, action) => {
      state.dropDownBrandsLoading = true;
      state.dropDownBrands = [];
      state.dropDownBrandsError = null;
    },
    dropDownBrandsSuccess: (state, action) => {
      state.dropDownBrandsLoading = false;
      state.dropDownBrands = action.payload;
    },
    dropDownBrandsError: (state, action) => {
      state.dropDownBrandsLoading = false;
      state.dropDownBrandsError = action.payload;
    },
    disableEnableBrandRequest: (state, action) => {
      state.disEnableLoading = true;
      state.disEnableMessage = null;
      state.disEnableError = null;
    },
    disableEnableBrandSuccess: (state, action) => {
      state.disEnableLoading = false;
      state.disEnableMessage = action.payload;
    },
    disableEnableBrandError: (state, action) => {
      state.disEnableLoading = false;
      state.disEnableError = action.payload;
    },
    setFliterValue: (state, action) => {
      const prevBrands = current(state.brands);
      state.brands = prevBrands.map((o) => {
        const newObj = { ...o };
        if (o._id === action.payload.brand_id) {
          newObj.filter = action.payload.filter;
          newObj.appliedFiltersCount = getAppliedFiltersCount(
            action.payload.filter
          );
        }
        return newObj;
      });
    },
    setToInitialFliterValue: (state, action) => {
      const prevBrands = current(state.brands);
      state.brands = prevBrands.map((o) => {
        const newObj = { ...o };
        if (o._id === action.payload) {
          newObj.filter = initialFilterObj;
          newObj.appliedFiltersCount = 0;
        }
        return newObj;
      });
    },
  },
});

const getAppliedFiltersCount = (filters) => {
  let appliedCounter = 0;
  if (
    filters.trustree_rating &&
    (filters.trustree_rating.min !== 0 || filters.trustree_rating.max !== 5)
  ) {
    appliedCounter += 1;
  }
  if (
    filters.google_rating &&
    (filters.google_rating.min !== 0 || filters.google_rating.max !== 5)
  ) {
    appliedCounter += 1;
  }
  if (filters.low_category && filters.low_category.length > 0) {
    appliedCounter += 1;
  }
  if (filters.best_category && filters.best_category.length > 0) {
    appliedCounter += 1;
  }
  if (filters.team && (filters.team.min !== 0 || filters.team.max !== 20)) {
    appliedCounter += 1;
  }
  if (
    filters.is_disable &&
    (filters.is_disable.enable !== false ||
      filters.is_disable.disable !== false)
  ) {
    appliedCounter += 1;
  }
  if (
    filters.date &&
    filters.date.length &&
    ((filters.date[0] && filters.date[0] !== null) ||
      (filters.date[1] && filters.date[1] !== null))
  ) {
    appliedCounter += 1;
  }
  return appliedCounter;
};

export const {
  getbrandListingRequest,
  getbrandListingSuccess,
  getbrandListingError,
  addBrandRequest,
  addBrandSuccess,
  addBrandError,
  isOpenModalById,
  setFilterToggle,
  getOneBrandToUpdateRequest,
  getOneBrandToUpdateError,
  getOneBrandToUpdateSuccess,
  resetForm,
  updateBrandRequest,
  updateBrandSuccess,
  updateBrandError,
  getBranchesListingError,
  getBranchesListingSuccess,
  getBranchesListingRequest,
  getLanguagesRequest,
  getLanguagesSuccess,
  getLanguagesError,
  getCurrencyRequest,
  getCurrencySuccess,
  getCurrencyError,
  dropDownBrandsRequest,
  dropDownBrandsSuccess,
  dropDownBrandsError,
  disableEnableBrandRequest,
  disableEnableBrandSuccess,
  disableEnableBrandError,
  setFliterValue,
  setToInitialFliterValue,
} = brandSlice.actions;

export default brandSlice.reducer;
