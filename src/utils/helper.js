/**
 * =================================================
 * UTILITY FUNCTIONS RELATED TO THE LOCAL STORAGE
 * =================================================
 * */

import axios from "axios";
import { _config, SERVER_URL } from "../constants";

export const setItemsIntoLocalStorage = (key, value, isJson = false) => {
  if (isJson) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getItemsFromLocalStorage = (key, isJson = false) => {
  const item = localStorage.getItem(key);
  if (item) {
    if (isJson) {
      return JSON.parse(item);
    } else {
      return item;
    }
  }
};

export const removeItemsFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    localStorage.removeItem(key);
  }
};

/**
 * =================================================
 * CUSTOM VALIDATION
 * =================================================
 * */

export const generateToken = async () => {
  try {
    const userId = getItemsFromLocalStorage(_config.ID);
    const response = await axios.get(
      `${SERVER_URL}/auth/refresh-token/${userId}`
    );
    return response?.data?.access_token || null;
  } catch (error) {
    console.log("generateToken:", error);
    return null;
  }
};
