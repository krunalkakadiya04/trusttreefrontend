import { del, get, post, put, putFormData } from ".";

const URI = "/users";

const getUsers = (payload) => {
  const URL = `${URI}`;
  return post(URL, payload);
};

const addUsers = (payload) => {
  const URL = `${URI}/create`;
  return post(URL, payload);
};

const getSelectUserToUpdate = (id) => {
  const URL = `${URI}/update/${id}`;
  return get(URL);
};

const updateUser = (payload, userId) => {
  const URL = `${URI}/update/${userId}`;
  return put(URL, payload);
};

const getUserProfile = () => {
  const URL = `${URI}/logged-in`;
  return get(URL);
};

const updateLoggedInUser = (payload) => {
  const URL = `${URI}/logged-in/update`;
  return putFormData(URL, payload);
};

const updateLoggedInUserPassword = (payload) => {
  const URL = `${URI}/logged-in/update-password`;
  return put(URL, payload);
};

const deleteUserById = (userId) => {
  const URL = `${URI}/delete/${userId}`;
  return del(URL);
};

const disableUserById = (userId) => {
  const URL = `${URI}/disable/${userId}`;
  return del(URL);
};

const Users = {
  getUsers,
  addUsers,
  getSelectUserToUpdate,
  updateUser,
  getUserProfile,
  updateLoggedInUser,
  updateLoggedInUserPassword,
  deleteUserById,
  disableUserById,
};
export default Users;
