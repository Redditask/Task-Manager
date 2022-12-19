import React, {useState} from 'react';

import {editTask} from "../../store/taskManagerSlice";
import {useAppDispatch} from "../../hooks/hooks";

// @ts-ignore
import styles from "./EditTaskForm.module.scss";

import Input from "../UI/Input/Input";
import ColorPicker from "../ColorPicker/ColorPicker";
import Button from "../UI/Button/Button";
import TimePicker from "../TimePicker/TimePicker";

import {StringChangeEvent, Task, Time} from "../../types/types";

interface EditTaskFormProps {
    setEditModalStatus: (editModalStatus: boolean)=>void;
    selectedTask: Task;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({setEditModalStatus, selectedTask}) => {
    const [text, setText] = useState<string>(selectedTask.taskText);
    const [color, setColor] = useState<string>(selectedTask.color);
    const [startTime, setStartTime] = useState<Time>({hour: selectedTask.startTime.hour, min: selectedTask.startTime.min});
    const [endTime, setEndTime] = useState<Time>({hour: selectedTask.endTime.hour, min: selectedTask.endTime.min});

    const dispatch = useAppDispatch();

    const submitEdit = (): void => {
        if (selectedTask.id) {
            dispatch(editTask({
                id: selectedTask.id,
                taskText: text,
                startTime: startTime,
                endTime: endTime,
                color: color
            }));
        }

        setEditModalStatus(false);
    };

    const changeInputHandler = (event: StringChangeEvent): void => setText(event.target.value);

    return (
        <div className={styles.EditTaskForm}>
            <h2 className={styles.EditTaskForm__title}>Edit your task:</h2>
            <div className={styles.EditTaskForm__inputArea}>
                <Input
                    value={text}
                    onChange={changeInputHandler}
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
                            onClick={submitEdit}
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
