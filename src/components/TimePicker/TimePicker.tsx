import styles from "./TimePicker.module.scss";

import React, {memo} from "react";

import {Time} from "../../types/types";

import {hours, mins} from "../../utils/consts";

interface TimePickerProps {
    startTime: Time;
    setStartTime: (startTime: Time)=>void;
    endTime: Time;
    setEndTime: (endTime: Time)=>void;
}

const TimePicker: React.FC<TimePickerProps> = memo(({startTime, setStartTime, endTime, setEndTime}) => {
    const startHourChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const newHour: number = Number(event.target.value);
        if (endTime.hour <= newHour) {
            setEndTime({...endTime, hour: newHour});

            if (endTime.min <= startTime.min) {
                startTime.min === 59
                    ? setEndTime({hour: newHour, min: 59})
                    : setEndTime({hour: newHour, min: startTime.min + 1});
            }
        }

        setStartTime({...startTime, hour: newHour});
    };

    const startMinChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const newMin: number = Number(event.target.value);
        if (startTime.hour === endTime.hour) {
            if (endTime.min <= newMin) {
                newMin === 59
                    ? setEndTime({...endTime, min: 59})
                    : setEndTime({...endTime, min: newMin + 1});
            }
        }

        setStartTime({...startTime, min: newMin});
    };

    const endHourChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const newHour: number = Number(event.target.value);
        if (newHour === startTime.hour) {
            if (startTime.min >= endTime.min) {
                startTime.min === 59
                    ? setEndTime({hour: newHour, min: 59})
                    : setEndTime({hour: newHour, min: startTime.min + 1});
            }
        } else setEndTime({...endTime, hour: newHour});
    };

    const endMinChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setEndTime({...endTime, min: Number(event.target.value)});
    };

    return (
        <div className={styles.Container}>
            Start time:
            <div className={styles.Container__startTime}>
                <select
                    title="Start hour"
                    value={startTime.hour}
                    className={styles.TimeSelect}
                    onChange={startHourChangeHandler}
                >
                    {hours.map((hour: number) =>
                        <option key={`startTimeHour - ${hour}`}>{hour}</option>
                    )}
                </select>
                <b style={{fontSize: "1.3rem"}}> : </b>
                <select
                    title="Start minute"
                    value={startTime.min}
                    className={styles.TimeSelect}
                    onChange={startMinChangeHandler}
                >
                    {mins.map((min: number) =>
                        <option key={`startTimeMin - ${min}`}>{min}</option>
                    )}
                </select>
            </div>
            End time:
            <div className={styles.Container__endTime}>
                <select
                    title="End hour"
                    value={endTime.hour}
                    className={styles.TimeSelect}
                    onChange={endHourChangeHandler}
                >
                    {hours.map((hour: number) =>
                        hour >= startTime.hour
                            ?
                            <option key={`endTimeHour - ${hour}`}>{hour}</option>
                            :
                            <option
                                key={`endTimeHour - ${hour}`}
                                disabled
                                style={{backgroundColor: "silver"}}
                            >
                                {hour}
                            </option>
                    )}
                </select>
                <b style={{fontSize: "1.3rem"}}> : </b>
                <select
                    title="End minute"
                    value={endTime.min}
                    className={styles.TimeSelect}
                    onChange={endMinChangeHandler}
                >
                    {mins.map((min: number) =>
                        startTime.hour === endTime.hour
                            ?
                            min > startTime.min
                                ?
                                <option key={`endTimeMin - ${min}`}>{min}</option>
                                :
                                <option
                                    key={`endTimeMin - ${min}`}
                                    disabled
                                    style={{backgroundColor: "silver"}}
                                >
                                    {min}
                                </option>
                            :
                            <option key={`endTimeMin - ${min}`}>{min}</option>
                    )}
                </select>
            </div>
        </div>
    );
});

export default TimePicker;
