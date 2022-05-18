import axios from "axios";

import { BASEURL, TIMEOUT } from "./config";

const axiosInstance = axios.create({
  //istanza
  baseURL: BASEURL,
  timeout: TIMEOUT,
});

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401){
    console.log('siamo in questo caso, 401');
    //qui chiamata updateAuthToken
    console.log('intercettato')
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

export async function postApi(resource, obj , header = null) {
  return axiosInstance
    .post(resource, obj, {
      headers: header !== null ? `"Authorization": Bearer ${header}` : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export async function getApi(resource, header = null) {
  //function for get api call
  return axiosInstance
    .get(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export async function putApi(resource, obj, header = null) {
  //function for put api call
  return axiosInstance
    .put(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}

export async function deleteApi(resource, header = null) {
  return axiosInstance
    .delete(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}
