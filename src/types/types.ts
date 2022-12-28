import {FC} from "react";

export interface Task {
    id?: string;
    taskText: string;

    year?: number;
    month?: number;
    day?: number;
    startTime: Time;
    endTime: Time;
    color: string;
}

export interface Time {
    hour: number;
    min: number;
}

export interface Color {
    name: string;
    color: string;
}

export interface Route {
    path: string,
    Component: FC<{}>;
}

export interface CustomDate {
    year: number;
    month: number;
    day: number;
}

export interface User {
    exp: number;
    iat: number;
    id: number;
    login: string;
}

export type StringChangeEvent = {
    target: {
        value: string
    }
};

export type Theme = "light" | "dark";
