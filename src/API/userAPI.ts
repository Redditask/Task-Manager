import {$authHost, $host} from "./index";

import jwtDecode from "jwt-decode";

import {User} from "../types/types";

export const registration = async (login: string, password: string): Promise<User> => {
    const {data} = await $host.post("api/user/registration", {login, password});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const logIn = async (login: string, password: string): Promise<User> => {
    const {data} = await $host.post("api/user/login", {login, password});
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const check = async (): Promise<User> => {
    const {data} = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};
