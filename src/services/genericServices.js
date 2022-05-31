import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage/localStorage";

import { BASEURL, TIMEOUT } from "./config";
import { updateAuthTokenPostApi } from "./api/auth/authApi";

const axiosInstance = axios.create({
  //istanza
  baseURL: BASEURL,
  timeout: TIMEOUT,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getLocalStorage("token");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  const originalRequest = error.config;
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401 &&
    originalRequest.url === `${BASEURL}/updateAuthToken`) {
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    //api call updateAuthToken
    if (localStorage.getItem('refreshToken') !== null) {

      updateAuthTokenPostApi().then(res => {
        const { token, refreshToken } = res.data;
        setLocalStorage('token', token);
        setLocalStorage('refreshToken', refreshToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer' + getLocalStorage("token");
      });
    }
  }

  return Promise.reject(error);
});

export function responseApi(response) {
  //general function for get the response
  return response?.data;
}

export function responseApiError(error) {
  //general function in case of wrong api call
  return {
    message: error?.message,
    status: error?.status,
  };
}

export function postApi(resource, obj, header = null) {
  return axiosInstance
    .post(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export function getApi(resource, header = null) {
  //function for get api call
  return axiosInstance
    .get(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export function getSearchApi(resource, body, header = null) {
  //function for get api call
  return axiosInstance
    .get(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export function putApi(resource, obj, header = null) {
  //function for put api call
  return axiosInstance
    .put(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export function deleteApi(resource, header = null) {
  return axiosInstance
    .delete(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}
