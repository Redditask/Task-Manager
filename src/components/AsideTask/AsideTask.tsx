import React from 'react';

// @ts-ignore
import styles from "./AsideTask.module.scss";

import Button from "../UI/Button/Button";

import {AiOutlineEdit} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {useAppDispatch} from "../../hooks/hooks";
import {removeTask} from "../../store/taskManagerSlice";
import {PayloadAction} from "@reduxjs/toolkit";

import {Task} from "../../types/data";

const formattedTime = (task: Task) => {
    let startZero = "";
    let endZero = "";

    if(task.startTime.min<=9) startZero = "0";
    if(task.endTime.min<=9) endZero = "0";

    return `${task.startTime.hour}:${startZero}${task.startTime.min}-${task.endTime.hour}:${endZero}${task.endTime.min}`;
};

interface AsideTaskProps {
    task: Task;
    setTask: (task: Task)=>void;
    setEditModalStatus: (editModalStatus: boolean)=>void;
}

const AsideTask: React.FC<AsideTaskProps> = ({task, setTask, setEditModalStatus}) => {
    const dispatch = useAppDispatch();
    const removeTaskFromStore = (taskId: string | undefined): PayloadAction<{ id: string }> =>
        dispatch(removeTask({id: taskId || "undefinedId"}));

    const submitRemove = (): PayloadAction<{ id: string }> => removeTaskFromStore(task.id);

    const openEditTaskForm = (): void => {
        setEditModalStatus(true);
        setTask(task);
    };

    return (
        <div className={styles.Task}>
            <li className={styles.Content}>
                <div
                    className={styles.Content__color}
                    style={{background: task.color}}
                />
                <div>
                    {task.taskText}
                    <div className={styles.Time} title="Task time">
                        {formattedTime(task)}
                    </div>
                </div>
            </li>
            <div className={styles.ButtonsArea}>
                <Button
                    text={<AiOutlineEdit size={25}/>}
                    title="Edit"
                    onClick={openEditTaskForm}
                />
                <Button
                    text={<MdDeleteOutline size={25}/>}
                    title="Remove"
                    onClick={submitRemove}
                />
            </div>
        </div>
    );
};

export default AsideTask;
