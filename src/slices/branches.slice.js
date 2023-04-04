import { createSlice } from "@reduxjs/toolkit";
import { BRANCHES } from "./slice-names";

export const branchesSlice = createSlice({
  name: BRANCHES,
  initialState: {
    loading: false,
    branches: [],
    message: "",
    error: "",

    saveLoading: false,
    saveBranchMessage: null,
    saveError: null,

    updateLoading: false,
    singleBranch: "",
    updateError: "",

    saveBranchUpdateLoading: false,
    saveBranchUpdateMessage: null,
    saveBranchUpdateError: null,

    disEnableLoading: false,
    disEnableBranchMessage: null,
    disEnableError: null,

    allBranchesLoading: false,
    allBranches: [],
    allBranchesError: null,

    graphLoading: false,
    graphMessage: null,
    graphError: null,
    graph: [],
  },
  reducers: {
    addBranchRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
      state.saveBranchMessage = null;
    },
    addBranchSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveBranchMessage = action.payload;
    },
    addBranchError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveBranchMessage = null;
    },
    getOneBranchToUpdateRequest: (state) => {
      state.updateLoading = true;
      state.updateError = "";
      state.saveBranchMessage = "";
    },
    getOneBranchToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleBranch = action.payload;
    },
    getOneBranchToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    resetForm: (state, action) => {
      state.singleBranch = null;
    },
    updateBranchRequest: (state) => {
      state.saveBranchUpdateLoading = true;
      state.saveBranchUpdateMessage = null;
      state.saveBranchUpdateError = null;
    },
    updateBranchSuccess: (state, action) => {
      state.saveBranchUpdateLoading = false;
      state.saveBranchUpdateMessage = action.payload;
    },
    updateBranchError: (state, action) => {
      state.saveBranchUpdateLoading = false;
      state.saveBranchUpdateError = action.payload;
    },
    getBranchesByBrandIdRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveBranchMessage = null;
    },
    getBranchesByBrandIdSuccess: (state, action) => {
      state.loading = false;
      state.branches = action.payload;
    },
    getBranchesByBrandIdError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getBranchGraphRequest: (state) => {
      state.graphLoading = true;
      state.graphError = "";
      state.graphMessage = "";
    },
    getBranchGraphSuccess: (state, action) => {
      state.graphLoading = false;
      state.graph = action.payload;
      // state.graphMessage = action.payload.message;
    },
    getBranchGraphError: (state, action) => {
      state.graphLoading = false;
      state.graphError = action.payload;
    },
    disableEnableBranchRequest: (state) => {
      state.disEnableLoading = true;
      state.disEnableBranchMessage = null;
      state.disEnableError = null;
    },
    disableEnableBranchSuccess: (state, action) => {
      state.disEnableLoading = false;
      state.disEnableBranchMessage = action.payload;
    },
    disableEnableBranchError: (state, action) => {
      state.disEnableLoading = false;
      state.disEnableError = action.payload;
    },
    resetMessage: (state) => {
      state.disEnableBranchMessage = null;
    },
    getAllBranchesRequest: (state) => {
      state.allBranchesLoading = true;
      state.allBranchesError = null;
    },
    getAllBranchesSuccess: (state, action) => {
      state.allBranchesLoading = false;
      state.allBranches = action.payload;
    },
    getAllBranchesError: (state, action) => {
      state.allBranchesLoading = false;
      state.allBranchesError = action.payload;
    },
  },
});

export const {
  addBranchRequest,
  addBranchSuccess,
  addBranchError,
  getOneBranchToUpdateRequest,
  getOneBranchToUpdateSuccess,
  getOneBranchToUpdateError,
  resetForm,
  updateBranchRequest,
  updateBranchSuccess,
  updateBranchError,
  getBranchesByBrandIdRequest,
  getBranchesByBrandIdSuccess,
  getBranchesByBrandIdError,
  getBranchGraphRequest,
  getBranchGraphSuccess,
  getBranchGraphError,
  disableEnableBranchRequest,
  disableEnableBranchSuccess,
  disableEnableBranchError,
  resetMessage,
  getAllBranchesRequest,
  getAllBranchesSuccess,
  getAllBranchesError,
} = branchesSlice.actions;

export default branchesSlice.reducer;
