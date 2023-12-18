import axios from "axios";
import { config } from "../constants/AppConstants";

const BASE_URL = config.url.API_URL;

axios.defaults.baseURL = BASE_URL;

const token = localStorage.getItem("token");

axios.defaults.headers.common = {
    'Authorization':`bearer ${token}`
}


export default axios;