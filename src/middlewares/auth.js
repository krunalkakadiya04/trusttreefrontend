import AuthService from "../services/auth";
import LocalstorageService from "../helpers/localstorage-services";
import {
  loginError,
  loginRequest,
  loginSuccess,
  loginInviteCode,
  loginSetPassword,
  setPasswordFirstLoggInRequest,
  setPasswordFirstLoggInSuccess,
  setPasswordFirstLoggInError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
  getActionOnInviteCodeRequest,
  getActionOnInviteCodeSuccess,
  getActionOnInviteCodeError,
  setLoggedInUser,
  logoutRequest,
  logoutSuccess,
  logoutError,
  sendInviteAgainRequest,
  sendInviteAgainSuccess,
  sendInviteAgainError,
  checkResetPasswordTokenRequest,
  checkResetPasswordTokenSuccess,
  checkResetPasswordTokenError,
} from "../slices/auth.slice";

export function LoginUser(payload) {
  return (dispatch) => {
    dispatch(loginRequest());
    AuthService.login(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === 1) {
          const localStorage = { tok: data.token, user: data.userObj };
          LocalstorageService.loginUser(localStorage);
          dispatch(loginSuccess({ ...data, message }));
        } else if (status === 3) {
          dispatch(loginSetPassword(message));
          LocalstorageService.setLoggedInUserDetails(payload.email);
          dispatch(setLoggedInUser(payload.email));
        } else if (status === 4) {
          dispatch(loginInviteCode(message));
        } else {
          dispatch(loginError(error));
        }
      })
      .catch((error) => {
        dispatch(loginError(error));
      });
  };
}

export function setPasswordFirstLoggIn(payload, code) {
  return (dispatch) => {
    dispatch(setPasswordFirstLoggInRequest());
    AuthService.setPasswordFirstLoggIn(payload, code)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === 1) {
          dispatch(setPasswordFirstLoggInSuccess({ data, message }));
        } else {
          dispatch(setPasswordFirstLoggInError(error));
        }
      })
      .catch((error) => {
        dispatch(setPasswordFirstLoggInError(error));
      });
  };
}

export function forgotPassword(payload) {
  return (dispatch) => {
    dispatch(forgotPasswordRequest());
    AuthService.forgotPassword(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === 1) {
          dispatch(forgotPasswordSuccess({ data, message }));
        } else {
          dispatch(forgotPasswordError(error));
        }
      })
      .catch((error) => {
        dispatch(forgotPasswordError(error));
      });
  };
}

export function resetPassword(payload, link) {
  return (dispatch) => {
    dispatch(resetPasswordRequest());
    AuthService.resetPassword(payload, link)
      .then((response) => {
        const { status, message, error } = response.data;
        if (status === 1) {
          dispatch(resetPasswordSuccess(message));
        } else {
          dispatch(resetPasswordError(error));
        }
      })
      .catch((error) => dispatch(resetPasswordError(error)));
  };
}

export function getActionOnInviteCode(code, status) {
  return (dispatch) => {
    dispatch(getActionOnInviteCodeRequest());
    AuthService.getActionOnInviteCode(code, status)
      .then((response) => {
        const { status, message, error, data } = response.data;
        if (status === 1) {
          dispatch(getActionOnInviteCodeSuccess({ data, message }));
        } else {
          dispatch(getActionOnInviteCodeError(error));
        }
      })
      .catch((error) => dispatch(getActionOnInviteCodeError(error)));
  };
}

export function checkResetPasswordToken(reset_password_token) {
  return (dispatch) => {
    dispatch(checkResetPasswordTokenRequest());
    AuthService.checkResetPasswordToken(reset_password_token)
      .then((response) => {
        const { status, message, error } = response.data;
        if (status === 1) {
          dispatch(checkResetPasswordTokenSuccess(message));
        } else {
          dispatch(checkResetPasswordTokenError(error));
        }
      })
      .catch((error) => dispatch(checkResetPasswordTokenError(error)));
  };
}


export function logoutUser() {
  return (dispatch) => {
    dispatch(logoutRequest());
    AuthService.logout()
      .then((response) => {
        const { status, message, error } = response.data;
        if (status === 1) {
          dispatch(logoutSuccess(message));
        } else {
          dispatch(logoutError(error));
        }
      })
      .catch((error) => {
        dispatch(logoutError(error));
      });
  };
}

export function sendInviteAgain(user_id) {
  return (dispatch) => {
    dispatch(sendInviteAgainRequest());
    AuthService.sendInviteAgain(user_id)
      .then((response) => {
        const { status, message, error } = response.data;
        if (status === 4) {
          dispatch(sendInviteAgainSuccess(message));
        } else {
          dispatch(sendInviteAgainError(error));
        }
      })
      .catch((error) => {
        dispatch(sendInviteAgainError(error));
      });
  };
}
