import React from 'react';
import style from './Profile.module.scss'
import {useSelector} from "react-redux";
import {AppRootType} from "../../../bll/state/store";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {compose} from "redux";


const Profile=()=>{

    const profile = useSelector<AppRootType, any>(state => state.profile);



    return (
        <div className={style.profile}>
            {profile.fullName}
        </div>
    )
}

export default compose(
    withAuthRedirect,
)(Profile)
