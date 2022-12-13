// @ts-ignore
import styles from "./Calendar.module.scss";

import React, {useMemo, useState} from 'react';

import ChangeDateForm from "../ChangeDateForm/ChangeDateForm";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import CalendarCell from "../CalendarCell/CalendarCell";

import {Task} from "../../types/data";

const utils = require ("../../utils/utils");

interface ICalendarProps {
    setModalStatus: (modalStatus: boolean)=>void;
    setDate: (date: string)=> void;
}

const Calendar: React.FC<ICalendarProps> = ({setModalStatus, setDate}) => {
    //проверить это!!!
    const [dropTask, setDropTask] = useState<Task>({
        color: "beige",
        day: 0,
        endTime: {hour: 1, min: 0},
        id: "",
        month: 0,
        startTime: {hour: 1, min: 0},
        taskText: "",
        year: 0
    });

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
                    month={utils.monthsList[onCalendarMonth]}
                    nextMonth={nextMonth}
                    prevMonth={prevMonth}
                />
                <ThemeSelector/>
            </div>
            <div className={styles.Calendar}>
                {utils.weekDayList.map((weekDay:string) =>
                    <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data => {
                        let className = styles.Calendar__cell;
                        if (utils.isActiveMonth(data, onCalendarMonth)) className = styles.Calendar__activeMonth;
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
