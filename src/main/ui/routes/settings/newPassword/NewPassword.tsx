import React from 'react';
import style from './NewPassword.module.scss'
import {compose} from "redux";
import {withAuthRedirect} from "../../../../utilities/hoc/withAuthRedirect";


const NewPassword = () => {


    return (
        <div className={style.new_password}>
            New password
        </div>
    )
}

export default compose(
    withAuthRedirect,
)(NewPassword)
