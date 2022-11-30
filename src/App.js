import styles from './App.module.scss';

import {useState} from "react";

import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/UI/Modal/Modal";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";

/*
ToDo
 тестирование компонентов React
 //
 время для задач добавить
 авторизация
 //
 адаптивная вёрстка
*/

function App() {
    const [date, setDate] = useState();
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
