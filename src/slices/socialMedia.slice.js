import { createSlice } from "@reduxjs/toolkit";
import { SOCIAL_MEDIA } from "./slice-names";

export const socialSlice = createSlice({
  name: SOCIAL_MEDIA,
  initialState: {
    loading: false,
    socialMedia: [],
    message: "",
    error: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,
  },
  reducers: {
    getSocialMediaRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
    },
    getSocialMediaSuccess: (state, action) => {
      state.loading = false;
      state.socialMedia = action.payload;
    },
    getSocialMediaError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSocialMediaRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addSocialMediaSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addSocialMediaError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
  },
});

export const {
  getSocialMediaRequest,
  getSocialMediaSuccess,
  getSocialMediaError,
  addSocialMediaRequest,
  addSocialMediaSuccess,
  addSocialMediaError,
} = socialSlice.actions;

export default socialSlice.reducer;
