import { createSlice } from "@reduxjs/toolkit";
import { BRAND_DESIGN } from "./slice-names";

export const designSlice = createSlice({
  name: BRAND_DESIGN,
  initialState: {
    loading: false,
    brandsDesign: "",
    message: "",
    error: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    saveUpdateLoading: false,
    saveUpdateMessage: null,
    saveUpdateError: null,

    languageLoading: false,
    missingLanguages: null,
    languageError: null,
  },
  reducers: {
    getDesignRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
      state.saveUpdateMessage = null;
    },
    getDesignSuccess: (state, action) => {
      state.loading = false;
      state.brandsDesign = action.payload;
    },
    getDesignError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addDesignRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addDesignSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addDesignError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    updateDesignForQrOrSurveyRequest: (state) => {
      state.saveUpdateLoading = true;
      state.saveUpdateError = null;
      state.saveUpdateMessage = null;
    },
    updateDesignForQrOrSurveySuccess: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateMessage = action.payload;
    },
    updateDesignForQrOrSurveyError: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateError = action.payload;
    },
    getIncomplateLanguageRequest: (state) => {
      state.languageLoading = true;
      state.languageError = "";
      state.missingLanguages = null
    },
    getIncomplateLanguageSuccess: (state, action) => {
      state.languageLoading = false;
      state.missingLanguages = action.payload;
    },
    getIncomplateLanguageError: (state, action) => {
      state.languageLoading = false;
      state.languageError = action.payload;
    },
  },
});

export const {
  getDesignRequest,
  getDesignSuccess,
  getDesignError,
  addDesignRequest,
  addDesignSuccess,
  addDesignError,
  updateDesignForQrOrSurveyRequest,
  updateDesignForQrOrSurveySuccess,
  updateDesignForQrOrSurveyError,
  getIncomplateLanguageRequest,
  getIncomplateLanguageSuccess,
  getIncomplateLanguageError
} = designSlice.actions;

export default designSlice.reducer;
