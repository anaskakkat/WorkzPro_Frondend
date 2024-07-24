import axios from "axios";
import { API_BASE_URL } from "../constants/constant_env";
const Api = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

export default Api;
