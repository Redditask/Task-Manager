// @ts-ignore
import styles from "./Main.module.scss";

import React, {useState} from 'react';

import AsideBar from "../../components/AsideBar/AsideBar";
import Calendar from "../../components/Calendar/Calendar";
import Modal from "../../components/UI/Modal/Modal";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";

const Main: React.FC = () => {
    const [date, setDate] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    return (
        <div className={styles.Main}>
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
};

export default Main;
