import axios from "axios";

const baseUrl = "http://localhost:8800/api";

export const makeRequest = () => {
    return axios.create({
        baseURL: baseUrl,
        withCredentials: true
    });
}
