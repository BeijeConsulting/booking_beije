import axios from "axios";

import { BASEURL, TIMEOUT } from './config'

const axiosInstance = axios.create({  //istanza 
    baseURL: BASEURL,
    timeout: TIMEOUT
})


export function responseApi(response) {  //general function for get the response
    return response?.data;
}

export function responseApiError(error) {  //general function in case of wrong api call 
    return {
        message: error?.message,
        status: error?.status
    }
}


export async function  postApi(resource, obj) {  //function for post api call
    return (
        axiosInstance.post(resource, obj)
        .then(responseApi())
        .catch(responseApiError())
    )
}

export async function getApi(resource) { //function for get api call
    return (
        axiosInstance.get(resource)
        .then(responseApi())
        .catch(responseApiError())
    )
}

export async function putApi(resource, obj) { //function for put api call
    return (
        axiosInstance.put(resource, obj)
        .then(responseApi())
        .catch(responseApiError())
    )
}

export async function deleteApi(resource) {
    return (
        axiosInstance.delete(resource)
        .then(responseApi())
        .catch(responseApiError())
    )
}