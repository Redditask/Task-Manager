import styles from "./EditTaskForm.module.scss";

import React, {useState} from 'react';

import {updateTask} from "../../API/taskAPI";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {selectUserId} from "../../store/selectors";

import Textarea from "../UI/Textarea/Textarea";
import ColorPicker from "../ColorPicker/ColorPicker";
import Button from "../UI/Button/Button";
import TimePicker from "../TimePicker/TimePicker";

import {StringChangeEvent, Task, TaskColor, Time} from "../../types/types";

interface EditTaskFormProps {
    setEditModalStatus: (editModalStatus: boolean)=>void;
    selectedTask: Task;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({setEditModalStatus, selectedTask}) => {
    const [text, setText] = useState<string>(selectedTask.taskText);
    const [color, setColor] = useState<TaskColor>(selectedTask.color);
    const [startTime, setStartTime] = useState<Time>({hour: selectedTask.startTime.hour, min: selectedTask.startTime.min});
    const [endTime, setEndTime] = useState<Time>({hour: selectedTask.endTime.hour, min: selectedTask.endTime.min});

    const dispatch = useAppDispatch();
    const userId: number | null = useAppSelector(selectUserId);

    const submitEdit = (): void => {
        if (selectedTask.id && userId) {
            const task: Task = {
                id: selectedTask.id,
                taskText: text,
                startTime: startTime,
                endTime: endTime,
                color: color
            };

            dispatch(updateTask({task, userId}));
        }

        setEditModalStatus(false);
    };

    const changeInputHandler = (event: StringChangeEvent): void => setText(event.target.value);

    return (
        <form className={styles.EditTaskForm}>
            <h2 className={styles.EditTaskForm__title}>Edit your task:</h2>
            <div className={styles.EditTaskForm__inputArea}>
                <Textarea
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
        </form>
    );
};

export default EditTaskForm;
