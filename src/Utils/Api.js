import axiosWithAuth from "./Api.helper";

const token = localStorage.getItem(
  process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY
);

const api = axiosWithAuth(token);

export const httpPOST = async (url, payload) => {
  let response = await api.post(url, payload);
  if (response.status === 401 || response.status === 405) {
    localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY);
    window.location.href = "/";
  }
  return { status: response.status, data: response.data };
};
export const httpGET = async (url) => {
  let response = await api.get(url);
  return { status: response.status, data: response.data };
};
