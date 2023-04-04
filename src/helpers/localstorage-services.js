import {
  LOCALSTORAGE_USER_AUTH_DETAILS_KEY,
  LOCALSTORAGE_USER_AUTH_TOKEN_KEY,
} from "../config/constants";

function getLoggedInUserToken() {
  const token = localStorage.getItem(LOCALSTORAGE_USER_AUTH_TOKEN_KEY);
  return token || null;
}

function setLoggedInUserDetails(user) {
  localStorage.setItem(
    LOCALSTORAGE_USER_AUTH_DETAILS_KEY,
    JSON.stringify(user)
  );
}

function getLoggedInUserDetails(rawJsonString = false) {
  try {
    const userDetails = localStorage.getItem(
      LOCALSTORAGE_USER_AUTH_DETAILS_KEY
    );
    if (rawJsonString) {
      return userDetails;
    }
    return JSON.parse(userDetails);
  } catch (error) {
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem(LOCALSTORAGE_USER_AUTH_TOKEN_KEY);
  localStorage.removeItem(LOCALSTORAGE_USER_AUTH_DETAILS_KEY);
}

// function loginUser(props) {
function loginUser({ tok: token, user }) {
  localStorage.setItem(LOCALSTORAGE_USER_AUTH_TOKEN_KEY, token);
  localStorage.setItem(
    LOCALSTORAGE_USER_AUTH_DETAILS_KEY,
    JSON.stringify(user)
  );
}

const LocalstorageService = {
  getLoggedInUserToken,
  logoutUser,
  loginUser,
  setLoggedInUserDetails,
  getLoggedInUserDetails
};

export default LocalstorageService;
