import React from 'react';
import style from './Settings.module.scss'
import {Redirect} from "react-router-dom";


const Settings=()=>{


    return <Redirect to="/password_restore"/>;

    return (
        <div className={style.settings}>
            Settings
        </div>
    )
}

export default Settings
