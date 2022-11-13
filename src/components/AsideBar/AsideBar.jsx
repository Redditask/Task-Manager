import styles from "./AsideBar.module.scss";

import React from 'react';
import {useSelector} from "react-redux";

const AsideBar = () => {
    //тут доработать
    const currentCell = useSelector(state => state.tasks.currentCell);
    const tasks = [];
    currentCell.map(task=>tasks.push(task.taskText))

    return (
        <div>
            <h2 className={styles.AsideBar__title}>Tasks</h2>
            <div className={styles.AsideBar}>
                <ul>
                    {tasks.length
                        ? tasks.map((task,index)=>
                            <li
                                className={styles.AsideBar__element}
                                key = {task+index}
                            >{task}</li>)
                        : <h3 className={styles.AsideBar__tasksIsEmpty}>No task today</h3>}
                </ul>
            </div>
        </div>
    );
};

export default AsideBar;
