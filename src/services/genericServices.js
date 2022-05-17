import axios from "axios";

import { BASEURL, TIMEOUT } from "./config";

const axiosInstance = axios.create({
  //istanza
  baseURL: BASEURL,
  timeout: TIMEOUT,
});

export function responseApi(response) {
  //general function for get the response
  return response?.data;
}

export function responseApiError(error) {
  console.log(error)
  //general function in case of wrong api call
  return {
    message: error?.message,
    status: error?.status,
  };
}

export async function postApi(resource, obj, header = null) {
  //function for post api call
  // return (
  //     axiosInstance.post(resource, obj, header)
  //     .then(responseApi())
  //     .catch(responseApiError())
  // )

  return axiosInstance
    .post(resource, {
      headers: header !== null ? {"Authorization": `Bearer ${header}`} : "",
      data: obj,
    })
    .then(responseApi())
    .catch(responseApiError());
}

export async function getApi(resource, header = null) {
  //function for get api call
  return axiosInstance
    .get(resource, {
      headers: header !== null ? {"Authorization": `Bearer ${header}`} : "" 
    })
    .then(responseApi())
    .catch(responseApiError());
}

export async function putApi(resource, obj, header = null) {
  //function for put api call
  return axiosInstance
    .put(resource, {
      headers: header !== null ? {"Authorization": `Bearer ${header}`} : "",
      data: obj,
    })
    .then(responseApi())
    .catch(responseApiError());
}

export async function deleteApi(resource, header = null) {
  return axiosInstance
    .delete(resource, {
      headers: header !== null ? {"Authorization": `Bearer ${header}`} : "",
    })
    .then(responseApi())
    .catch(responseApiError());
}
