import React from 'react';

import {useAppDispatch} from "../../hooks/hooks";
import {addTask, removeTask, setSelectedCell} from "../../store/taskManagerSlice";
import {PayloadAction} from "@reduxjs/toolkit";

import Button from "../UI/Button/Button";
import CalendarTaskList from "../CalendarTaskList/CalendarTaskList";

// @ts-ignore
import styles from "./CalendarCell.module.scss";

import {CustomDate, Task} from "../../types/data";

interface CalendarCellProps {
    className: string;
    data: CustomDate;
    setModalStatus: (modalStatus: boolean) => void;
    setDate: (date: string) => void;
    dropTask: Task;
    setDropTask: (dropTask: Task)=>void;
}

const CalendarCell:React.FC<CalendarCellProps> = ({className, data, setModalStatus, setDate, dropTask, setDropTask}) => {
    const dispatch = useAppDispatch();

    //drag and drop functionality
    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
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
            }));
        }
    };

    const openAddTaskForm = (): void => {
        setModalStatus(true);
        setDate(`${data.day}-${data.month}-${data.year}`);
    };

    const setThisCellSelected = (): PayloadAction<string> =>
        dispatch(setSelectedCell(`${data.day}-${data.month}-${data.year}`));

    return (
        <div
            title="Cell"
            className={className}
            onClick={setThisCellSelected}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            <div className={styles.CalendarCell__title}>
                {data.day}
                <Button
                    text="+"
                    title="Add task"
                    onClick={openAddTaskForm}
                />
            </div>
            <CalendarTaskList data={data} setDropTask={setDropTask}/>
        </div>
    );
};

export default CalendarCell;
