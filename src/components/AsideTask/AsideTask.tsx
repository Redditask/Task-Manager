import React from 'react';

// @ts-ignore
import styles from "./AsideTask.module.scss";

import Button from "../UI/Button/Button";

import {AiOutlineEdit} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {useAppDispatch} from "../../hooks/hooks";
import {removeTask} from "../../store/taskManagerSlice";

import {Task} from "../../types/data";

const formattedTime = (task: Task) => {
    let startZero = "";
    let endZero = "";

    if(task.startTime.min<=9) startZero = "0";
    if(task.endTime.min<=9) endZero = "0";

    return `${task.startTime.hour}:${startZero}${task.startTime.min}-${task.endTime.hour}:${endZero}${task.endTime.min}`;
};

interface IAsideTaskProps {
    task: Task;
    setTask: (task: Task)=>void;
    setEditModalStatus: (editModalStatus: boolean)=>void;
}

const AsideTask: React.FC<IAsideTaskProps> = ({task, setTask, setEditModalStatus}) => {
    const dispatch = useAppDispatch();
    const remove = (taskId: string | undefined) => dispatch(removeTask({id: taskId || "undefindeId"}));

    return (
        <div className={styles.Task}>
            <li className={styles.Content}>
                <div
                    className={styles.Content__color}
                    style={{background:task.color}}
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
                    title="Edit"
                    text={<AiOutlineEdit size={25}/>}
                    onClick={()=> {
                        setEditModalStatus(true)
                        setTask(task)
                    }}
                />
                <Button
                    title="Remove"
                    text={<MdDeleteOutline size={25}/>}
                    onClick={()=>remove(task.id)}
                />
            </div>
        </div>
    );
};

export default AsideTask;
