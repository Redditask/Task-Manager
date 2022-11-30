import React from 'react';
import AsideTask from "../AsideTask/AsideTask";

import {CSSTransition, TransitionGroup} from "react-transition-group";

import styles from "./AsideTaskList.module.scss";
import "../../Transition.scss";

import {useSelector} from "react-redux";
import {selectSelectedTasks} from "../../../../store/selectors";

const AsideTaskList = ({setSelectedTask, setEditModalStatus}) => {
    const tasks = useSelector(selectSelectedTasks);

    return (
        <TransitionGroup>
            {tasks.length
                ? tasks.map((task,index)=>(
                        <CSSTransition
                            key = {task+index}
                            timeout={500}
                            classNames="item"
                        >
                            <AsideTask
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
                    <h3 className={styles.TasksIsEmpty}>No task today</h3>
                </CSSTransition>
            }
        </TransitionGroup>
    );
};

export default AsideTaskList;
