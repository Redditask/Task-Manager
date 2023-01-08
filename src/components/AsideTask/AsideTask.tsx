import styles from "./AsideTask.module.scss";

import React, {memo} from 'react';

import Button from "../UI/Button/Button";

import {AiOutlineEdit} from "react-icons/ai";
import {MdDeleteOutline} from "react-icons/md";

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {deleteTask} from "../../API/taskAPI";
import {selectUserId} from "../../store/selectors";

import {Task} from "../../types/types";

import {formattedTime} from "../../utils/utils";

interface AsideTaskProps {
    task: Task;
    setTask: (task: Task)=>void;
    setEditModalStatus: (editModalStatus: boolean)=>void;
}

const AsideTask: React.FC<AsideTaskProps> = memo(({task, setTask, setEditModalStatus}) => {
    const dispatch = useAppDispatch();
    const userId: number | null = useAppSelector(selectUserId);

    const removeTaskFromStore = (taskId: string | undefined): void => {
        if (userId) dispatch(deleteTask({id: taskId || "undefinedId", userId}))
    };

    const submitRemove = (): void => removeTaskFromStore(task.id);

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
});

export default AsideTask;
