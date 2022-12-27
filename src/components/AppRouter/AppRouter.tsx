import React from 'react';

import {Routes, Route} from "react-router-dom";
import {authRoutes, publicRoutes} from "../../routes";

import Main from "../../pages/Main/Main";
import Auth from "../../pages/Auth/Auth";

import {selectUser} from "../../store/selectors";
import {useAppSelector} from "../../hooks/hooks";

const AppRouter: React.FC = () => {
    const user = useAppSelector(selectUser);

    return (
        user !== 0
            ?
            <Routes>
                {authRoutes.map((route)=>
                        <Route key={route.path} path={route.path} element={<route.Component/>}/>
                )}
                <Route path="/*" element={<Main/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route)=>
                        <Route key={route.path} path={route.path} element={<route.Component/>}/>
                )}
                <Route path="/*" element={<Auth/>}/>
            </Routes>
    );
};

export default AppRouter;
