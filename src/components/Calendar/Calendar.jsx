import styles from "./Calendar.module.scss";

import React, {useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import {addTask, removeTask, setSelectedCell} from "../../store/taskManagerSlice";

import {isActiveMonth} from "./utils/utils";

import Button from "../UI/Button/Button";
import ChangeDateForm from "./SupportComponents/ChangeDateForm/ChangeDateForm";
import ThemeSelector from "./SupportComponents/ThemeSelector/ThemeSelector";
import CalendarTaskList from "./SupportComponents/CalendarTaskList/CalendarTaskList";
import CalendarCell from "./SupportComponents/CalendarCell/CalendarCell";

const utils = require ("./utils/utils");
const infoData = require("./utils/infoData");

const Calendar = ({setModalStatus, setDate}) => {
    const [dropTask, setDropTask] = useState({});

    //base calendar functionality
    const startValue = new Date();

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

    return (
        <div className={styles.Container}>
            <div className={styles.Calendar__header}>
                <ChangeDateForm
                    year={onCalendarYear}
                    month={infoData.monthsList[onCalendarMonth]}
                    nextMonth={nextMonth}
                    prevMonth={prevMonth}
                />
                <ThemeSelector/>
            </div>
            <div className={styles.Calendar}>
                {infoData.weekDayList.map(weekDay =>
                    <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data => {
                        let className = styles.Calendar__cell;
                        if (isActiveMonth(data, onCalendarMonth)) className = styles.Calendar__activeMonth;
                        if (utils.isToday(data)) className = styles.Calendar__currentDay;

                        return (
                            <CalendarCell
                                key={data.day + "" + data.month + "" + data.year}
                                className={className}
                                data={data}
                                setDate={setDate}
                                setModalStatus={setModalStatus}
                                dropTask={dropTask}
                                setDropTask={setDropTask}
                            />
                        )
                    }
                )}
            </div>
        </div>
    );
};

export default Calendar;
