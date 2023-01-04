import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

/*
ToDo
 обновить тесты для асинхронного store и компонентов (+ добавить их для страниц)
 readme поправить
 //
 РЕФАКТОРИНГ:
 разбить на под-компоненты:
 AppRouter
 TimePicker
 в store:
 userId и selectedDate добавить null тип
 переименовать selectedDate, selectedTasks, setSelectedCell
 в setSelectedCell payload сделать через {...: string}
 changeTheme -> setTheme
 ^после этого обновить тесты и поправить изменения в компонентах^
 utils:
 перенести константы из utils в consts
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
