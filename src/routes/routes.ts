import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

import Main from "../pages/Main/Main";
import Auth from "../pages/Auth/Auth";

import {Route} from "../types/types";

export const authRoutes: Route[] = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    }
];

export const publicRoutes: Route[] = [
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    }
];
