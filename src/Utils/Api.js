import axiosWithAuth from "./Api.helper";

const token = localStorage.getItem(
  process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY
);

const api = axiosWithAuth(token);

export const httpPOST = async (url, payload) => {
  try {
    let response = await api.post(url, payload);
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
export const httpGET = async (url) => {
  let response = await api.get(url);
  return { status: response.status, data: response.data };
};
