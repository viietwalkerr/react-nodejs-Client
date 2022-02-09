import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "..";


const API = process.env.REACT_APP_BACKEND_API;

const instance = axios.create({ baseURL: API });

instance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        const isFetchingToken = !config.url?.includes("/token");
        const existingAuthToken = config?.headers?.Authorization;

        if (isFetchingToken && !existingAuthToken) {
            config.headers = {
                Authorization: `${store.getState().auth?.accessToken}`,
            };
        }
        return config;
    },
    (error) => {
        return error;
    }
);


instance.interceptors.response.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        return config;
    },
    async (error: AxiosError) => {
        
    }
);

export default instance;