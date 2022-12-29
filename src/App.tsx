// @ts-ignore
import styles from './App.module.scss';

import React from "react";

import {BrowserRouter} from "react-router-dom";

import AppRouter from "./components/AppRouter/AppRouter";

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
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
