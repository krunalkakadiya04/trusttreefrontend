import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "./slice-names";

export const userSlice = createSlice({
  name: USERS,
  initialState: {
    loading: true,
    users: [],
    pagination: [],
    message: "",
    error: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    updateLoading: false,
    singleUser: null,
    updateError: "",
    singleUserId: null,

    saveUpdateLoading: false,
    saveUpdateMessage: null,
    saveUpdateError: null,

    userProfileLoading: false,
    userProfile: null,
    userProfileError: "",

    updateLoggedInUserLoading: false,
    updateLoggedInUserMessage: null,
    updateLoggedInUserError: null,

    updateLoggedInUserPasswordLoading: false,
    updateLoggedInUserPasswordMessage: null,
    updateLoggedInUserPasswordError: null,

    deleteUserLoading: false,
    deleteUserMessage: null,
    deleteUserError: null,

    disableUserLoading: false,
    disableUserMessage: null,
    disableUserError: null,
  },
  reducers: {
    getUsersRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.updateLoggedInUserMessage = null;
      state.disableUserMessage = null;
      state.deleteUserMessage = null;
      state.saveMessage = null;
      state.saveUpdateMessage = null;
      state.updateLoggedInUserMessage = null;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      state.pagination = action.payload.metadata[0];
    },
    getUsersError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUsersRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addUsersSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addUsersError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    getSelectUserToUpdateRequest: (state) => {
      state.updateLoading = true;
      state.updateError = "";
      state.singleUser = null;
      state.singleUserId = null;
    },
    getSelectUserToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleUser = action.payload;
      state.singleUserId = action.payload._id;
    },
    getSelectUserToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
      state.singleUser = null;
      state.singleUserId = null;
    },
    updateUserRequest: (state) => {
      state.saveUpdateLoading = true;
      state.saveUpdateMessage = null;
      state.saveUpdateError = null;
    },
    updateUserSuccess: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateMessage = action.payload;
    },
    updateUserError: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateError = action.payload;
    },
    getUserProfileRequest: (state) => {
      state.userProfileLoading = true;
      state.userProfileError = "";
      state.updateLoggedInUserMessage = "";
    },
    getUserProfileSuccess: (state, action) => {
      state.userProfileLoading = false;
      state.userProfile = action.payload;
    },
    getUserProfileError: (state, action) => {
      state.userProfileLoading = false;
      state.userProfileError = action.payload;
    },
    updateLoggedInUserRequest: (state) => {
      state.updateLoggedInUserLoading = true;
      state.updateLoggedInUserMessage = null;
      state.updateLoggedInUserError = null;
    },
    updateLoggedInUserSuccess: (state, action) => {
      state.updateLoggedInUserLoading = false;
      state.updateLoggedInUserMessage = action.payload;
    },
    updateLoggedInUserError: (state, action) => {
      state.updateLoggedInUserLoading = false;
      state.updateLoggedInUserError = action.payload;
    },
    updateLoggedInUserPasswordRequest: (state) => {
      state.updateLoggedInUserPasswordLoading = true;
      state.updateLoggedInUserPasswordMessage = null;
      state.updateLoggedInUserPasswordError = null;
    },
    updateLoggedInUserPasswordSuccess: (state, action) => {
      state.updateLoggedInUserPasswordLoading = false;
      state.updateLoggedInUserPasswordMessage = action.payload;
    },
    updateLoggedInUserPasswordError: (state, action) => {
      state.updateLoggedInUserPasswordLoading = false;
      state.updateLoggedInUserPasswordError = action.payload;
    },
    deleteUserByIdRequest: (state) => {
      state.deleteUserLoading = true;
      state.deleteUserMessage = null;
      state.deleteUserError = null;
    },
    deleteUserByIdSuccess: (state, action) => {
      state.deleteUserLoading = false;
      state.deleteUserMessage = action.payload;
    },
    deleteUserByIdError: (state, action) => {
      state.deleteUserLoading = false;
      state.deleteUserError = action.payload;
    },
    disableUserByIdRequest: (state) => {
      state.disableUserLoading = true;
      state.disableUserMessage = null;
      state.disableUserError = null;
    },
    disableUserByIdSuccess: (state, action) => {
      state.disableUserLoading = false;
      state.disableUserMessage = action.payload;
    },
    disableUserByIdError: (state, action) => {
      state.disableUserLoading = false;
      state.disableUserError = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersError,
  addUsersRequest,
  addUsersSuccess,
  addUsersError,
  getSelectUserToUpdateRequest,
  getSelectUserToUpdateSuccess,
  getSelectUserToUpdateError,
  updateUserRequest,
  updateUserSuccess,
  updateUserError,
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileError,
  updateLoggedInUserRequest,
  updateLoggedInUserSuccess,
  updateLoggedInUserError,
  updateLoggedInUserPasswordRequest,
  updateLoggedInUserPasswordSuccess,
  updateLoggedInUserPasswordError,
  deleteUserByIdRequest,
  deleteUserByIdSuccess,
  deleteUserByIdError,
  disableUserByIdRequest,
  disableUserByIdSuccess,
  disableUserByIdError,
  findUserRequest,
  findUserSuccess,
  findUserError,
  sortUserRequest,
  sortUserSuccess,
  sortUserError,
} = userSlice.actions;

export default userSlice.reducer;
