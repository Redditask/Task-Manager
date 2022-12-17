import React from 'react';

import {useAppDispatch} from "../../hooks/hooks";
import {addTask, removeTask, setSelectedCell} from "../../store/taskManagerSlice";

import Button from "../UI/Button/Button";
import CalendarTaskList from "../CalendarTaskList/CalendarTaskList";

// @ts-ignore
import styles from "./CalendarCell.module.scss";

import {CustomDate, Task} from "../../types/data";

interface ICalendarCellProps {
    className: string;
    data: CustomDate;
    setModalStatus: (modalStatus: boolean) => void;
    setDate: (date: string) => void;
    dropTask: Task;
    setDropTask: (dropTask: Task)=>void;
}

const CalendarCell:React.FC<ICalendarCellProps> = ({className, data, setModalStatus, setDate, dropTask, setDropTask}) => {
    const dispatch = useAppDispatch();

    //drag and drop functionality
    function dragOverHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    function dropHandler(event: React.DragEvent<HTMLDivElement>, data: CustomDate) {
        event.preventDefault();
        if (!(data.year === dropTask.year
            && data.month === dropTask.month
            && data.day === dropTask.day)) {

            if(dropTask.id) {
                dispatch(removeTask({id: dropTask.id}));
            }

            dispatch(addTask({
                taskText: dropTask.taskText,
                year: data.year,
                month: data.month,
                day: data.day,
                startTime: dropTask.startTime,
                endTime: dropTask.endTime,
                color: dropTask.color,
            }))
        }
    }

    return (
        <div
            title="Cell"
            className={className}
            onClick={() => dispatch(setSelectedCell(data.day + "-" + data.month + "-" + data.year))}

            onDragOver={event => dragOverHandler(event)}
            onDrop={event => dropHandler(event, data)}
        >
            <div className={styles.CalendarCell__title}>
                {data.day}
                <Button text="+" onClick={() => {
                    setModalStatus(true)
                    setDate(`${data.day}-${data.month}-${data.year}`)
                }}
                        title="Add task"
                />
            </div>
            <CalendarTaskList data={data} setDropTask={setDropTask}/>
        </div>
    );
};

export default CalendarCell;
