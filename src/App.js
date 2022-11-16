import styles from './App.module.scss';
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";
import Modal from "./components/UI/Modal/Modal";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";

/*
ToDo
 анимации удаления и добавления тасок (TransitionGroup)
 добавление задачи в AsideBar, внизу AsideBar (?)
 сделать красивее полоску скролла
 //
 изменить (+расположение) переключатели года/месяца (например оставить только переключение месяца, а год будет просто отображаться) (?)
 //
 вынести данные из render(), в Calendar, в отдельный компонент (что-то типо CalendarDataList)
 //
 добавить возможность выбирать цвет таски (?)
 темная тема
 задачи по времени
 //
 возможность повторять таски периодически (каждые 2 дня/каждая неделя)
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
