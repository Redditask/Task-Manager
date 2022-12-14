import React from 'react';

import {Time} from "../../types/data";

// @ts-ignore
import styles from "./TimePicker.module.scss";

import {hours, mins} from "../../utils/utils";

interface ITimePickerProps {
    startTime: Time;
    setStartTime: (startTime: Time)=>void;
    endTime: Time;
    setEndTime: (endTime: Time)=>void;
}

const TimePicker: React.FC<ITimePickerProps> = ({startTime, setStartTime, endTime, setEndTime}) => {
    return (
        <div className={styles.Container}>
            Start time:
            <div className={styles.Container__startTime}>
                <select
                    title="Start hour"
                    value={startTime.hour}
                    className={styles.TimeSelect}
                    onChange={event => setStartTime({...startTime, hour: Number(event.target.value)})}
                >
                    {hours.map((hour:number)=>
                        <option key={`startTimeHour - ${hour}`}>{hour}</option>
                    )}
                </select>
                <b style={{fontSize:"1.3rem"}}> : </b>
                <select
                    title="Start minute"
                    value={startTime.min}
                    className={styles.TimeSelect}
                    onChange={event => setStartTime({...startTime, min: Number(event.target.value)})}
                >
                    {mins.map((min:number)=>
                        <option key={`startTimeMin - ${min}`}>{min}</option>
                    )}
                </select>
            </div>
            End time:
            <div  className={styles.Container__endTime}>
                <select
                    title="End hour"
                    value={endTime.hour}
                    className={styles.TimeSelect}
                    onChange={event => setEndTime({...endTime, hour: Number(event.target.value)})}
                >
                    {hours.map((hour:number)=>
                        hour >= startTime.hour
                            ?
                            <option key={`endTimeHour - ${hour}`}>{hour}</option>
                            :
                            <option
                                key={`endTimeHour - ${hour}`}
                                disabled
                                style={{backgroundColor:"silver"}}
                            >
                                {hour}
                            </option>
                    )}
                </select>
                <b style={{fontSize:"1.3rem"}}> : </b>
                <select
                    title="End minute"
                    value={endTime.min}
                    className={styles.TimeSelect}
                    onChange={event => setEndTime({...endTime, min: Number(event.target.value)})}
                >
                    {mins.map((min:number)=>
                        startTime.hour === endTime.hour
                            ?
                            min > startTime.min
                                ?
                                <option key={`endTimeMin - ${min}`}>{min}</option>
                                :
                                <option
                                    key={`endTimeMin - ${min}`}
                                    disabled
                                    style={{backgroundColor:"silver"}}
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
};

export default TimePicker;
