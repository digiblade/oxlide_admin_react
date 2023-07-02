import { getValueThroughJSON } from "./utils";

const axiosWithAuth = () => {
  const tokenDetails = localStorage.getItem(
    process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY
  );
  let token = getValueThroughJSON(tokenDetails, ".authorization.token", "");
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add the bearer token to the Authorization header
  };
  if (token === null || token === undefined || token === "") {
    delete headers.Authorization;
  }
  return {
    baseURL: process.env.REACT_APP_BASE_URL, // Your API base URL
    headers: headers,
  };
};

export default axiosWithAuth;
