import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://webify-software-company.onrender.com",
  withCredentials: true,
});
