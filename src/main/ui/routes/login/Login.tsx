import React, {useEffect, useState} from 'react';
import style from './Login.module.scss'
import Input from "../../common/Input/Input";
import Checkbox from "../../common/Checkbox/Checkbox";
import Button from "../../common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../../bll/state/loginReducer";
import {AppRootType} from "../../../bll/state/store";
import {Redirect} from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch();

    const stateError = useSelector<AppRootType, string>(state => state.login.error)
    const stateEmail = useSelector<AppRootType, string>(state => state.login.email)

    const onLogin = () => {
        dispatch(loginThunkCreator(email, password, remember));
    }

    const [errorStyle, setErrorStyle] = useState({})

    useEffect(() => {
        setEmail('');
        setPassword('');
        setRemember(false);
        if (stateError) {
            setErrorStyle({
                borderColor: '#cf0c0c',
            })
        } else {
            setErrorStyle({})
        }


    }, [stateError, stateEmail])


    if (stateEmail) {
        return <Redirect to="/home"/>;
    }

    return (
        <div className={style.login}>
            <div className={style.login_form}>
                <h2>Login</h2>
                <div className={style.form}>
                    <Input style={errorStyle} onChange={(e) => {
                        setEmail(e.currentTarget.value)
                    }}
                           value={email}
                           className={style.input + ' ' + style.email}
                           placeholder={'Email'}
                    />
                    <Input style={errorStyle} onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}
                           value={password}
                           className={style.input + ' ' + style.password}
                           placeholder={'Password'}
                           type={'password'}
                    />
                    <label>
                        <Checkbox
                            style={errorStyle}
                            checked={remember}
                            onChange={(e) => {
                                setRemember(!remember)
                            }}/> Remember Me?
                    </label>
                </div>

                <p className={style.error}>{stateError}</p>

                <Button onClick={onLogin} style={{width: '150px'}}>Log In</Button>
            </div>
        </div>
    )
}

export default Login;
