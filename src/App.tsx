// @ts-ignore
import styles from './App.module.scss';

import React, {useEffect, useState} from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";
import Loader from "./components/UI/Loader/Loader";

import {check} from "./API/userAPI";

import {useAppDispatch} from "./hooks/hooks";
import {setUserId} from "./store/taskManagerSlice";

/*
ToDo
 readme поправить
 //
 добавить thunk в store
 обновить тесты
 всплывающие окна для ошибок (и на стороне сервера сообщения некоторые поправить)
 придумать еще как пофиксить баг с цветом кнопки после выхода (при включенной темной теме) - navlink мб
 //
 адаптивная вёрстка
*/

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        check()
            .then(data => {
                dispatch(setUserId({userId: data.id}));
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
