import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {editTask} from "../../store/taskManagerSlice";

import styles from "./EditTaskForm.module.scss";

import Input from "../UI/Input/Input";
import ColorPicker from "../ColorPicker/ColorPicker";
import Button from "../UI/Button/Button";
import TimePicker from "../TimePicker/TimePicker";

const EditTaskForm = ({setEditModalStatus, selectedTask}) => {
    const [text, setText] = useState(selectedTask.taskText);
    const [color, setColor] = useState(selectedTask.color);
    const [startTime, setStartTime] = useState({hour: selectedTask.startTime.hour, min: selectedTask.startTime.min});
    const [endTime, setEndTime] = useState({hour: selectedTask.endTime.hour, min: selectedTask.endTime.min});

    const dispatch = useDispatch();
    const edit = (id, text, color, startTime, endTime) => dispatch(editTask({
            id: id,
            text: text,
            startTime: startTime,
            endTime: endTime,
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
                <TimePicker
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                />
                <ColorPicker
                    color={color}
                    setColor={setColor}
                />
            </div>
            <div className={styles.EditTaskForm__buttonArea}>
                {
                    text
                        ? <Button
                            title="Edit"
                            text="Edit"
                            onClick={()=>{
                                edit(selectedTask.id, text, color, startTime, endTime)
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
