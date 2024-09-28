import axios from "axios";
import { _config } from "../constants";
import {
  generateToken,
  getItemsFromLocalStorage,
  setItemsIntoLocalStorage,
} from "./helper";

const BASE_URL = "https://dummyjson.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

axios.interceptors.request.use(
  (config) => {
    const token = getItemsFromLocalStorage(_config.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    console.log("error: ", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];
let retryOriginalRequest = null;

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !isRefreshing) {
      try {
        const token = await generateToken();

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;

              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;
        retryOriginalRequest = originalRequest;

        if (token) {
          setItemsIntoLocalStorage(_config.TOKEN, token, false);

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          processQueue(null, token);

          retryOriginalRequest.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          return axios(retryOriginalRequest);
        }
      } catch (error) {
        processQueue(error, null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
