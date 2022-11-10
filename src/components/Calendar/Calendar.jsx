import styles from "./Calendar.module.scss";

import React, {useMemo, useState} from 'react';
import {isActiveMonth} from "./utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/taskManagerSlice";

const utils = require ("./utils/utils");
const infoData = require("./utils/infoData");

const Calendar = ({value}) => {
    const text = "1234";

    const tasks = useSelector(state=>state.tasks.tasks);
    const dispatch = useDispatch();

    const [onCalendarYear, setOnCalendarYear] = useState(() => value.getFullYear());
    const [onCalendarMonth, setOnCalendarMonth] = useState(() => value.getMonth());

    const calendarData = useMemo(() => {
        const prevMonth = utils.getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth = utils.getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth = utils.getNextMonthDays(onCalendarYear, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

    const nextYear = () => {
        setOnCalendarYear(year => year + 1);
    }

    const prevYear = () => {
        setOnCalendarYear(onCalendarYear - 1);
    }

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

    return (
        <div className={styles.Calendar}>
            {infoData.weekDayList.map(weekDay =>
                <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
            )}
            {calendarData.map(data => {
                    let className = styles.Calendar__cell;
                    if (isActiveMonth(data, onCalendarMonth)) className = styles.Calendar__activeMonth;
                    if (utils.isToday(data)) className = styles.Calendar__currentDay;

                    const add = () => dispatch(addTask({text: "123", year: data.year, month: data.month, day: data.day}))

                    return (
                        <div
                            onClick={add}
                            className={className}
                            key={data.day + "" + data.month + "" + data.year}
                        >
                            {data.day}
                                {tasks.map(task=>{
                                    if(task.day===data.day) return (
                                        <div>{task.text}</div>
                                    )
                                })}
                        </div>
                    )
                }
            )}
        </div>
    );
};

export default Calendar;
