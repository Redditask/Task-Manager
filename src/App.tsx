// @ts-ignore
import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

/*
ToDo
 все таки делать еще проверку на userId при crud операциях
 возможно как-то перенести reducers в extrareducers
 добавить обработку (pending, reject)
 onClick в интерфейсе Button как-то лучше типизировать
 типизировать цвет задачи
 readme поправить
 //
 всплывающие окна для ошибок (и на стороне сервера сообщения некоторые поправить)
 придумать еще как пофиксить баг с цветом кнопки после выхода (при включенной темной теме) - navlink мб
 или (распространять тему и на страницу логина (и хранить тему всегда))
 обновить тесты для асинхронного store (+ добавить их для страниц?)
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
