import React from 'react';
import AsideTask from "../AsideTask/AsideTask";

import {CSSTransition, TransitionGroup} from "react-transition-group";

// @ts-ignore
import styles from "./AsideTaskList.module.scss";
import "../../Transition.scss";

import {selectSelectedTasks} from "../../store/selectors";
import {useAppSelector} from "../../hooks/hooks";

import {Task} from "../../types/data";

interface AsideTaskListProps {
    setSelectedTask: (task: Task) => void;
    setEditModalStatus: (editModalStatus: boolean) => void;
}

const AsideTaskList: React.FC<AsideTaskListProps> = ({setSelectedTask, setEditModalStatus}) => {
    const tasks: Task[] = useAppSelector(selectSelectedTasks);

    return (
        <TransitionGroup>
            {tasks.length
                ? tasks.map((task, index) => (
                        <CSSTransition
                            key={`${index}-${task.id || "undefinedId"}`}
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
