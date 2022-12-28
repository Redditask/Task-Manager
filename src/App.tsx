// @ts-ignore
import styles from './App.module.scss';

import React, {useEffect, useState} from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";
import Loader from "./components/UI/Loader/Loader";

import {check} from "./API/userAPI";

import {useAppDispatch} from "./hooks/hooks";
import {setUser} from "./store/taskManagerSlice";


/*
ToDo
 readme поправить
 //
 юзер в отдельный слой (?)
 обновить тесты
 всплывающие окна для ошибок (и на стороне сервера сообещния некоторый поправить)
 //придумать еще как пофиксить баг с цветом кнопки после выхода (при включенной темной теме)
 //
 адаптивная вёрстка
*/

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        check()
            .then(data => {
                dispatch(setUser({user: data.id}));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader/>

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
