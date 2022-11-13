import styles from './App.module.scss';
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";
import Modal from "./components/UI/Modal/Modal";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";

/*
ToDo
 react && redux:
 анимацию выдвижения AsideBar слева направо
 добавить возможность выбирать цвет таски (?)
 сохранять таски в localStorage
 вынести данные из render(), в Calendar, в отдельный компонент (что-то типо CalendarDataList)
*/

function App() {
    const [date, setDate] = useState();
    const [modalStatus, setModalStatus] = useState(false);

    return (
        <div className={styles.App}>
            <AsideBar/>
            <Calendar setModalStatus={setModalStatus} setDate={setDate}/>
            <Modal visible={modalStatus} setVisible={setModalStatus}>
                <AddTaskForm setModalStatus={setModalStatus} date={date}/>
            </Modal>
        </div>
    );
}

export default App;
