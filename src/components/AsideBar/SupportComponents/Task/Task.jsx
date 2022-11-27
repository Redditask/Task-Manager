import React from 'react';

import styles from "./Task.module.scss";

import Button from "../../../UI/Button/Button";

import {AiOutlineEdit} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";
import {useDispatch} from "react-redux";
import {removeTask} from "../../../../store/taskManagerSlice";

const Task = ({task, setTask, setEditModalStatus}) => {
    const dispatch = useDispatch();
    const remove = (taskId) => dispatch(removeTask(taskId));

    return (
        <div className={styles.Task}>
            <li className={styles.Content}>
                <div
                    className={styles.Content__color}
                    style={{background:task.color}}
                />
                <div>{task.taskText}</div>
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

export default Task;
