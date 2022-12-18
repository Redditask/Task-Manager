// @ts-ignore
import styles from "./AsideBar.module.scss";

import React, {useState} from 'react';

import {useAppSelector} from "../../hooks/hooks";
import {selectSelectedDate} from "../../store/selectors";

import Button from "../UI/Button/Button";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import Modal from "../UI/Modal/Modal";
import AsideTaskList from "../AsideTaskList/AsideTaskList";

import {Task} from "../../types/data";

interface AsideBarProps {
    setModalStatus: (modalStatus: boolean) => void;
    setDate: (date: string) => void;
}

const AsideBar: React.FC<AsideBarProps> = ({setModalStatus, setDate}) => {
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>({
        color: "beige",
        day: 0,
        endTime: {hour: 1, min: 0},
        id: "without id",
        month: 0,
        startTime: {hour: 1, min: 0},
        taskText: "Your task",
        year: 0
    });

    const date = useAppSelector(selectSelectedDate);

    const openAddTaskForm = (): void => {
        setModalStatus(true);
        setDate(`${date}`);
    };

    return (
        <aside className={styles.Container}>
            <div className={styles.AsideBar__header}>
                <h2 className={styles.AsideBar__title}>Tasks</h2>
                <h3 className={styles.AsideBar__date}>{date ? date : "Select date"}</h3>
            </div>
            <hr/>
            <div className={styles.AsideBar}>
                <AsideTaskList
                    setEditModalStatus={setEditModalStatus}
                    setSelectedTask={setSelectedTask}
                />
            </div>
            <hr/>
            <div className={styles.AsideBar__addButtonArea}>
                <Button
                    text="+"
                    title="Add another task for this day"
                    onClick={openAddTaskForm}
                />
            </div>
            <Modal visible={editModalStatus} setVisible={setEditModalStatus}>
                {editModalStatus
                    ? <EditTaskForm setEditModalStatus={setEditModalStatus} selectedTask={selectedTask}/>
                    : null
                }
            </Modal>
        </aside>
    );
};

export default AsideBar;
