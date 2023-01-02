// @ts-ignore
import styles from "./AddTaskForm.module.scss";

import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {postTask} from "../../API/taskAPI";

import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import TimePicker from "../TimePicker/TimePicker";

import {StringChangeEvent, Task, TaskColor, Theme, Time} from "../../types/types";
import {selectTheme, selectUserId} from "../../store/selectors";

const today = new Date();
let day: string = String(today.getDate());
let month: string = String(today.getMonth());
let year: string = String(today.getFullYear());

interface AddTaskFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    date: string;
}

const AddTaskForm:React.FC<AddTaskFormProps> = ({setModalStatus, date}) => {
    const [text, setText] = useState<string>("Your task");
    const [color, setColor] = useState<TaskColor>("beige");

    const [startTime, setStartTime] = useState<Time>({hour: 0, min: 0});
    const [endTime, setEndTime] = useState<Time>({hour: 23, min: 59});

    if (date) [day, month, year] = date.split("-");

    const dispatch = useAppDispatch();
    const userId: number = useAppSelector(selectUserId);

    const addTaskToStore = (text: string, color: TaskColor, startTime: Time, endTime: Time): void => {
        const task: Task = {
            taskText: text,
            year: Number(year),
            month: Number(month),
            day: Number(day),
            startTime: startTime,
            endTime: endTime,
            color: color,
        };

        dispatch(postTask({task, userId}));

        setModalStatus(false);
    };

    const submitAdd = (): void => addTaskToStore(text, color, startTime, endTime);

    const changeInputHandler = (event: StringChangeEvent): void => setText(event.target.value);

    return (
        <div className={styles.AddTaskForm}>
            <h2 className={styles.AddTaskForm__title}>Create a task</h2>
            <div className={styles.AddTaskForm__inputArea}>
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
                <ColorPicker color={color} setColor={setColor}/>
            </div>
            <div className={styles.AddTaskForm__buttonArea}>
                {
                    text
                        ? <Button
                            title="Add task"
                            text="Create"
                            onClick={submitAdd}
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
