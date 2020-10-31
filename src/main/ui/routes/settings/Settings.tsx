import React from 'react';
import style from './Settings.module.scss'
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";


const Settings=()=>{



    return (
        <div className={style.settings}>
            Settings
        </div>
    )
}

export default compose(
    withAuthRedirect,
)(Settings)
