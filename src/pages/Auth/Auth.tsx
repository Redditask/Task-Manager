// @ts-ignore
import styles from "./Auth.module.scss";

import React, {useState} from 'react';

import SignForm from "../../components/SignForm/SignForm";

import {StringChangeEvent, User} from "../../types/types";

import {registration, logIn} from "../../API/userAPI";

import {useAppDispatch} from "../../hooks/hooks";
import {setUser} from "../../store/taskManagerSlice";

const Auth: React.FC = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const action = async () => {
        let user: User;
        if(isSignUp) {
            user = await registration(login, password);
        }
        else {
            user = await logIn(login, password);
        }
        dispatch(setUser({user: user.id}));
        //возможно сделать отдельный slice для юзера
    };

    const changeLoginHandler = (event: StringChangeEvent): void => setLogin(event.target.value);
    const changePasswordHandler = (event: StringChangeEvent): void => setPassword(event.target.value);

    return (
        <SignForm
            login={login}
            password={password}
            onChangeLogin={changeLoginHandler}
            onChangePassword={changePasswordHandler}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
            onClick = {action}
        />
    );
};

export default Auth;
