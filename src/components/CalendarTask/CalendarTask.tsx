import React from 'react';

// @ts-ignore
import styles from "./CalendarTask.module.scss";

import {Task} from "../../types/data";

interface ICalendarTaskProps {
    task: Task;
    setDropTask: (dropTask: Task) => void;
}

const CalendarTask:React.FC<ICalendarTaskProps> = ({task, setDropTask}) => {
    function dragStartHandler(task: Task) {
        setDropTask(task);
    }

    return (
        <div
            className={styles.CalendarTask}
            style={{backgroundColor: task.color}}

            draggable={true}
            onDragStart={() => dragStartHandler(task)}
        >
            {task.taskText}
        </div>
    );
};

export default CalendarTask;
