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

export type Color = {
    name: string;
    color: string;
};

export type CustomDate = {
    year: number;
    month: number;
    day: number;
};

export type StringChangeEvent = {
    target: {
        value: string
    }
};

export type Theme = "light" | "dark";
