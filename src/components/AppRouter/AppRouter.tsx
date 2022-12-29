import React from 'react';

import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../../routes/routes";
import {MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

import {selectUserId} from "../../store/selectors";
import {useAppSelector} from "../../hooks/hooks";

const AppRouter: React.FC = () => {
    const userId = useAppSelector(selectUserId);

    return (
        userId !== 0
            ?
            <Routes>
                {authRoutes.map((route)=>
                        <Route key={route.path} path={route.path} element={<route.Component/>}/>
                )}
                <Route path="/*" element={<Navigate to={MAIN_ROUTE} replace />}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route)=>
                        <Route key={route.path} path={route.path} element={<route.Component/>}/>
                )}
                <Route path="/*" element={<Navigate to={REGISTRATION_ROUTE} replace />}/>
            </Routes>
    );
};

export default AppRouter;
