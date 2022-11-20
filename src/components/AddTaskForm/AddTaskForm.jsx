import styles from "./AddTaskForm.module.scss";

import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addTask} from "../../store/taskManagerSlice";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";

const AddTaskForm = ({setModalStatus, date}) => {
    const [taskText, setTaskText] = useState("Your task");
    const [color, setColor] = useState("beige");

    const today = new Date();
    let day=today.getDate();
    let month=today.getMonth();
    let year=today.getFullYear();

    if(date) [day, month, year] = date.split("-");

    const dispatch = useDispatch();
    const add = (text, color) => dispatch(addTask({
        taskText: text,
        year: Number(year),
        month: Number(month),
        day: Number(day),
        color: color,
    }))

    return (
        <div className={styles.AddTaskForm}>
            <h2 className={styles.AddTaskForm__title}>Create a task</h2>
            <div className={styles.AddTaskForm__inputArea}>
                <Input
                    value={taskText}
                    onChange={event=>setTaskText(event.target.value)}
                />
                <Select color={color} setColor={setColor}/>
            </div>
            <div className={styles.AddTaskForm__buttonArea}>
                {
                    taskText
                        ? <Button
                            text="Create"
                            onClick={()=>{
                                add(taskText, color)
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
