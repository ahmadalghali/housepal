import axios from "axios";

const runningInProduction = import.meta.env.PROD;

let BASE_URL;

// if (true) {
BASE_URL = "https://house-chores-logger-api-production.up.railway.app";
// } else {
//   BASE_URL = "http://localhost:8050";
// }

const axiosInstance = axios.create({ baseURL: BASE_URL });

export { axiosInstance as api };
