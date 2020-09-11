import React, {useState} from 'react';
import style from './Login.module.scss'
import Input from "../../common/Input/Input";
import Checkbox from "../../common/Checkbox/Checkbox";
import Button from "../../common/Button/Button";
import {useDispatch} from "react-redux";
import {loginThunkCreator} from "../../../bll/state/loginReducer";


const Login = () => {

    //TODO: transport these local states to redux state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const dispatch = useDispatch();
    const onLogin = () => {
        dispatch(loginThunkCreator(email, password, remember))
    }

    return (
        <div className={style.login}>
            <div className={style.login_form}>
                <h2>Login</h2>
                <div className={style.form}>
                    <Input onChange={(e) => {setEmail(e.currentTarget.value)}}
                           value={email}
                           className={style.input + ' ' + style.email}
                           placeholder={'Email'}
                    />
                    <Input onChange={(e) => {setPassword(e.currentTarget.value)}}
                           value={password}
                           className={style.input + ' ' + style.password}
                           placeholder={'Password'}
                           type={'password'}
                    />
                    <label>
                        <Checkbox
                            checked={remember}
                            onChange={(e) => {
                            setRemember(!remember)
                        }}/> Remember Me?
                    </label>

                </div>

                <Button onClick={onLogin} style={{width: '150px'}}>Log In</Button>
            </div>
        </div>
    )
}

export default Login;
