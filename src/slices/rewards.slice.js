import { createSlice } from "@reduxjs/toolkit";
import { REWARDS } from "./slice-names";

export const rewardsSlice = createSlice({
  name: REWARDS,
  initialState: {
    loading: false,
    rewards: null,
    message: "",
    error: "",
    languages: null,
    offSet: 0,

    saveLoading: false,
    saveMessage: null,
    saveError: null,
  },
  reducers: {
    getRewardsRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
      state.rewards = null;
      state.offSet = 0;
    },
    getRewardsSuccess: (state, action) => {
      state.loading = false;
      state.rewards = action.payload.rewards;
      state.languages = action.payload.lang_det;
    },
    getRewardsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRewardsRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addRewardsSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addRewardsError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    setOffSet: (state, action) => {
      state.offSet = action.payload;
    },
    reset_form: (state) => {
      state.rewards = null;
    },
  },
});

export const {
  getRewardsRequest,
  getRewardsSuccess,
  getRewardsError,
  addRewardsRequest,
  addRewardsSuccess,
  addRewardsError,
  reset_form,
  setOffSet,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
