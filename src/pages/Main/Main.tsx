// @ts-ignore
import styles from "./Main.module.scss";

import React, {useEffect, useState} from 'react';

import AsideBar from "../../components/AsideBar/AsideBar";
import Calendar from "../../components/Calendar/Calendar";
import Modal from "../../components/UI/Modal/Modal";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import Loader from "../../components/UI/Loader/Loader";

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setUserId} from "../../store/taskManagerSlice";
import {selectError, selectLoadingStatus} from "../../store/selectors";

import {check} from "../../API/userAPI";
import {getTasks} from "../../API/taskAPI";

const Main: React.FC = () => {
    const [date, setDate] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    const isLoading: boolean = useAppSelector(selectLoadingStatus);
    const error: string | null = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        check()
            .then(data => {
                dispatch(setUserId({userId: data.id}));
                dispatch(getTasks(data.id));
            });
    }, []);

    if (isLoading) return <Loader/>;
    if (error) prompt(error);

    return (
        <div className={styles.Main}>
            <AsideBar setModalStatus={setModalStatus} setDate={setDate}/>
            <Calendar setModalStatus={setModalStatus} setDate={setDate}/>
            <Modal visible={modalStatus} setVisible={setModalStatus}>
                {
                    modalStatus
                        ? <AddTaskForm setModalStatus={setModalStatus} date={date}/>
                        : null
                }
            </Modal>
        </div>
    );
};

export default Main;
