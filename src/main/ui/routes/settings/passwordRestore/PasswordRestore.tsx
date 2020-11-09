import React, {useEffect, useState} from 'react';
import style from './PasswordRestore.module.scss'
import Input from "../../../common/input/Input";
import Button from "../../../common/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    restorePasswordThunkCreator,
    setSettingsErrorAC,
    setSettingsSuccessMessageAC
} from "../../../../bll/state/passwordRestoreReducer";
import {AppRootType} from "../../../../bll/state/store";
import obj from "../../../common/preloader/Preloader.module.css";


const PasswordRestore = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    let passwordRestoreError = useSelector<AppRootType, string>(state => state.passwordRestore.passwordRestoreError);
    let successMessage = useSelector<AppRootType, string>(state => state.passwordRestore.passwordRestoreSuccessMessage);
    const [errorStyle, setErrorStyle] = useState({})
    const sendLinkToEmail = () => {

        if(email.trim()===''){
            dispatch(setSettingsErrorAC('All fields should be filled'))
        }
        else{
            dispatch(setSettingsErrorAC(''))
            dispatch(restorePasswordThunkCreator(email));
            setTimeout(() => {
                dispatch(setSettingsSuccessMessageAC(''))
                successMessage = '';
            }, 4000)
        }
    }

    useEffect(()=>{
        if(!passwordRestoreError && successMessage){
            setEmail('');
        }
        if(!passwordRestoreError){
            setErrorStyle({})
        }
        else{
            setErrorStyle({
                borderColor: '#cf0c0c',
            })
        }
    },[passwordRestoreError,successMessage])

    useEffect(()=>{
        return ()=>{
            dispatch(setSettingsErrorAC(''))
            setEmail('');
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

    return (
        <div className={style.password_restore}>
            <div className={style.password_restore_form}>
                <h2>Restore Password</h2>


                <div className={style.form}>
                    <Input style={errorStyle} onChange={(e) => {
                        setEmail(e.currentTarget.value)
                    }}
                           value={email}
                           className={style.input + ' ' + style.email}
                           placeholder={'Type your email'}
                    />
                </div>
                {
                    passwordRestoreError && <p className={style.error}>{passwordRestoreError}</p>
                }

                <Button onClick={sendLinkToEmail} style={{width: '150px'}}>Send</Button>
            </div>
            {
                isLoading &&
                <img style={{position: 'absolute', zIndex: 1200}} className={obj.preloader}
                     src={process.env.PUBLIC_URL + '/images/spinner.svg'} alt={'Preloader svg'}/>
            }
        </div>
    )
}

export default PasswordRestore
