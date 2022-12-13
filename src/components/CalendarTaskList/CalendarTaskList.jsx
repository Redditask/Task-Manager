import styles from "./CalendarTaskList.module.scss";

import React from 'react';
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/selectors";
import CalendarTask from "../CalendarTask/CalendarTask";

const CalendarTaskList = ({data, setDropTask}) => {
    const tasks = useSelector(selectTasks);

    return (
        <div className={styles.CalendarTaskList}>
            {
                tasks.map((task, index) => {
                    if (task.day === data.day
                        && task.month === data.month
                        && task.year === data.year)
                        return (
                            <CalendarTask
                                key={task.taskText + index}
                                task={task}
                                setDropTask={setDropTask}
                            />
                        )
                })
            }
        </div>
    );
};

export default CalendarTaskList;
