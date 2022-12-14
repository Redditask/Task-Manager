import {FC} from "react";

export interface Task {
    id?: string;
    taskText: string;
    year?: number;
    month?: number;
    day?: number;
    startTime: Time;
    endTime: Time;
    color: TaskColor;
}

export interface ServerTask extends Task {
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface Time {
    hour: number;
    min: number;
}

export interface Color {
    name: string;
    color: string;
}

export interface CustomRoute {
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

export type TaskColor =
    "beige" | "#00FF7F" | "#CD5C5CFF" | "#C0C0C0" | "#4169E1";
