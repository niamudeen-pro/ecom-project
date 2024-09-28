import { api } from "../../utils/axios";

export const fetchProducts = async (url) => {
  const response = await api.get(url);
  return response;
};
