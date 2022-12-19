// @ts-ignore
import styles from "./CalendarTaskList.module.scss";

import React from 'react';

import {useAppSelector} from "../../hooks/hooks";
import {selectTasks} from "../../store/selectors";

import CalendarTask from "../CalendarTask/CalendarTask";

import {CustomDate, Task} from "../../types/types";

interface CalendarTaskListProps {
    data: CustomDate;
    setDropTask: (dropTask: Task) => void;
}

const CalendarTaskList:React.FC<CalendarTaskListProps> = ({data, setDropTask}) => {
    const tasks: Task[] = useAppSelector(selectTasks);

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
