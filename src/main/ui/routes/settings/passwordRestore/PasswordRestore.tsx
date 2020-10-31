import React from 'react';
import style from './PasswordRestore.module.scss'
import {compose} from "redux";
import {withAuthRedirect} from "../../../../utilities/hoc/withAuthRedirect";


const PasswordRestore=()=>{


    return (
        <div className={style.password_restore}>
           Password Restore
        </div>
    )
}

export default compose(
    withAuthRedirect,
)(PasswordRestore)
