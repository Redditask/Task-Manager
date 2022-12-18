// @ts-ignore
import styles from "./AddTaskForm.module.scss";

import React, {useState} from 'react';

import {useAppDispatch} from "../../hooks/hooks";
import {addTask} from "../../store/taskManagerSlice";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import TimePicker from "../TimePicker/TimePicker";

import {StringChangeEvent, Time} from "../../types/data";

interface AddTaskFormProps {
    setModalStatus: (modalStatus: boolean) => void;
    date: string;
}

const AddTaskForm:React.FC<AddTaskFormProps> = ({setModalStatus, date}) => {
    const [text, setText] = useState<string>("Your task");
    const [color, setColor] = useState<string>("beige");

    const [startTime, setStartTime] = useState<Time>({hour: 0, min: 0});
    const [endTime, setEndTime] = useState<Time>({hour: 23, min: 59});

    const today = new Date();
    let day: string = String(today.getDate());
    let month: string = String(today.getMonth());
    let year: string = String(today.getFullYear());

    if (date) [day, month, year] = date.split("-");

    const dispatch = useAppDispatch();

    const addTaskToStore = (text: string, color: string, startTime: Time, endTime: Time): void => {
        dispatch(addTask({
            taskText: text,
            year: Number(year),
            month: Number(month),
            day: Number(day),
            startTime: startTime,
            endTime: endTime,
            color: color,
        }));

        setModalStatus(false);
    };

    const submitAdd = (): void => addTaskToStore(text, color, startTime, endTime);

    const changeInputHandler = (event: StringChangeEvent): void => setText(event.target.value);

    return (
        <div className={styles.AddTaskForm}>
            <h2 className={styles.AddTaskForm__title}>Create a task</h2>
            <div className={styles.AddTaskForm__inputArea}>
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
