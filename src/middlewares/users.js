import Users from "../services/users";
import {
  addUsersError,
  addUsersRequest,
  addUsersSuccess,
  getUsersError,
  getUsersRequest,
  getUsersSuccess,
  getSelectUserToUpdateRequest,
  getSelectUserToUpdateSuccess,
  getSelectUserToUpdateError,
  updateUserRequest,
  updateUserSuccess,
  updateUserError,
  getUserProfileRequest,
  getUserProfileError,
  getUserProfileSuccess,
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
} from "../slices/users.slice";

export function getUsers(payload) {
  return (dispatch) => {
    dispatch(getUsersRequest());
    Users.getUsers(payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getUsersSuccess(data));
        } else {
          dispatch(getUsersError(error));
        }
      })
      .catch((error) => {
        dispatch(getUsersError(error));
      });
  };
}

export function addUsers(payload) {
  return (dispatch) => {
    dispatch(addUsersRequest());
    Users.addUsers(payload)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addUsersSuccess(message));
        } else {
          dispatch(addUsersError(error));
        }
      })
      .catch((error) => {
        dispatch(addUsersError(error));
      });
  };
}

export function deleteUserById(userId) {
  return (dispatch) => {
    dispatch(deleteUserByIdRequest());
    Users.deleteUserById(userId)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(deleteUserByIdSuccess(message));
        } else {
          dispatch(deleteUserByIdError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteUserByIdError(error));
      });
  };
}

export function disableUserById(userId) {
  return (dispatch) => {
    dispatch(disableUserByIdRequest());
    Users.disableUserById(userId)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(disableUserByIdSuccess(message));
        } else {
          dispatch(disableUserByIdError(error));
        }
      })
      .catch((error) => {
        dispatch(disableUserByIdError(error));
      });
  };
}

export function getSelectUserToUpdate(id) {
  return (dispatch) => {
    dispatch(getSelectUserToUpdateRequest());
    Users.getSelectUserToUpdate(id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getSelectUserToUpdateSuccess(data));
        } else {
          dispatch(getSelectUserToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getSelectUserToUpdateError(error));
      });
  };
}

export function updateUser(payload, userId) {
  return (dispatch) => {
    dispatch(updateUserRequest());
    Users.updateUser(payload, userId)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateUserSuccess(message));
        } else {
          dispatch(updateUserError(error));
        }
      })
      .catch((error) => {
        dispatch(updateUserError(error));
      });
  };
}

export function getUserProfile() {
  return (dispatch) => {
    dispatch(getUserProfileRequest());
    Users.getUserProfile()
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getUserProfileSuccess(data));
        } else {
          dispatch(getUserProfileError(error));
        }
      })
      .catch((error) => {
        dispatch(getUserProfileError(error));
      });
  };
}

export function updateLoggedInUser(payload) {
  return (dispatch) => {
    dispatch(updateLoggedInUserRequest());
    Users.updateLoggedInUser(payload)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateLoggedInUserSuccess(message));
        } else {
          dispatch(updateLoggedInUserError(error));
        }
      })
      .catch((error) => {
        dispatch(updateLoggedInUserError(error));
      });
  };
}

export function updateLoggedInUserPassword(payload) {
  return (dispatch) => {
    dispatch(updateLoggedInUserPasswordRequest());
    Users.updateLoggedInUserPassword(payload)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateLoggedInUserPasswordSuccess(message));
        } else {
          dispatch(updateLoggedInUserPasswordError(error));
        }
      })
      .catch((error) => {
        dispatch(updateLoggedInUserPasswordError(error));
      });
  };
}