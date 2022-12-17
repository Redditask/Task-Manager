import React, {useState} from 'react';

import {editTask} from "../../store/taskManagerSlice";
import {useAppDispatch} from "../../hooks/hooks";

// @ts-ignore
import styles from "./EditTaskForm.module.scss";

import Input from "../UI/Input/Input";
import ColorPicker from "../ColorPicker/ColorPicker";
import Button from "../UI/Button/Button";
import TimePicker from "../TimePicker/TimePicker";

import {Task, Time} from "../../types/data";

interface IEditTaskFormProps {
    setEditModalStatus: (editModalStatus: boolean)=>void;
    selectedTask: Task;
}

const EditTaskForm: React.FC<IEditTaskFormProps> = ({setEditModalStatus, selectedTask}) => {
    const [text, setText] = useState(selectedTask.taskText);
    const [color, setColor] = useState(selectedTask.color);
    const [startTime, setStartTime] = useState({hour: selectedTask.startTime.hour, min: selectedTask.startTime.min});
    const [endTime, setEndTime] = useState({hour: selectedTask.endTime.hour, min: selectedTask.endTime.min});

    const dispatch = useAppDispatch();
    const edit = (id: string, text: string, color:string, startTime: Time, endTime: Time) => dispatch(editTask({
            id: id,
            taskText: text,
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
                                if (selectedTask.id != null) {
                                    edit(selectedTask.id, text, color, startTime, endTime)
                                }
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
