import styles from "./AsideBar.module.scss";

import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {selectSelectedDate} from "../../store/selectors";

import Button from "../UI/Button/Button";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import Modal from "../UI/Modal/Modal";
import AsideTaskList from "./SupportComponents/AsideTaskList/AsideTaskList";

const AsideBar = ({setModalStatus, setDate}) => {
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const date = useSelector(selectSelectedDate);

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
                    onClick={() => {
                        setModalStatus(true)
                        setDate(`${date}`)}
                    }
                        title="Add another task for this day"
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
