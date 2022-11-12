import styles from "./AddTaskForm.module.scss";

import React, {useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {useDispatch} from "react-redux";
import {addTask} from "../../store/taskManagerSlice";

const AddTaskForm = ({setModalStatus, date}) => {
    const [taskText, setTaskText] = useState("");

    const today = new Date();
    let day=today.getDate();
    let month=today.getMonth();
    let year=today.getFullYear();

    if(date) [day, month, year] = date.split("-");


    const dispatch = useDispatch();
    const add = (text) => dispatch(addTask({
        taskText: text,
        year: Number(year),
        month: Number(month),
        day: Number(day)
    }))

    return (
        <div className={styles.AddTaskForm}>
            <h2 className={styles.AddTaskForm__title}>Enter a task</h2>
            <Input
                value={taskText}
                onChange={event=>setTaskText(event.target.value)}
                defaultValue="Your task"/>
            <div className={styles.AddTaskForm__buttonArea}>
                <Button text="Enter" onClick={()=>{
                    add(taskText)
                    setModalStatus(false)
                }}/>
            </div>
        </div>
    );
};

export default AddTaskForm;
