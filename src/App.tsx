import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

/*
ToDo
    добавить кнопку обновления в AsideBar (?)
 //
 ТЕСТЫ:
    добавить замоканный стор для тестирования компонентов (?)
 //
 АВТОРИЗАЦИЯ/РЕГИСТРАЦИЯ:
    в Auth setUserId исправить, чтобы undefined в alert не вылазил
    подправить авторизацию (скрыть токен)
 //
 ДИЗАЙН:
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
