export type Task = {
    id?: string;
    taskText: string;
    year?: number;
    month?: number;
    day?: number;
    startTime: Time;
    endTime: Time;
    color: string;
};

export type Time = {
    hour: number;
    min: number;
};

export type CustomDate = {
    year: number;
    month: number;
    day: number;
};
