import React from 'react';

import styles from "./CalendarTask.module.scss";

const CalendarTask = ({task, setDropTask}) => {
    function dragStartHandler(task) {
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
