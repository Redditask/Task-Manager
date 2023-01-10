import {visibleDays, weekDays} from "./consts";

import {CustomDate, Task} from "../types/types";

export const getDaysAmount = (year: number, month: number): number => {
    const nextMonth: Date = new Date(year, month+1, 1);
    //получаем сколько в месяце дней путём вычитания из следующего месяца 1 минуты
    nextMonth.setMinutes(-1);
    return nextMonth.getDate();
};

export const getWeekDay = (date: Date): number => {
    const day: number = date.getDay();

    return weekDays[day];
};

export const getNextMonthDays = (year: number, month: number): CustomDate[] => {
    const nextMonthDaysAmount: number = visibleDays - getCurrMonthDays(year, month).length - getPrevMonthDays(year, month).length;

    const [nextYear, nextMonth]: [number, number] = (month === 11) ? [year+1, 0] : [year, month+1];
    const dates: CustomDate[] = [];
    for (let i = 1; i<=nextMonthDaysAmount; i++){
        dates.push({
            year: nextYear,
            month: nextMonth,
            day: i
        });
    }

    return dates;
};

export const getPrevMonthDays = (year: number, month: number): CustomDate[] => {
    const firstDayOfCurrentMonth: Date = new Date(year, month, 1);
    const weekDay: number = getWeekDay(firstDayOfCurrentMonth);
    const prevMonthDaysAmount: number = getDaysAmount(year, month-1);

    const [prevYear, prevMonth]: [number, number] = (month === 0) ? [year-1, 11] : [year, month-1];
    const dates: CustomDate[] = [];
    //weekDay - 1 = сколько дней нужно взять из предыдущего месяца
    for (let i = weekDay-1; i>=0; i--){
        dates.push({
            year: prevYear,
            month: prevMonth,
            day: prevMonthDaysAmount - i
        });
    }

    return dates;
};

export const getCurrMonthDays = (year: number, month: number): CustomDate[] => {
    const daysAmount: number = getDaysAmount(year, month);
    const dates: CustomDate[] = [];
    for (let i = 1; i<=daysAmount; i++){
        dates.push({
            year,
            month,
            day: i
        });
    }

    return dates;
};

export const isToday = (date: CustomDate): boolean => {
    const today: Date = new Date();

    return date.year === today.getFullYear()
        && date.month === today.getMonth()
        && date.day === today.getDate();
};

export const isActiveMonth = (date: CustomDate, onCalendarMonth: number): boolean => {
    return date.month === onCalendarMonth;
};

export const dateFormatting = (date: string | null): string => {
    if (date){
        const [day, month, year]: string[] = date.split("-");

        return `${day}-${Number(month) + 1}-${year}`;
    }

    return "Select date";
};

export const formattedTime = (task: Task): string => {
    let startZero: string = "";
    let endZero: string = "";

    if(task.startTime.min<=9) startZero = "0";
    if(task.endTime.min<=9) endZero = "0";

    return `${task.startTime.hour}:${startZero}${task.startTime.min}-${task.endTime.hour}:${endZero}${task.endTime.min}`;
};
