import styles from "./Calendar.module.scss";

import React, {useMemo, useState} from 'react';
import {isActiveMonth} from "./utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../store/taskManagerSlice";
import Button from "../UI/Button/Button";
import ChangeDateForm from "./SupportComponents/ChangeDateForm";

const utils = require ("./utils/utils");
const infoData = require("./utils/infoData");

const Calendar = ({value}) => {
    const tasks = useSelector(state => state.tasks.tasks);
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
        <div style={{marginTop: "-5rem"}}>
            <ChangeDateForm
                year={onCalendarYear}
                month={infoData.monthsList[onCalendarMonth]}
                nextYear={nextYear}
                nextMonth={nextMonth}
                prevYear={prevYear}
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

                        //доработать
                        const add = () => dispatch(addTask({
                            taskText: "123",
                            year: data.year,
                            month: data.month,
                            day: data.day
                        }))

                        return (
                            <div
                                className={className}
                                key={data.day + "" + data.month + "" + data.year}
                            >
                                <div className={styles.Calendar__cellTitle}>
                                    {data.day
                                        //доработать
                                    }
                                    <Button text="+" onClick={add} title="Add task"/>
                                </div>
                                <div className={styles.Calendar__tasks}>
                                    {tasks.map((task, index) => {
                                        //доработать
                                        if (task.day === data.day
                                            && task.month === data.month
                                            && task.year === data.year)
                                            return (
                                                <div
                                                    key={task.taskText + index}
                                                    className={styles.Calendar__task}
                                                >
                                                    {task.taskText}
                                                </div>
                                            )
                                    })}
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
