import styles from "./AddTaskForm.module.scss";

import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addTask} from "../../store/taskManagerSlice";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import TimePicker from "../UI/TimePicker/TimePicker";

const AddTaskForm = ({setModalStatus, date}) => {
    const [text, setText] = useState("Your task");
    const [color, setColor] = useState("beige");

    const [startTime, setStartTime] = useState({hour: 0, min: 0});
    const [endTime, setEndTime] = useState({hour: 23, min: 59});

    const today = new Date();
    let day=today.getDate();
    let month=today.getMonth();
    let year=today.getFullYear();

    if(date) [day, month, year] = date.split("-");

    const dispatch = useDispatch();
    const add = (text, color, startTime, endTime) => dispatch(addTask({
        taskText: text,
        year: Number(year),
        month: Number(month),
        day: Number(day),
        startTime: startTime,
        endTime: endTime,
        color: color,
    }));

    return (
        <div className={styles.AddTaskForm}>
            <h2 className={styles.AddTaskForm__title}>Create a task</h2>
            <div className={styles.AddTaskForm__inputArea}>
                <Input
                    value={text}
                    onChange={event=>setText(event.target.value)}
                />
                <TimePicker
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <Select color={color} setColor={setColor}/>
            </div>
            <div className={styles.AddTaskForm__buttonArea}>
                {
                    text
                        ? <Button
                            title="Add task"
                            text="Create"
                            onClick={()=>{
                                add(text, color, startTime, endTime)
                                setModalStatus(false)
                            }}
                        />
                        : <Button
                            text="Input is empty"
                        />
                }
            </div>
        </div>
    );
};

export default AddTaskForm;
