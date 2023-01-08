import styles from "./CalendarCell.module.scss";

import React, {memo} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setSelectedCell} from "../../store/taskManagerSlice";
import {deleteTask, createTask} from "../../API/taskAPI";
import {PayloadAction} from "@reduxjs/toolkit";
import {selectUserId} from "../../store/selectors";

import Button from "../UI/Button/Button";
import CalendarTaskList from "../CalendarTaskList/CalendarTaskList";

import {CustomDate, Task} from "../../types/types";

interface CalendarCellProps {
    className: string;
    date: CustomDate;
    setModalStatus: (modalStatus: boolean) => void;
    setDate: (date: string) => void;
    dropTask: Task;
    setDropTask: (dropTask: Task)=>void;
}

const CalendarCell:React.FC<CalendarCellProps> = memo(({className, date, setModalStatus, setDate, dropTask, setDropTask}) => {
    const dispatch = useAppDispatch();
    const userId: number | null = useAppSelector(selectUserId);

    //drag and drop functionality
    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();

        if (!(date.year === dropTask.year
            && date.month === dropTask.month
            && date.day === dropTask.day)) {

            if(dropTask.id && userId) {
                dispatch(deleteTask({id: dropTask.id, userId}));
            }

            const task: Task = {
                taskText: dropTask.taskText,
                year: date.year,
                month: date.month,
                day: date.day,
                startTime: dropTask.startTime,
                endTime: dropTask.endTime,
                color: dropTask.color,
            };

            if (userId) dispatch(createTask({task, userId}));
        }
    };

    const openAddTaskForm = (): void => {
        setModalStatus(true);
        setDate(`${date.day}-${date.month}-${date.year}`);
    };

    const setThisCellSelected = (): PayloadAction<{ date: string }> =>
        dispatch(setSelectedCell({date:`${date.day}-${date.month}-${date.year}`}));

    return (
        <div
            title="Cell"
            className={className}
            onClick={setThisCellSelected}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            <div className={styles.CalendarCell__title}>
                {date.day}
                <Button
                    text="+"
                    title="Add task"
                    onClick={openAddTaskForm}
                />
            </div>
            <CalendarTaskList date={date} setDropTask={setDropTask}/>
        </div>
    );
});

export default CalendarCell;
