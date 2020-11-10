import React, {useEffect, useState} from 'react';
import style from './Login.module.scss'
import Input from "../../common/input/Input";
import Checkbox from "../../common/checkbox/Checkbox";
import Button from "../../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator, setLoginErrorAC} from "../../../bll/state/loginReducer";
import {AppRootType} from "../../../bll/state/store";
import {Redirect} from "react-router-dom";
import obj from "../../common/preloader/Preloader.module.css";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch();

    const stateError = useSelector<AppRootType, string>(state => state.login.error)
    // const stateEmail = useSelector<AppRootType, string>(state => state.login.email)
    const isAuth = useSelector<AppRootType, boolean>(state => state.auth.isAuth);
    const isLoading = useSelector<AppRootType, boolean>(state => state.login.isLoading);

    const onLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            dispatch(setLoginErrorAC('All fields should be filled'))
        } else {
            dispatch(setLoginErrorAC(''))
            dispatch(loginThunkCreator(email, password, remember));
        }
    }

    const [errorStyle, setErrorStyle] = useState({})


    useEffect(()=>{
        return ()=>{
            setEmail('');
            setPassword('');
            setRemember(false);
            dispatch(setLoginErrorAC(''))
        }
    },[])

    useEffect(() => {
        if (stateError) {
            setErrorStyle({
                borderColor: '#cf0c0c',
            })
        } else {
            setErrorStyle({})
        }

    }, [stateError])

    // if (isLoading) {
    //     return (
    //         <div className="App" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
    //             <Preloader/>
    //         </div>
    //     )
    // }

    if (isAuth) {
        return <Redirect to="/profile"/>;
    }


    return (
        <div className={style.login}>

            <div className={style.login_form}>
                <h2>Log In</h2>

                {/*<div className={style.credentials}>*/}
                {/*    <p>Email: "alexeygorbachevskiyy@gmail.com" </p>*/}

                {/*    <p> Password: "alexeygorbachevskiy"</p>*/}
                {/*</div>*/}

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
            {
                isLoading &&
                <img style={{position: 'absolute', zIndex: 1200}} className={obj.preloader}
                     src={process.env.PUBLIC_URL + '/images/spinner.svg'} alt={'Preloader svg'}/>
            }

        </div>
    )
}

export default Login;
