import { createSlice } from "@reduxjs/toolkit";
import { CATALOGUE } from "./slice-names";

export const catalogueSlice = createSlice({
  name: CATALOGUE,
  initialState: {
    viaQrLoading: false,
    viaQrError: null,
    viaQrOrSurvey: null,
    viaQrOrSurveyMessage: null,
  },
  reducers: {
    viaQrRequest: (state, action) => {
      state.viaQrLoading = true;
      state.viaQrError = null;
      state.viaQrOrSurvey = null;
      state.viaQrOrSurveyMessage = null;
    },
    viaQrSuccess: (state, action) => {
      state.viaQrLoading = false;
      state.viaQrOrSurvey = action.payload.data;
      state.viaQrOrSurveyMessage = action.payload.message;
    },
    viaQrError: (state, action) => {
      state.viaQrLoading = false;
      state.viaQrError = action.payload;
    },
  },
});

export const { viaQrError, viaQrSuccess, viaQrRequest } =
  catalogueSlice.actions;

export default catalogueSlice.reducer;
