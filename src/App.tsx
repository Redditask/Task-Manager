// @ts-ignore
import styles from './App.module.scss';

import React, {useState} from "react";

import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/UI/Modal/Modal";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";

/*
ToDo
 исправить отсчёт месяцев с 0 до 11
 поправить timePicker, когда начальное время выбирают больше чем конечное
 //
 авторизация (бд + сервер)
 //
 разобраться с оптимизацией
 //
 адаптивная вёрстка
*/

const App: React.FC = () => {
    const [date, setDate] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    return (
        <div className={styles.App}>
            <AsideBar setModalStatus={setModalStatus} setDate={setDate}/>
            <Calendar setModalStatus={setModalStatus} setDate={setDate}/>
            <Modal visible={modalStatus} setVisible={setModalStatus}>
                {
                    modalStatus
                        ? <AddTaskForm setModalStatus={setModalStatus} date={date}/>
                        : null
                }
            </Modal>
        </div>
    );
}

export default App;
