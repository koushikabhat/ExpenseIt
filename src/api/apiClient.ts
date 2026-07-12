import axios from "axios";
import { storage } from "../storage/mmkv";


const apiClient =  axios.create({
    baseURL : "http://192.168.1.7:8000",
    timeout: 30000,

    headers : {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});



apiClient.interceptors.request.use(
    async(config) => {
        console.log("the config is ",config)
        const token = storage.getString("access_token");

        if (token) {
          console.log("the tokne is ",token)
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        // console.log("the resposne is ",response);
        return response;
    }, 
    (error) => {
        // console.log("the error is", error)
        return Promise.reject(error);
    }
);

export default apiClient;
