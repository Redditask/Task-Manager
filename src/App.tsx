// @ts-ignore
import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

/*
ToDo
 код на сервере отрефакторить (в будущем на TS переписать)
 добавить обработку (pending, reject)
 возможно как-то перенести reducers в extrareducers
 onClick в интерфейсе Button как-то лучше типизировать
 //
 readme поправить
 типизировать цвет задачи
 //
 обновить тесты для асинхронного store (+ добавить их для страниц?)
 всплывающие окна для ошибок (и на стороне сервера сообщения некоторые поправить)
 придумать еще как пофиксить баг с цветом кнопки после выхода (при включенной темной теме) - navlink мб
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
