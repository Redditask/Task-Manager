import styles from "./AsideBar.module.scss";

import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {removeTask} from "../../store/taskManagerSlice";
import Button from "../UI/Button/Button";

const AsideBar = ({setModalStatus, setDate}) => {
    const tasks = useSelector(state => state.tasks.currentCell);
    const date = useSelector(state => state.tasks.currentCellDate);

    const dispatch = useDispatch();
    const remove = (taskId) => dispatch(removeTask(taskId));

    return (
        <div className={styles.Container}>
            <div className={styles.AsideBar__header}>
                <h2 className={styles.AsideBar__title}>Tasks</h2>
                <h3 style={{textDecoration:"underline"}}>{date ? date : "Select date"}</h3>
            </div>
            <div className={styles.AsideBar}>
                <ul>
                    {tasks.length
                        ? tasks.map((task,index)=>
                            <div
                                className={styles.AsideBar__element}
                                key = {task+index}
                            >
                                <li
                                    className={styles.AsideBar__task}
                                >{task.taskText}</li>
                                <Button
                                    text="Remove this task"
                                    onClick={()=>remove(task.id)}
                                />
                            </div>
                        )
                        : <h3 className={styles.AsideBar__tasksIsEmpty}>No task today</h3>}
                </ul>
            </div>
            <div className={styles.AsideBar__button}>
                <Button
                    text="+"
                    onClick={() => {
                        setModalStatus(true)
                        setDate(`${date}`)}
                    }
                        title="Add another task for this day"
                />
            </div>
        </div>
    );
};

export default AsideBar;
