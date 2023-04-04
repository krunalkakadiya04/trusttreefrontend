import { createSlice } from "@reduxjs/toolkit";
import { RATINGS } from "./slice-names";

export const ratingSlice = createSlice({
  name: RATINGS,
  initialState: {
    loading: false,
    ratings: null,
    message: "",
    error: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,
  },
  reducers: {
    getRatingsRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
    },
    getRatingsSuccess: (state, action) => {
      state.loading = false;
      state.ratings = action.payload;
    },
    getRatingsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRatingsRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addRatingsSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addRatingsError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
  },
});

export const {
  getRatingsRequest,
  getRatingsSuccess,
  getRatingsError,
  addRatingsRequest,
  addRatingsSuccess,
  addRatingsError,
} = ratingSlice.actions;

export default ratingSlice.reducer;
