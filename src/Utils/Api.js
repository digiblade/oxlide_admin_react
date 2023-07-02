import axiosWithAuth from "./Api.helper";
import axios from "axios";
export const httpPOST = async (url, payload, addOnHeader) => {
  try {
    const { baseURL, headers } = axiosWithAuth();
    let response = await axios.post(baseURL + url, payload, {
      headers: headers,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 405) {
        localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY);
        window.location.href = "/";
      }
      return { status: error.response.status, data: [] };
    }
    return { status: 500, data: [] };
  }
};
export const httpGET = async (url, addOnHeader) => {
  const { baseURL, headers } = axiosWithAuth();
  let response = await axios.get(baseURL + url, { ...headers, ...addOnHeader });
  return { status: response.status, data: response.data };
};
