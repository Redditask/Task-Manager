import styles from "./AsideBar.module.scss";
import "./Transition.scss";

import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {removeTask} from "../../store/taskManagerSlice";

import {CSSTransition, TransitionGroup} from "react-transition-group";

import Button from "../UI/Button/Button";

const AsideBar = ({setModalStatus, setDate}) => {
    const tasks = useSelector(state => state.tasks.currentCellTasks);
    const date = useSelector(state => state.tasks.currentCellDate);

    const dispatch = useDispatch();
    const remove = (taskId) => dispatch(removeTask(taskId));

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
                            <div className={styles.AsideBar__task}>
                                <li className={styles.AsideBar__content}>
                                    <div
                                        className={styles.AsideBar__contentColor}
                                        style={{background:task.color}}
                                    />
                                    {task.taskText}
                                </li>
                                <div style={{marginTop:"-1.5rem"}}>
                                    <Button
                                        text="Remove"
                                        onClick={()=>remove(task.id)}
                                    />
                                </div>
                            </div>
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
            <div className={styles.AsideBar__buttonArea}>
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
