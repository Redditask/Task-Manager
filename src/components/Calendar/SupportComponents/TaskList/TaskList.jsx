import styles from "./TaskList.module.scss";

import React from 'react';
import {useSelector} from "react-redux";
import {selectTasks} from "../../../../store/selectors";

const TaskList = ({data, setDropTask}) => {
    const tasks = useSelector(selectTasks);

    function dragStartHandler(task) {
        setDropTask(task);
    }

    return (
        <div className={styles.Tasks}>
            {
                tasks.map((task, index) => {
                    if (task.day === data.day
                        && task.month === data.month
                        && task.year === data.year)
                        return (
                            <div
                                key={task.taskText + index}
                                className={styles.Task}
                                style={{backgroundColor: task.color}}

                                draggable={true}
                                onDragStart={() => dragStartHandler(task)}
                            >
                                {task.taskText}
                            </div>
                        )
                })
            }
        </div>
    );
};

export default TaskList;
