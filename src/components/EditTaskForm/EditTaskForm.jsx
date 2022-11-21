import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {editTask} from "../../store/taskManagerSlice";

import styles from "./EditTaskForm.module.scss";

import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import Button from "../UI/Button/Button";

const EditTaskForm = ({setEditModalStatus, task}) => {
    const [text, setText] = useState("Your task");
    const [color, setColor] = useState("beige");

    //пофиксить это, чтобы не было ошибки про неуправляемый input
    useEffect(()=>{
        setText(task.taskText);
        setColor(task.color);
    }, [task]);

    const dispatch = useDispatch();
    const edit = (id, text, color) => dispatch(editTask({
            id: id,
            text: text,
            color: color
    }));

    return (
        <div className={styles.EditTaskForm}>
            <h2 className={styles.EditTaskForm__title}>Edit your task:</h2>
            <div className={styles.EditTaskForm__inputArea}>
                <Input
                    value={text}
                    onChange={event=>setText(event.target.value)}
                />
                <Select color={color} setColor={setColor}/>
            </div>
            <div className={styles.EditTaskForm__buttonArea}>
                {
                    text
                        ? <Button
                            text="Edit"
                            onClick={()=>{
                                edit(task.id, text, color)
                                setEditModalStatus(false)
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

export default EditTaskForm;
