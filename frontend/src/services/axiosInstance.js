import axios from "axios";

// base for axios api 

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/user/",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;