import React, {useEffect, useState} from 'react';
import style from './NewPassword.module.scss'
import Input from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {setNewPasswordErrorAC, setNewPasswordThunkCreator} from "../../../../bll/state/newPasswordReducer";
import {AppRootType} from "../../../../bll/state/store";
import obj from "../../../common/preloader/Preloader.module.css";


const NewPassword = () => {

    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    let newPasswordError = useSelector<AppRootType, string>(state => state.newPassword.newPasswordError);
    let successMessage = useSelector<AppRootType, string>(state => state.newPassword.mewPasswordMessage);
    const [errorStyle, setErrorStyle] = useState({})

    const {token} = useParams();
    const sendLinkToEmail = () => {
        if(password.trim()===''){
            setErrorStyle({
                borderColor: '#cf0c0c',
            })
            dispatch(setNewPasswordErrorAC('All fields should be filled'))
        }
        else{
            dispatch(setNewPasswordThunkCreator(password,token));
            setPassword('');
        }

    }

    useEffect(()=>{
        if(!newPasswordError && successMessage){
            setPassword('');
        }
        if(!newPasswordError){
            setErrorStyle({})
        }
        else{
            setErrorStyle({
                borderColor: '#cf0c0c',
            })
        }
    },[newPasswordError,successMessage])

    useEffect(()=>{
        return ()=>{
            dispatch(setNewPasswordErrorAC(''))
        }
    },[])

    const isLoading = useSelector<AppRootType, boolean>(state => state.login.isLoading);
    // if (isLoading) {
    //     return (
    //         <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    //             <Preloader/>
    //         </div>
    //     )
    // }

    if(successMessage && !newPasswordError){
        return <Redirect to="/login"/>;
    }

    return (
        <div className={style.new_password}>
            <div className={style.new_password_form}>
                <h2>New Password</h2>


                <div className={style.form}>
                    <Input style={errorStyle} onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}
                           type={'password'}
                           value={password}
                           className={style.input + ' ' + style.password}
                           placeholder={'Type new password'}
                    />
                </div>

                {
                    newPasswordError && <p className={style.error}>{newPasswordError}</p>
                }


                <Button onClick={sendLinkToEmail} style={{width: '150px'}}>Save</Button>
            </div>
            {
                isLoading &&
                <img style={{position: 'absolute', zIndex: 1200}} className={obj.preloader}
                     src={process.env.PUBLIC_URL + '/images/spinner.svg'} alt={'Preloader svg'}/>
            }
        </div>
    )
}

export default NewPassword
