import { expect } from 'chai'
import request from "supertest" ; 
export const   getRequest = async (baseUrl, apiEndPoint, headers) => {
    try {
        const response = await request(baseUrl).get(apiEndPoint).retry(2).set(headers);
        return response;
    } catch (error) {
        throw new Error('Error in GET Request: ' + error);
    }
};
export const postRequest = async (baseUrl, apiEndPoint, headers, requestBody) => {
    try {
        const response = await request(baseUrl).post(apiEndPoint).retry(2).set(headers).send(requestBody);
        return response;
    } catch (error) {
        throw new Error('Error in POST Request: ' + error);
    }
};

export const patchRequest = async function (baseUrl, apiEndPoint, headers, requestBody ) {
    try {
        const response = await request(baseUrl).patch(apiEndPoint).retry(2).set(headers).send(requestBody);
        return response;
    } catch (error) {
        throw new Error('Error in PUT Request: ' + error);
    }
};

export const putRequest = async function (baseUrl, apiEndPoint, headers, requestBody ) {
    try {
        const response = await request(baseUrl).put(apiEndPoint).retry(2).set(headers).send(requestBody);
        return response;
    } catch (error) {
        throw new Error('Error in PUT Request: ' + error);
    }
};
export const deleteRequest = async (baseUrl, apiEndPoint, headers) => {
    try {
        const response = await request(baseUrl).delete(apiEndPoint).retry(2).set(headers);
        return response;
    } catch (error) {
        throw new Error('Error in DELETE Request: ' + error);
    }
};

export function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }