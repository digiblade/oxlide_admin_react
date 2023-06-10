import axios from "axios";

const axiosWithAuth = (token) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add the bearer token to the Authorization header
  };
  if (token === null || token === undefined || token === "") {
    delete headers.Authorization;
  }
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Your API base URL
    headers: headers,
  });

  return instance;
};

export default axiosWithAuth;
