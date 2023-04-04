import { createSlice } from "@reduxjs/toolkit";
import { AUTH_SLICE } from "./slice-names";

export const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState: {
    loginLoading: false,
    loggedInUser: null,
    loggedInUserEmail: "",
    loginMessage: "",
    loginError: "",
    loginSetPasswordMessage: null,

    setPasswordFirstLoginLoading: false,
    setPasswordFirstLoginError: "",
    setPasswordFirstLoginMessage: "",

    forgotPasswordLoading: false,
    forgotPasswordError: "",
    forgotPasswordMessage: "",

    resetPasswordLoading: false,
    resetPasswordError: "",
    resetPasswordMessage: "",

    getActionOnInviteCodeLoading: false,
    getActionOnInviteCodeError: "",
    getActionOnInviteCodeMessage: "",
    getActionOnInviteCodeData: "",

    checkResetPasswordTokenLoading: false,
    checkResetPasswordTokenError: "",
    checkResetPasswordTokenMessage: "",

    logoutLoading: false,
    logoutMessage: "",
    logoutError: "",

    ivitationLoading: false,
    invitationMessage: null,
    invitationError: "",
  },
  reducers: {
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginMessage = "";
      state.loginSetPasswordMessage = null;
      state.setPasswordFirstLoginMessage = "";
      state.checkResetPasswordTokenError = "";
      state.checkResetPasswordTokenMessage = "";
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loggedInUser = action.payload.userObj;
      state.loginMessage = action.payload.message;
    },
    loginError: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    loginInviteCode: (state, action) => {
      state.loginLoading = false;
      state.loginMessage = action.payload;
    },
    loginSetPassword: (state, action) => {
      state.loginLoading = false;
      state.loginSetPasswordMessage = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUserEmail = action.payload;
    },
    setLoggedInUserForLogout: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setPasswordFirstLoggInRequest: (state) => {
      state.setPasswordFirstLoginLoading = true;
      state.setPasswordFirstLoginMessage = "";
    },
    setPasswordFirstLoggInSuccess: (state, action) => {
      state.setPasswordFirstLoginLoading = false;
      state.setPasswordFirstLoginMessage = action.payload.message;
    },
    setPasswordFirstLoggInError: (state, action) => {
      state.setPasswordFirstLoginLoading = false;
      state.setPasswordFirstLoginError = action.payload;
    },
    resetLogin: (state, action) => {
      state.loginSetPasswordMessage = null;
      state.setPasswordFirstLoginMessage = "";
      state.resetPasswordMessage = "";
    },
    forgotPasswordRequest: (state) => {
      state.forgotPasswordLoading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordMessage = action.payload.message;
    },
    forgotPasswordError: (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordError = action.payload;
    },
    resetMessage: (state) => {
      state.forgotPasswordMessage = null;
    },
    resetPasswordRequest: (state) => {
      state.resetPasswordLoading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordMessage = action.payload;
    },
    resetPasswordError: (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = action.payload;
    },
    getActionOnInviteCodeRequest: (state) => {
      state.getActionOnInviteCodeLoading = true;
    },
    getActionOnInviteCodeSuccess: (state, action) => {
      state.getActionOnInviteCodeLoading = false;
      state.getActionOnInviteCodeMessage = action.payload.message;
      state.getActionOnInviteCodeData = action.payload.data;
    },
    getActionOnInviteCodeError: (state, action) => {
      state.getActionOnInviteCodeLoading = false;
      state.getActionOnInviteCodeError = action.payload;
    },
    checkResetPasswordTokenRequest: (state) => {
      state.checkResetPasswordTokenLoading = true;
    },
    checkResetPasswordTokenSuccess: (state, action) => {
      state.checkResetPasswordTokenLoading = false;
      state.checkResetPasswordTokenMessage = action.payload;
    },
    checkResetPasswordTokenError: (state, action) => {
      state.checkResetPasswordTokenLoading = false;
      state.checkResetPasswordTokenError = action.payload;
    },
    logoutRequest: (state) => {
      state.logoutLoading = true;
      state.logoutMessage = "";
    },
    logoutSuccess: (state, action) => {
      state.logoutLoading = false;
      state.logoutMessage = action.payload;
      state.loginMessage = "";
      state.loginError = "";
    },
    logoutError: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },
    resetLogoutState: (state) => {
      state.logoutLoading = false;
      state.logoutMessage = "";
      state.logoutError = "";
    },
    sendInviteAgainRequest: (state) => {
      state.ivitationLoading = true;
      state.invitationMessage = "";
    },
    sendInviteAgainSuccess: (state, action) => {
      state.ivitationLoading = false;
      state.invitationMessage = action.payload;
    },
    sendInviteAgainError: (state, action) => {
      state.ivitationLoading = false;
      state.invitationError = action.payload;
    },
    resetInivationMessage: (state, action) => {
      state.invitationMessage = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginError,
  loginInviteCode,
  loginSetPassword,
  loginEmail,
  resetLogin,
  setLoggedInUser,
  setPasswordFirstLoggInRequest,
  setPasswordFirstLoggInSuccess,
  setPasswordFirstLoggInError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordRequest,
  resetPasswordError,
  resetPasswordSuccess,
  getActionOnInviteCodeRequest,
  getActionOnInviteCodeSuccess,
  getActionOnInviteCodeError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  resetLogoutState,
  setLoggedInUserForLogout,
  sendInviteAgainRequest,
  sendInviteAgainSuccess,
  sendInviteAgainError,
  resetInivationMessage,
  checkResetPasswordTokenRequest,
  checkResetPasswordTokenSuccess,
  checkResetPasswordTokenError,
  resetMessage,
} = authSlice.actions;

export default authSlice.reducer;
