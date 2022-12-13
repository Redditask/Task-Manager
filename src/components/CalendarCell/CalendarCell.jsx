import React from 'react';

import {useDispatch} from "react-redux";
import {addTask, removeTask, setSelectedCell} from "../../store/taskManagerSlice";

import Button from "../UI/Button/Button";
import CalendarTaskList from "../CalendarTaskList/CalendarTaskList";

import styles from "./CalendarCell.module.scss";

const CalendarCell = ({className, data, setModalStatus, setDate, dropTask, setDropTask}) => {
    const dispatch = useDispatch();

    //drag and drop functionality
    function dragOverHandler(event) {
        event.preventDefault();
    }

    function dropHandler(event, data) {
        event.preventDefault();
        if (!(data.year === dropTask.year
            && data.month === dropTask.month
            && data.day === dropTask.day)) {
            dispatch(removeTask({id: dropTask.id}));

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
