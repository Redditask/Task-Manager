import {$host} from "./index";
import jwtDecode from "jwt-decode";
import {User} from "../types/types";

export const registration = async (login: string, password: string): Promise<User> => {
    const {data} = await $host.post("api/user/registration", {login, password});
    return jwtDecode(data.token);
};

export const logIn = async (login: string, password: string): Promise<User> => {
    const {data} = await $host.post("api/user/login", {login, password});
    return jwtDecode(data.token);
};

export const auth = async (login: string, password: string) => {
    return await $host.post("api/user/auth", {login, password});
};
