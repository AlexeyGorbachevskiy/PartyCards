import React from 'react';
import style from './Features.module.scss'
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";


const Features = () => {


    return (
        <div className={style.features}>
            Features
        </div>
    )
}

export default compose(
    withAuthRedirect,
)(Features)
