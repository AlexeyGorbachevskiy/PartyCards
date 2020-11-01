import React from 'react';
import style from './Profile.module.scss'
import {useSelector} from "react-redux";
import {AppRootType} from "../../../bll/state/store";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {compose} from "redux";


const Profile = () => {

    let loginData = useSelector<AppRootType, any>(state => state.login);
    let isAuth = useSelector<AppRootType, any>(state => state.auth.isAuth);

    return (
        <div className={style.profile}>

            {
                isAuth ?
                <>
                    <div className={style.profile_info}>
                        <div className={style.profile_info_header}>
                            {/*<img src={`${loginData.avatar}`} alt="Avatar"/>*/}
                            <img className={style.avatar} src={process.env.PUBLIC_URL + '/favicon.ico'}  alt="Avatar"/>

                            <div className={style.profile_info_header_content}>
                                <p>Name: {loginData.name ? loginData.name[0].toUpperCase() + loginData.name.slice(1) : 'Name is not defined'}</p>
                                <p>Email: {loginData.email}</p>
                            </div>
                        </div>

                        <div className={style.extra_info}>
                            <p>Card Packs Count: {loginData.publicCardPacksCount}</p>
                        </div>


                    </div>
                    <div className={style.profile_settings}>
                        <h2>Profile Settings</h2>

                        <p>Id: {loginData._id}</p>
                        <p>Created: {loginData.created}</p>
                        <p>Updated: {loginData.updated}</p>
                        <p>Is Admin: {loginData.isAdmin ? 'Yes' : 'No'} </p>
                        <p>Is Verified: {loginData.verified ? 'Yes' : 'No'} </p>
                        <p>Is Remembered: {loginData.rememberMe ? 'Yes' : 'No'} </p>
                    </div>
                </>
                    : ''

            }


        </div>
    )
}

export default compose(
    withAuthRedirect,
)(Profile)
