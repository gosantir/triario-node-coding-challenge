import axios from 'axios'
import config from '../config/index.js'

const hubSpotAxios = axios.create({
  baseURL: config.baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.hubspotAccessToken}`,
  },
})

hubSpotAxios.interceptors.request.use(
  (requestConfig) => {
    console.log(`HubSpot API -> ${requestConfig.method.toUpperCase()} ${requestConfig.url} with params:`, requestConfig.params || {});
    // console.log(`HubSpot API -> Request body:`, requestConfig);
    return requestConfig;
  },
  (error) => {
    console.error(`HubSpot request interceptor error: ${error.message}`);
    return Promise.reject(error);
  }
);


async function get(url, params = {}) {
  const response = await hubSpotAxios.get(url, { params })
  return response.data
}

async function post(url, data) {
  const response = await hubSpotAxios.post(url, data)
  return response.data
}

async function put(url, data) {
  const response = await hubSpotAxios.put(url, data)
  return response.data
}

async function patch(url, data) {
  const response = await hubSpotAxios.patch(url, data)
  return response.data
}

async function del(url) {
  const response = await hubSpotAxios.delete(url)
  return response.data
}

export default {
  get,
  post,
  put,
  patch,
  del
}