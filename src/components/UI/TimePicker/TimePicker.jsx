import React from 'react';

import styles from "./TimePicker.module.scss";
const utils = require("./utils/utils");

const TimePicker = ({startTime, setStartTime, endTime, setEndTime}) => {
    return (
        <div className={styles.Container}>
            Start time:
            <div className={styles.Container__startTime}>
                <select
                    value={startTime.hour}
                    className={styles.TimeSelect}
                    onChange={event => setStartTime({...startTime, hour: Number(event.target.value)})}
                >
                    {utils.hours.map((hour)=>
                        <option key={`startTimeHour - ${hour}`}>{hour}</option>
                    )}
                </select>
                <select
                    value={startTime.min}
                    className={styles.TimeSelect}
                    onChange={event => setStartTime({...startTime, min: Number(event.target.value)})}
                >
                    {utils.mins.map((min)=>
                        <option key={`startTimeMin - ${min}`}>{min}</option>
                    )}
                </select>
            </div>
            End time:
            <div  className={styles.Container__endTime}>
                <select
                    value={endTime.hour}
                    className={styles.TimeSelect}
                    onChange={event => setEndTime({...endTime, hour: Number(event.target.value)})}
                >
                    {utils.hours.map((hour)=>
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
                <select
                    value={endTime.min}
                    className={styles.TimeSelect}
                    onChange={event => setEndTime({...endTime, min: Number(event.target.value)})}
                >
                    {utils.mins.map((min)=>
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
