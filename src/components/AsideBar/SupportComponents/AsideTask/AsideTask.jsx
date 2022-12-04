import React from 'react';

import styles from "./AsideTask.module.scss";

import Button from "../../../UI/Button/Button";

import {AiOutlineEdit} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {useDispatch} from "react-redux";
import {removeTask} from "../../../../store/taskManagerSlice";

const formattedTime = (task) => {
    let startZero = "";
    let endZero = "";

    if(task.startTime.min<=9) startZero = "0";
    if(task.endTime.min<=9) endZero = "0";

    return `${task.startTime.hour}:${startZero}${task.startTime.min}-${task.endTime.hour}:${endZero}${task.endTime.min}`;
};

const AsideTask = ({task, setTask, setEditModalStatus}) => {
    const dispatch = useDispatch();
    const remove = (taskId) => dispatch(removeTask({id: taskId}));

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
