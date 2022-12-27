// @ts-ignore
import styles from "./Auth.module.scss";

import React, {useState} from 'react';

import SignForm from "../../components/SignForm/SignForm";

import {StringChangeEvent} from "../../types/types";

const Auth: React.FC = () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(true);

    //const action = isSignUp ? api func for registration : api func for sign in
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
            //action=action
        />
    );
};

export default Auth;
