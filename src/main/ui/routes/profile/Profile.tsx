import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../bll/state/store";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {compose} from "redux";
import {setIsCurrentPageProfileAC} from "../../../bll/state/appReducer";
import {changeInfoThunkCreator} from "../../../bll/state/profileReducer";
import obj from "../../common/preloader/Preloader.module.css";
import Preloader from "../../common/preloader/Preloader";


const Profile = () => {
    const dispatch = useDispatch();

    let loginData = useSelector<AppRootType, any>(state => state.login);
    let isAuth = useSelector<AppRootType, boolean>(state => state.auth.isAuth);
    let loginName = useSelector<AppRootType, string>(state => state.login.name);
    let loginAvatar = useSelector<AppRootType, string>(state => state.login.avatar);
    let loginEmail = useSelector<AppRootType, string>(state => state.login.email);
    const [name, setName] = useState<string>(loginName);
    const [avatar, setAvatar] = useState<string>(loginAvatar);
    const isLoading = useSelector<AppRootType, boolean>(state => state.login.isLoading);

    const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onChangeAvatarInput=(e: ChangeEvent<HTMLInputElement>)=>{
        setAvatar(e.currentTarget.value)
    }
    const [isChangeBtnClicked, setIsChangeBtnClicked] = useState(false);
    const changeInfo = () => {
        setIsChangeBtnClicked(true);
    }
    const saveInfo = () => {
        dispatch(changeInfoThunkCreator(name,avatar))
        setIsChangeBtnClicked(false);
    }



    // for header background
    useEffect(() => {
        dispatch(setIsCurrentPageProfileAC(true))

        return () => {
            dispatch(setIsCurrentPageProfileAC(false))
        }
    }, [])


    if (isLoading) {
        return <div className="App" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Preloader/>
        </div>
    }

    return (
        <div className={style.profile}>

            {
                isAuth ?
                    <>
                        <div className={style.profile_info}>
                            <div className={style.profile_info_header}>
                                {/*<img src={`${loginData.avatar}`} alt="Avatar"/>*/}
                                <img className={style.avatar} src={ `${avatar ? avatar : process.env.PUBLIC_URL+'/favicon.ico'}`}
                                     alt="Avatar"/>

                                <div className={style.profile_info_header_content}>
                                    {
                                        isLoading ?
                                            <img style={{position:'absolute'}} className={obj.preloader} src={process.env.PUBLIC_URL + '/images/spinner.svg'} alt={'Preloader svg'}/>
                                            : ''
                                    }
                                    {
                                        isChangeBtnClicked ?
                                            <>
                                            <div>Name:
                                                <input onChange={onChangeNameInput} value={name}/>
                                            </div>
                                                <div>Avatar:
                                                    <input onChange={onChangeAvatarInput} value={avatar}/>
                                                </div>

                                            </>
                                            :
                                            <div>Name: <span>{name}</span></div>
                                    }
                                    <div>Email: <span>{loginEmail}</span></div>

                                    {
                                        isChangeBtnClicked ?
                                            <button onClick={saveInfo}
                                                    className={style.profile_info_save_btn}>Save
                                            </button>
                                            :
                                            <button onClick={changeInfo}
                                                    className={style.profile_info_change_btn}>Change
                                            </button>
                                    }

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
