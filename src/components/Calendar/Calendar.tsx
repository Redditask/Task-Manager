// @ts-ignore
import styles from "./Calendar.module.scss";

import React, {memo, useMemo, useState} from 'react';

import ChangeDateForm from "../ChangeDateForm/ChangeDateForm";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import CalendarCell from "../CalendarCell/CalendarCell";
import Button from "../UI/Button/Button";
import Loader from "../UI/Loader/Loader";

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {changeTheme, setUserId} from "../../store/taskManagerSlice";
import {selectError, selectLoadingStatus} from "../../store/selectors";

import {CustomDate, Task} from "../../types/types";

import {
    getCurrMonthDays,
    getNextMonthDays,
    getPrevMonthDays,
    isActiveMonth,
    isToday,
    monthsList,
    weekDayList,
} from "../../utils/utils";

interface CalendarProps {
    setModalStatus: (modalStatus: boolean)=>void;
    setDate: (date: string)=> void;
}

const Calendar: React.FC<CalendarProps> = memo(({setModalStatus, setDate}) => {
    const [dropTask, setDropTask] = useState<Task>({
        color: "beige",
        day: 0,
        endTime: {hour: 1, min: 0},
        id: "without id",
        month: 0,
        startTime: {hour: 1, min: 0},
        taskText: "Your task",
        year: 0
    });

    //base calendar functionality
    const startValue: Date = new Date();

    const [onCalendarYear, setOnCalendarYear] = useState<number>(() => startValue.getFullYear());
    const [onCalendarMonth, setOnCalendarMonth] = useState<number>(() => startValue.getMonth());

    const calendarData: CustomDate[] = useMemo(() => {
        const prevMonth: CustomDate[] = getPrevMonthDays(onCalendarYear, onCalendarMonth);
        const currMonth: CustomDate[] = getCurrMonthDays(onCalendarYear, onCalendarMonth);
        const nextMonth: CustomDate[] = getNextMonthDays(onCalendarYear, onCalendarMonth);

        return [...prevMonth, ...currMonth, ...nextMonth];
    }, [onCalendarYear, onCalendarMonth]);

    const nextMonth = (): void => {
        if (onCalendarMonth === 11) {
            setOnCalendarYear(onCalendarYear + 1);
            setOnCalendarMonth(0);
        } else setOnCalendarMonth(onCalendarMonth + 1);
    };

    const prevMonth = (): void => {
        if (onCalendarMonth === 0) {
            setOnCalendarYear(onCalendarYear - 1);
            setOnCalendarMonth(11);
        } else setOnCalendarMonth(onCalendarMonth - 1);
    };

    const isLoading: boolean = useAppSelector(selectLoadingStatus);
    const error: string | null = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    const signOut = (): void => {
        dispatch(setUserId({userId: 0}));
        dispatch(changeTheme({theme: "light"}));
    };

    if (error) prompt(error);

    return (
        <div className={styles.Container}>
            <div className={styles.Calendar__header}>
                <ChangeDateForm
                    year={onCalendarYear}
                    month={monthsList[onCalendarMonth]}
                    nextMonth={nextMonth}
                    prevMonth={prevMonth}
                />
                {isLoading && <Loader/>}
                <ThemeSelector/>
            </div>
            <div className={styles.Calendar}>
                {weekDayList.map((weekDay: string) =>
                    <div className={styles.Calendar__weekDay} key={weekDay}>{weekDay}</div>
                )}
                {calendarData.map(data => {
                        let className = styles.Calendar__cell;
                        if (isActiveMonth(data, onCalendarMonth)) className = styles.Calendar__activeMonth;
                        if (isToday(data)) className = styles.Calendar__currentDay;

                        return (
                            <CalendarCell
                                key={`${data.day}${data.month}${data.year}`}
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
            <div className={styles.Calendar__footer}>
                <Button
                    text="Sign out"
                    onClick={signOut}
                />
            </div>
        </div>
    );
});

export default Calendar;
