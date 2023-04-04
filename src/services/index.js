import axios from "axios";
import {
  GENERIC_ERROR_MESSAGE,
  SERVER_AUTH_ERROR_STATUS_CODE,
  SERVER_VALIDATION_STATUS_CODE,
} from "../config/constants";
import ROUTE_URLS from "../config/routes";
import LocalstorageService from "../helpers/localstorage-services";
import i18next from "i18next";

//apply base url for axios
const API_URL = process.env.REACT_APP_BASE_URL || "";
const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = LocalstorageService.getLoggedInUserToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["ttxlanguage"] = i18next.resolvedLanguage;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response;
    if (status === SERVER_AUTH_ERROR_STATUS_CODE) {
      LocalstorageService.logoutUser();
      window.location.replace(ROUTE_URLS.LOGIN);
    }
    if (status === SERVER_VALIDATION_STATUS_CODE) {
      const { error } = data;
      const errorsArray = [];
      for (const key in error) {
        if (Object.hasOwnProperty.call(error, key)) {
          const _error = error[key];
          errorsArray.push(_error);
        }
      }
      return Promise.reject(errorsArray);
    }
    return Promise.reject(GENERIC_ERROR_MESSAGE);
  }
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}

export async function delPayload(url, data = {}, config = {}) {
  return await axiosApi.delete(url, { Authorization: { ...config }, data: { ...data } });
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, {
    "Content-Type": "multipart/form-data",
    ...config,
  });
}

export async function putFormData(url, data, config = {}) {
  return axiosApi.put(url, data, {
    "Content-Type": "multipart/form-data",
    ...config,
  });
}
