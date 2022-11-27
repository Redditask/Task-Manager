import styles from "./AsideBar.module.scss";
import "./Transition.scss";

import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {selectSelectedDate, selectSelectedTasks} from "../../store/selectors";

import {CSSTransition, TransitionGroup} from "react-transition-group";

import Button from "../UI/Button/Button";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import Modal from "../UI/Modal/Modal";
import Task from "./SupportComponents/Task/Task";

const AsideBar = ({setModalStatus, setDate}) => {
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const tasks = useSelector(selectSelectedTasks);
    const date = useSelector(selectSelectedDate);

    return (
        <div className={styles.Container}>
            <div className={styles.AsideBar__header}>
                <h2 className={styles.AsideBar__title}>Tasks</h2>
                <h3 className={styles.AsideBar__date}>{date ? date : "Select date"}</h3>
            </div>
            <hr/>
            <TransitionGroup className={styles.AsideBar}>
                    {tasks.length
                        ? tasks.map((task,index)=>(
                            <CSSTransition
                                key = {task+index}
                                timeout={500}
                                classNames="item"
                            >
                                <Task
                                    task={task}
                                    setTask={setSelectedTask}
                                    setEditModalStatus={setEditModalStatus}
                                />
                            </CSSTransition>
                            )
                        )
                        : <CSSTransition
                            key="tasksIsEmpty"
                            timeout={500}
                            classNames="item"
                        >
                            <h3 className={styles.AsideBar__tasksIsEmpty}>No task today</h3>
                        </CSSTransition>
                    }
            </TransitionGroup>
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
        </div>
    );
};

export default AsideBar;
