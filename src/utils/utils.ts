import {CustomDate} from "../types/data";

const hours: number[] = [];
for(let i = 0; i<24; i++){
    hours[i] = i;
}

const mins: number[] = [];
for(let i = 0; i<60; i++){
    mins[i] = i;
}

const colors = [
    {name: "beige", color: "beige"},
    {name: "green", color: "#00FF7F"},
    {name: "red", color: "#CD5C5CFF"},
    {name: "silver", color: "#C0C0C0"},
    {name: "blue", color: "#4169E1"},
];

const monthsList = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

const weekDayList = [
    "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat",
    "Sun",
];

const weekDays = {
    0: 6, 1: 0, 2: 1,
    3: 2, 4: 3, 5: 4,
    6: 5,
};

const visibleDays = 7 * 6;

const getDaysAmount = (year: number, month: number) => {
    const nextMonth = new Date(year, month+1, 1);
    //получаем сколько в месяце дней путём вычитания из следующего месяца 1 минуты
    nextMonth.setMinutes(-1);
    return nextMonth.getDate();
};

const getWeekDay = (date: Date): number => {
    const day = date.getDay();

    // @ts-ignore
    return weekDays[day];
};

const getNextMonthDays = (year: number, month: number) => {
    const nextMonthDaysAmount = visibleDays - getCurrMonthDays(year, month).length - getPrevMonthDays(year, month).length;

    const [nextYear, nextMonth] = (month === 11) ? [year+1, 0] : [year, month+1];
    const dates = [];
    for (let i = 1; i<=nextMonthDaysAmount; i++){
        dates.push({
            year: nextYear,
            month: nextMonth,
            day: i
        });
    }

    return dates;
};

const getPrevMonthDays = (year: number, month: number) => {
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    const weekDay = getWeekDay(firstDayOfCurrentMonth);
    const prevMonthDaysAmount = getDaysAmount(year, month-1);

    const [prevYear, prevMonth] = (month === 0) ? [year-1, 11] : [year, month-1];
    const dates = [];
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

const getCurrMonthDays = (year: number, month: number) => {
    const daysAmount = getDaysAmount(year, month);
    const dates = [];
    for (let i = 1; i<=daysAmount; i++){
        dates.push({
            year,
            month,
            day: i
        });
    }

    return dates;
};

const isToday = (date: CustomDate) => {
    const today = new Date();

    if(date.year === today.getFullYear()
        && date.month === today.getMonth()
        && date.day === today.getDate()) return true;

    return false;
};

const isActiveMonth = (data: CustomDate, onCalendarMonth: number) => {
    if (data.month===onCalendarMonth) return true;

    return false;
};

module.exports = {
    hours,
    mins,
    colors,
    monthsList,
    weekDayList,
    weekDays,
    visibleDays,
    getDaysAmount,
    getWeekDay,
    getPrevMonthDays,
    getCurrMonthDays,
    getNextMonthDays,
    isToday,
    isActiveMonth,
};
