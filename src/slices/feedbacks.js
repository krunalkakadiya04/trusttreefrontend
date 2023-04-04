import { createSlice } from "@reduxjs/toolkit";
import { FEEDBACKS } from "./slice-names";

export const feedbackSlice = createSlice({
  name: FEEDBACKS,
  initialState: {
    loading: false,
    QrCodeData: null,
    message: "",
    error: "",

    previewData: [],
    previewLoading: false,
    previewError: "",
    languageData: [],
    Index: 0,
    questionIndex: 0,
    surveyButton: "",
    productButton: "",
    serviceButton: "",

    buttonColor: "",
    buttonTextColor: "",
    previewLanguage: "",
  },
  reducers: {
    genrateQrRequest: (state) => {
      state.loading = true;
      state.error = "";
    },
    genrateQrSuccess: (state, action) => {
      state.loading = false;
      state.QrCodeData = action.payload.data;
    },
    genrateQrError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getFeedbackDataforPreviewRequest: (state) => {
      state.previewLoading = true;
      state.previewError = "";
    },
    getFeedbackDataforPreviewSuccess: (state, action) => {
      state.previewLoading = false;
      state.previewData = action.payload.data;
      state.languageData = action.payload.lang;
    },
    getFeedbackDataforPreviewError: (state, action) => {
      state.previewLoading = false;
      state.previewError = action.payload;
    },
    setIndex: (state, action) => {
      state.Index = action.payload;
    },
    setQuestionIndex: (state, action) => {
      state.questionIndex = action.payload;
    },
    setRatingIndex: (state, action) => {
      state.ratingIndex = action.payload;
    },
    setSurveyButton: (state, action) => {
      state.surveyButton = action.payload;
    },
    setProductButton: (state, action) => {
      state.productButton = action.payload;
    },
    setServiceButton: (state, action) => {
      state.serviceButton = action.payload;
    },
    setButtonColor: (state, action) => {
      state.buttonColor = action.payload;
    },
    setButtonTextColor: (state, action) => {
      state.buttonTextColor = action.payload;
    },
    setLanguage: (state, action) => {
      state.previewLanguage = action.payload;
    },
  },
});

export const {
  genrateQrRequest,
  genrateQrSuccess,
  genrateQrError,
  getFeedbackDataforPreviewRequest,
  getFeedbackDataforPreviewSuccess,
  getFeedbackDataforPreviewError,
  setIndex,
  setQuestionIndex,
  setRatingIndex,
  setSurveyButton,
  setProductButton,
  setServiceButton,
  setButtonTextColor,
  setButtonColor,
  setLanguage,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
