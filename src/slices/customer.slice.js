import { createSlice } from "@reduxjs/toolkit";
import { CUSTOMER } from "./slice-names";

export const customerSlice = createSlice({
  name: CUSTOMER,
  initialState: {
    loading: false,
    customer: [],
    message: "",
    error: "",
    pagination: null,

    filter: {
      rating: { min: 0, max: 5 },
      last_rating: { min: 0, max: 5 },
      feedback: { min: 0, max: 5 },
      experience_type: { min: 0, max: 5 },
      brand: { min: 0, max: 5 },
      date: [null, null],
    },
    isFilter: false,
    appliedFiltersCount: 0,
  },
  reducers: {
    getCustomerDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCustomerDataSuccess: (state, action) => {
      state.loading = false;
      state.customer = action.payload.data;
      state.pagination = action.payload.metaData;
    },
    getCustomerDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filter = { ...action.payload, is_active: true };
      state.appliedFiltersCount = getAppliedFiltersCount(action.payload);
    },
    clearFilter: (state, action) => {
      state.filter = { ...action.payload };
      state.appliedFiltersCount = 0;
    },
    getcustomerFeedbackDataRequest: (state) => {
      state.feedbackLoading = true;
      state.feedbackError = null;
    },
    getcustomerFeedbackDataSuccess: (state, action) => {
      state.feedbackLoading = false;
      state.feedbackData = action.payload;
    },
    getcustomerFeedbackDataError: (state, action) => {
      state.feedbackLoading = false;
      state.feedbackError = action.payload;
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
  if (
    filters.last_rating &&
    (filters.last_rating.min !== 0 || filters.last_rating.max !== 5)
  ) {
    appliedCounter += 1;
  }
  if (
    filters.feedback &&
    (filters.feedback.min !== 0 || filters.feedback.max !== 5)
  ) {
    appliedCounter += 1;
  }
  if (
    filters.experience_type &&
    (filters.experience_type.min !== 0 || filters.experience_type.max !== 5)
  ) {
    appliedCounter += 1;
  }
  if (filters.brand && (filters.brand.min !== 0 || filters.brand.max !== 5)) {
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
  getCustomerDataRequest,
  getCustomerDataSuccess,
  getCustomerDataError,
  setFilterValue,
  clearFilter,
  getcustomerFeedbackDataRequest,
  getcustomerFeedbackDataSuccess,
  getcustomerFeedbackDataError,
} = customerSlice.actions;

export default customerSlice.reducer;
