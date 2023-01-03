// @ts-ignore
import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

/*
ToDo
 readme поправить
 //
 обновить тесты для асинхронного store и компонентов (+ добавить их для страниц)
 //
 код на сервере отрефакторить (в будущем на TS переписать)
 //
 адаптивная вёрстка
*/

const App: React.FC = () => {
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
