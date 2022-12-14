// @ts-ignore
import styles from './App.module.scss';

import React, {useState} from "react";

import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/UI/Modal/Modal";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";

/*
ToDo
 тесты на ts
 //
 авторизация (бд + сервер)
 //
 разобраться с оптимизацией
 //
 адаптивная вёрстка
*/

const App: React.FC = () => {
    const [date, setDate] = useState("");
    const [modalStatus, setModalStatus] = useState(false);

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
