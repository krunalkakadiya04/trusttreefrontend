import { createSlice } from "@reduxjs/toolkit";
import { EXPERIENCE } from "./slice-names";

export const experienceSlice = createSlice({
  name: EXPERIENCE,
  initialState: {
    loading: false,
    experienceType: [],
    message: "",
    error: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    updateLoading: false,
    singleExperience: null,
    updateError: "",

    saveExperienceLoading: false,
    saveExperienceMessage: null,
    saveExperienceError: null,

    experienceTypeLoading: false,
    experienceTypeData: null,
    experienceTypeError: "",

    saveExpLoading: false,
    saveExpMessage: null,
    saveExpError: null,

    deleteLoading: false,
    deleteMessage: null,
    deleteError: null,

    disableLoading: false,
    disableMessage: null,
    disableError: null,

    allExpTypeLoading: false,
    allExpType: null,
    allExpTypeError: null,
  },
  reducers: {
    getExperienceTypeRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
      state.singleExperience = null;
      state.saveExperienceMessage = null;
      state.saveExpMessage = null;
    },
    getExperienceTypeSuccess: (state, action) => {
      state.loading = false;
      state.experienceType = action.payload;
    },
    getExperienceTypeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addExperienceTypeRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addExperienceTypeSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addExperienceTypeError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    getOneExperienceTypeToUpdateRequest: (state) => {
      state.updateLoading = true;
      state.updateError = "";
      state.saveBranchMessage = "";
    },
    getOneExperienceTypeToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleExperience = action.payload;
    },
    getOneExperienceTypeToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    resetForm: (state) => {
      state.singleExperience = null;
    },
    updateExperienceTypeRequest: (state) => {
      state.saveExperienceLoading = true;
      state.saveExperienceMessage = null;
      state.saveExperienceError = null;
    },
    updateExperienceTypeSuccess: (state, action) => {
      state.saveExperienceLoading = false;
      state.saveExperienceMessage = action.payload;
    },
    updateExperienceTypeError: (state, action) => {
      state.saveExperienceLoading = false;
      state.saveExperienceError = action.payload;
    },
    getExperienceTypeByBrandIdRequest: (state) => {
      state.experienceTypeLoading = true;
      state.experienceTypeError = "";
      state.saveExpMessage = null;
      state.saveExperienceMessage = null;
      state.disableMessage = null;
      state.deleteMessage = null;
    },
    getExperienceTypeByBrandIdSuccess: (state, action) => {
      state.experienceTypeLoading = false;
      state.experienceTypeData = action.payload;
    },
    getExperienceTypeByBrandIdError: (state, action) => {
      state.experienceTypeLoading = false;
      state.experienceTypeError = action.payload;
    },
    addExperienceTypeByBrandIdRequest: (state) => {
      state.saveExpLoading = true;
      state.saveExpError = null;
    },
    addExperienceTypeByBrandIdSuccess: (state, action) => {
      state.saveExpLoading = false;
      state.saveExpMessage = action.payload;
    },
    addExperienceTypeByBrandIdError: (state, action) => {
      state.saveExpLoading = false;
      state.saveExpError = action.payload;
      state.saveExpMessage = null;
    },
    deleteExperienceTypeRequest: (state) => {
      state.deleteLoading = true;
      state.deleteMessage = null;
      state.deleteError = null;
    },
    deleteExperienceTypeSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteMessage = action.payload;
    },
    deleteExperienceTypeError: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
    disableExperienceTypeRequest: (state) => {
      state.disableLoading = true;
      state.disableMessage = null;
      state.disableError = null;
    },
    disableExperienceTypeSuccess: (state, action) => {
      state.disableLoading = false;
      state.disableMessage = action.payload;
    },
    disableExperienceTypeError: (state, action) => {
      state.disableLoading = false;
      state.disableError = action.payload;
    },
    getAllExperienceTypeRequest: (state) => {
      state.allExpTypeLoading = true;
      state.allExpTypeError = null;
    },
    getAllExperienceTypeSuccess: (state, action) => {
      state.allExpTypeLoading = false;
      state.allExpType = action.payload;
    },
    getAllExperienceTypeError: (state, action) => {
      state.allExpTypeLoading = false;
      state.allExpTypeError = action.payload;
    },
  },
});

export const {
  getExperienceTypeRequest,
  getExperienceTypeSuccess,
  getExperienceTypeError,
  addExperienceTypeRequest,
  addExperienceTypeSuccess,
  addExperienceTypeError,
  getOneExperienceTypeToUpdateRequest,
  getOneExperienceTypeToUpdateSuccess,
  getOneExperienceTypeToUpdateError,
  resetForm,
  updateExperienceTypeRequest,
  updateExperienceTypeSuccess,
  updateExperienceTypeError,
  getExperienceTypeByBrandIdRequest,
  getExperienceTypeByBrandIdSuccess,
  getExperienceTypeByBrandIdError,
  addExperienceTypeByBrandIdRequest,
  addExperienceTypeByBrandIdSuccess,
  addExperienceTypeByBrandIdError,
  disableExperienceTypeRequest,
  disableExperienceTypeSuccess,
  disableExperienceTypeError,
  deleteExperienceTypeRequest,
  deleteExperienceTypeSuccess,
  deleteExperienceTypeError,
  getAllExperienceTypeRequest,
  getAllExperienceTypeSuccess,
  getAllExperienceTypeError,
} = experienceSlice.actions;

export default experienceSlice.reducer;
