// @ts-ignore
import styles from "./SignForm.module.scss";

import React from 'react';

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

import {StringChangeEvent} from "../../types/types";

interface SignFormProps {
    login: string;
    onChangeLogin: (event: StringChangeEvent) => void;
    password: string;
    onChangePassword: (event: StringChangeEvent) => void;
    isSignUp: boolean;
    setIsSignUp: (type: boolean) => void;
    onClick: ()=>void;
}

const SignForm: React.FC<SignFormProps> = ({
        login,
        password,
        onChangePassword,
        onChangeLogin,
        isSignUp,
        setIsSignUp,
        onClick
    }) => {

    const changeFormType = (): void => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className={styles.SignForm}>
            <div className={styles.SignForm__inputArea}>
                <p>Login</p>
                <Input
                    value={login}
                    onChange={onChangeLogin}
                    type="text"
                />
            </div>
            <div className={styles.SignForm__inputArea}>
                <p>Password</p>
                <Input
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                />
            </div>
            <div className={styles.SignForm__buttonArea}>
                <Button
                    text={isSignUp ? "Sign up" : "Sign in"}
                    onClick={onClick}
                />
            </div>
            <div className={styles.SignForm__infoArea}>
                <p>{isSignUp ? "You already have account?" : "You dont have account?"}</p>
                <NavLink
                    className={styles.SignForm__changeType}
                    title={isSignUp ? "Sign in now!" : "Register now!"}
                    style={{color: "darkcyan"}}
                    onClick={changeFormType}
                    to={isSignUp ? LOGIN_ROUTE : REGISTRATION_ROUTE}
                >
                    {isSignUp ? "Sign in!" : "Sign up!"}
                </NavLink>
            </div>
        </div>
    )
};

export default SignForm;
