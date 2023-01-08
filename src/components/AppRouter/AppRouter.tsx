import React from 'react';

import {authRoutes, publicRoutes} from "../../routes/routes";
import {MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

import {selectUserId} from "../../store/selectors";
import {useAppSelector} from "../../hooks/hooks";

import CustomRoutes from "../CustomRoutes/CustomRoutes";

const AppRouter: React.FC = () => {
    const userId: number | null = useAppSelector(selectUserId);

    return (
        userId
            ? <CustomRoutes routes={authRoutes} redirectRout={MAIN_ROUTE}/>
            : <CustomRoutes routes={publicRoutes} redirectRout={REGISTRATION_ROUTE}/>
    );
};

export default AppRouter;
