import styles from "./Calendar.module.scss";

import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTask, removeTask, setCurrentCell} from "../../store/taskManagerSlice";

import {isActiveMonth} from "./utils/utils";

import Button from "../UI/Button/Button";
import ChangeDateForm from "./SupportComponents/ChangeDateForm";

const utils = require ("./utils/utils");
const infoData = require("./utils/infoData");

const Calendar = ({setModalStatus, setDate}) => {
    //base calendar functionality
    const startValue = new Date();

    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    const [onCalendarYear, setOnCalendarYear] = useState(() => startValue.getFullYear());
    const [onCalendarMonth, setOnCalendarMonth] = useState(() => startValue.getMonth());

    const calendarData = useMemo(() => {
        const prevMonth = utils.getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth = utils.getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth = utils.getNextMonthDays(onCalendarYear, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

    const nextMonth = () => {
        if (onCalendarMonth === 11) {
            setOnCalendarYear(onCalendarYear + 1);
            setOnCalendarMonth(0);
        } else setOnCalendarMonth(onCalendarMonth + 1);
    }

    const prevMonth = () => {
        if (onCalendarMonth === 0) {
            setOnCalendarYear(onCalendarYear - 1);
            setOnCalendarMonth(11);
        } else setOnCalendarMonth(onCalendarMonth - 1);
    }

    //drag and drop functionality
    const [dropTask, setDropTask] = useState({});

    function dragOverHandler(event) {
        event.preventDefault();
    }

    function dragStartHandler(task) {
        setDropTask(task);
    }

    function dropHandler(event, data) {
        event.preventDefault();
        if (!(data.year === dropTask.year
            && data.month === dropTask.month
            && data.day === dropTask.day)) {
            dispatch(removeTask(dropTask.id));

            dispatch(addTask({
                taskText: dropTask.taskText,
                year: data.year,
                month: data.month,
                day: data.day,
                color: dropTask.color,
            }))
        }
    }

    return (
        <div className={styles.Container}>
            <ChangeDateForm
                year={onCalendarYear}
                month={infoData.monthsList[onCalendarMonth]}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
            />
            <div className={styles.Calendar}>
                {infoData.weekDayList.map(weekDay =>
                    <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data => {
                        let className = styles.Calendar__cell;
                        if (isActiveMonth(data, onCalendarMonth)) className = styles.Calendar__activeMonth;
                        if (utils.isToday(data)) className = styles.Calendar__currentDay;

                        return (
                            <div
                                className={className}
                                key={data.day + "" + data.month + "" + data.year}
                                onClick={() => dispatch(setCurrentCell(data.day + "-" + data.month + "-" + data.year))}

                                onDragOver={event => dragOverHandler(event)}
                                onDrop={event => dropHandler(event, data)}
                            >
                                <div className={styles.Calendar__cellTitleArea}>
                                    {data.day}
                                    <Button text="+" onClick={() => {
                                        setModalStatus(true)
                                        setDate(`${data.day}-${data.month}-${data.year}`)
                                    }
                                    }
                                            title="Add task"
                                    />
                                </div>
                                <div className={styles.Calendar__tasks}>
                                    {
                                        tasks.map((task, index) => {
                                            if (task.day === data.day
                                                && task.month === data.month
                                                && task.year === data.year)
                                                return (
                                                    <div
                                                        key={task.taskText + index}
                                                        className={styles.Calendar__task}
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
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    );
};

export default Calendar;
