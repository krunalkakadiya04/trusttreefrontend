import { get, post } from ".";

const URI = "/auth";

const login = (payload) => {
  const URL = `${URI}/login`;
  return post(URL, payload);
};

const setPasswordFirstLoggIn = (payload, code) => {
  const URL = `${URI}/set-password/${code}`;
  return post(URL, payload);
};

const forgotPassword = (payload) => {
  const URL = `${URI}/forgot-password`;
  return post(URL, payload);
};

const checkResetPasswordToken = (reset_password_token) => {
  const URL = `${URI}/set-password/${reset_password_token}`;
  return get(URL);
};

const resetPassword = (payload, token) => {
  const URL = `${URI}/reset-password/${token}`;
  return post(URL, payload);
};

const getActionOnInviteCode = (code, status) => {
  const URL = `${URI}/inviteCode-action/${code}/${status}`;
  return post(URL);
};

const logout = () => {
  const URL = `${URI}/logout`;
  return post(URL);
};

const sendInviteAgain = (user_id) => {
  const URL = `${URI}/inviteCode/${user_id}`;
  return post(URL);
};

const AuthService = {
  login,
  setPasswordFirstLoggIn,
  forgotPassword,
  resetPassword,
  getActionOnInviteCode,
  logout,
  sendInviteAgain,
  checkResetPasswordToken
};
export default AuthService;
