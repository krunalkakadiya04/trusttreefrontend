import { createSlice } from "@reduxjs/toolkit";
import { STAFF_MEMBERS } from "./slice-names";

export const staffMembersSlice = createSlice({
  name: STAFF_MEMBERS,
  initialState: {
    loading: true,
    staffMembers: [],
    message: "",
    error: "",
    pagination: [],
    languages: null,

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    updateLoading: false,
    singleStaffMember: null,
    updateError: "",

    saveStaffLoading: false,
    saveStaffMessage: null,
    saveStaffError: null,

    deleteLoading: false,
    deleteMessage: null,
    deleteError: null,

    disableLoading: false,
    disableMessage: null,
    disableError: null,

    filter: {
      branches: [],
      expirence_type: [],
      status: {
        enable: false,
        disable: false,
      },
      rating: {
        min: 0,
        max: 5,
      },
      date: [null, null],
    },
    appliedFiltersCount: 0,
  },
  reducers: {
    getStaffMembersRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
      state.saveStaffMessage = null;
      state.singleStaffMember = null;
      state.disableMessage = null;
      state.deleteMessage = null;
    },
    getStaffMembersSuccess: (state, action) => {
      state.loading = false;
      state.staffMembers = action.payload.data;
      state.pagination = action.payload.metaData;
      state.languages = action.payload.lang_det;
    },
    getStaffMembersError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addStaffMemberRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addStaffMemberSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addStaffMemberError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    getOneStaffMemberToUpdateRequest: (state) => {
      state.updateLoading = true;
      state.updateError = "";
      state.saveBranchMessage = "";
    },
    getOneStaffMemberToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleStaffMember = action.payload;
    },
    getOneStaffMemberToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    resetForm: (state) => {
      state.singleStaffMember = null;
    },
    updateStaffMemberRequest: (state) => {
      state.saveStaffLoading = true;
      state.saveStaffMessage = null;
      state.saveStaffError = null;
    },
    updateStaffMemberSuccess: (state, action) => {
      state.saveStaffLoading = false;
      state.saveStaffMessage = action.payload;
    },
    updateStaffMemberError: (state, action) => {
      state.saveStaffLoading = false;
      state.saveStaffError = action.payload;
    },
    deleteStaffMemberRequest: (state) => {
      state.deleteLoading = true;
      state.deleteMessage = null;
      state.deleteError = null;
    },
    deleteStaffMemberSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteMessage = action.payload;
    },
    deleteStaffMemberError: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
    disableStaffMemberRequest: (state) => {
      state.disableLoading = true;
      state.disableMessage = null;
      state.disableError = null;
    },
    disableStaffMemberSuccess: (state, action) => {
      state.disableLoading = false;
      state.disableMessage = action.payload;
    },
    disableStaffMemberError: (state, action) => {
      state.disableLoading = false;
      state.disableError = action.payload;
    },
    setFliterValue: (state, action) => {
      state.filter = { ...action.payload };
      state.appliedFiltersCount = getAppliedFiltersCount(action.payload);

      // state.filter = {
      //   branches: action.payload.branches,
      //   expirence_type: action.payload.expirence_type,
      //   status: action.payload.status,
      //   rating: action.payload.rating,
      //   date: action.payload.date,
      // };
    },
    clearFilter: (state, action) => {
      state.filter = { ...action.payload };
      state.appliedFiltersCount = 0;
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
  if (filters.branches && filters.branches.length > 0) {
    appliedCounter += 1;
  }
  if (filters.expirence_type && filters.expirence_type.length > 0) {
    appliedCounter += 1;
  }
  if (
    filters.status &&
    (filters.status.enable !== false || filters.status.disable !== false)
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
  getStaffMembersRequest,
  getStaffMembersSuccess,
  getStaffMembersError,
  addStaffMemberRequest,
  addStaffMemberSuccess,
  addStaffMemberError,
  getOneStaffMemberToUpdateRequest,
  getOneStaffMemberToUpdateSuccess,
  getOneStaffMemberToUpdateError,
  resetForm,
  updateStaffMemberRequest,
  updateStaffMemberSuccess,
  updateStaffMemberError,
  deleteStaffMemberRequest,
  deleteStaffMemberSuccess,
  deleteStaffMemberError,
  disableStaffMemberRequest,
  disableStaffMemberSuccess,
  disableStaffMemberError,
  setFliterValue,
  clearFilter,
} = staffMembersSlice.actions;

export default staffMembersSlice.reducer;
