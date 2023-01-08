import {Color} from "../types/types";

export const MAIN_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";

export const visibleDays: number = 42;

export const weekDays: any = {
    0: 6, 1: 0, 2: 1,
    3: 2, 4: 3, 5: 4,
    6: 5,
};

export const weekDayList: string[] = [
    "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat",
    "Sun",
];

export const monthsList: string[] = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

export const colors: Color[] = [
    {name: "beige", color: "beige"},
    {name: "green", color: "#00FF7F"},
    {name: "red", color: "#CD5C5CFF"},
    {name: "silver", color: "#C0C0C0"},
    {name: "blue", color: "#4169E1"},
];

export const hours: number[] = [];
for(let i = 0; i<24; i++){
    hours[i] = i;
}

export const mins: number[] = [];
for(let i = 0; i<60; i++){
    mins[i] = i;
}

export const themeVariable: string[] = [
    "Color", "BgColor",
    "BorderColor", "ButtonColor",
    "ShadowColor", "HoverBgColor",
    "HoverColor", "ActiveMonthColor",
    "UnActiveMonthColor"
];
