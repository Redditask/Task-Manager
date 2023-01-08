import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

/*
ToDo
 РЕФАКТОРИНГ:
 разбить на под-компоненты:
 AppRouter
 TimePicker
 в store:
 userId и selectedDate добавить null тип
 переименовать selectedDate, selectedTasks, setSelectedCell
 в setSelectedCell payload сделать через {...: string} (в getTasks в taskAPI)
 changeTheme -> setTheme
 ^после этого обновить тесты и поправить изменения в компонентах^
 state.tasks.push (и selectedTasks) вынести в функцию
 переименовать thukn-и
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
