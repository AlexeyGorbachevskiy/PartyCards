import React from 'react';
import style from './Profile.module.scss'
import {useSelector} from "react-redux";
import {AppRootType} from "../../../bll/state/store";


const Profile=()=>{

    //ToDo   need to type any below
    const profile = useSelector<AppRootType, any>(state => state.profile);


    return (
        <div className={style.profile}>
            {profile.fullName}
        </div>
    )
}

export default Profile;