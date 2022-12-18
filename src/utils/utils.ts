import {Color, CustomDate} from "../types/data";

export const hours: number[] = [];
for(let i = 0; i<24; i++){
    hours[i] = i;
}

export const mins: number[] = [];
for(let i = 0; i<60; i++){
    mins[i] = i;
}

export const colors: Color[] = [
    {name: "beige", color: "beige"},
    {name: "green", color: "#00FF7F"},
    {name: "red", color: "#CD5C5CFF"},
    {name: "silver", color: "#C0C0C0"},
    {name: "blue", color: "#4169E1"},
];

export const monthsList: string[] = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

export const weekDayList: string[] = [
    "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat",
    "Sun",
];

export const weekDays = {
    0: 6, 1: 0, 2: 1,
    3: 2, 4: 3, 5: 4,
    6: 5,
};

export const visibleDays: number = 7 * 6;

export const getDaysAmount = (year: number, month: number): number => {
    const nextMonth: Date = new Date(year, month+1, 1);
    //получаем сколько в месяце дней путём вычитания из следующего месяца 1 минуты
    nextMonth.setMinutes(-1);
    return nextMonth.getDate();
};

export const getWeekDay = (date: Date): number => {
    const day: number = date.getDay();

    // @ts-ignore
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

export const isActiveMonth = (data: CustomDate, onCalendarMonth: number): boolean => {
    return data.month === onCalendarMonth;
};
