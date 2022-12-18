import React from 'react';

// @ts-ignore
import styles from "./CalendarTask.module.scss";

import {Task} from "../../types/data";

interface CalendarTaskProps {
    task: Task;
    setDropTask: (dropTask: Task) => void;
}

const CalendarTask:React.FC<CalendarTaskProps> = ({task, setDropTask}) => {
    const dragStartHandler = (): void => {
        setDropTask(task);
    };

    return (
        <div
            className={styles.CalendarTask}
            style={{backgroundColor: task.color}}
            draggable={true}
            onDragStart={dragStartHandler}
        >
            {task.taskText}
        </div>
    );
};

export default CalendarTask;
