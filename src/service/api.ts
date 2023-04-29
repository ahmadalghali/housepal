import axios from "axios";

export const BASE_URL = "http://localhost:8050";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export { axiosInstance as api };
