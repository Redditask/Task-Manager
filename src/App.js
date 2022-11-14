import styles from './App.module.scss';
import AsideBar from "./components/AsideBar/AsideBar";
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";
import Modal from "./components/UI/Modal/Modal";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";

/*
ToDo
 анимацию выдвижения AsideBar слева направо при нажатии (TransitionGroup) (+анимации удаления и добавления тасок)
 добавить возможность выбирать цвет таски (?)
 сохранять таски в localStorage
 добавление задачи в AsideBar, внизу AsideBar (?)
 задачи по времени
 возможность повторять таски периодически (каждые 2 дня/каждая неделя)
 //
 визуальное (цветовое) разделение четных и нечетных недель например
 //
 сделать красивее полоску скролла
 надпись Tasks как-то по-другому расположить (чуть выше ?)
 //
 вынести данные из render(), в Calendar, в отдельный компонент (что-то типо CalendarDataList)
 //
 темная тема
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
