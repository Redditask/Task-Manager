// @ts-ignore
import styles from "./AddTaskForm.module.scss";

import React, {useState} from 'react';

import {useAppDispatch} from "../../hooks/hooks";
import {addTask} from "../../store/taskManagerSlice";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import TimePicker from "../TimePicker/TimePicker";

import {Time} from "../../types/data";

interface IAddTaskFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    date: string;
}

const AddTaskForm:React.FC<IAddTaskFormProps> = ({setModalStatus, date}) => {
    const [text, setText] = useState("Your task");
    const [color, setColor] = useState("beige");

    const [startTime, setStartTime] = useState({hour: 0, min: 0});
    const [endTime, setEndTime] = useState({hour: 23, min: 59});

    const today = new Date();
    let day= String(today.getDate());
    let month= String(today.getMonth());
    let year=String(today.getFullYear());

    if(date) [day, month, year] = date.split("-");

    const dispatch = useAppDispatch();
    const add = (text: string, color: string, startTime: Time, endTime:Time) => dispatch(addTask({
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
                <ColorPicker color={color} setColor={setColor}/>
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