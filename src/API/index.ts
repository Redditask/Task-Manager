import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const $host: AxiosInstance = axios.create({
    baseURL: process.env["REACT_APP_API_URL"]
});

const $authHost: AxiosInstance = axios.create({
    baseURL: process.env["REACT_APP_API_URL"]
});

const authInterceptor = (config: AxiosRequestConfig<any>):
    AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> => {
    // @ts-ignore
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost,
};
