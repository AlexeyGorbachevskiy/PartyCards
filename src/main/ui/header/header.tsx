import React, {useState} from 'react';
import style from './header.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../bll/state/store";
import {logoutThunkCreator} from "../../bll/state/loginReducer";


const Header = () => {

    //for header background color
    const isCurrentPageProfile = useSelector<AppRootType, boolean>(state => state.app.isCurrentPageProfile);

    const [isToggleCollapsed, setToggleCollapsed] = useState<boolean>(true);

    let isAuth = useSelector<AppRootType, boolean>(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutThunkCreator())
    }

    const onToggleMenu = () => {
        setToggleCollapsed(!isToggleCollapsed);

    }

    const chosenPackId = useSelector<AppRootType, string | null>(state => state.cards.chosenPackData.packId);
    const chosenPackName = useSelector<AppRootType, string | null>(state => state.cards.chosenPackData.packName);


    return (
        <div className={style.header}
             style={isCurrentPageProfile ? {backgroundColor: '#1e2326'} : {backgroundColor: 'transparent'}}>
            <div className={style.container}
                 style={!isToggleCollapsed ? {'backgroundColor': '#1e2326'} : {'backgroundColor': 'transparent'}}>

                <div className={style.logo_wrapper}>
                    <NavLink className={style.logo_link} to={'/home'}>
                        Party<span>Cards</span>
                    </NavLink>
                </div>

                <ul className={style.navbar}>
                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link} to={'/home'}>Home</NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link}
                                 to={'/profile'}>Profile</NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link}
                                 to={'/packs'}>Packs</NavLink>
                    </li>

                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link}
                                 to={`${chosenPackId ? "/cards/" + chosenPackName + '/' + chosenPackId : "/cards/noName/noId"}`}>Cards</NavLink>
                    </li>


                    {
                        isAuth ? '' :
                            <li>
                                <NavLink activeClassName={style.active_link} className={style.link}
                                         to={'/password_restore'}>Restore</NavLink>
                            </li>
                    }

                    {
                        isAuth ? '' :

                            <li>
                                <NavLink activeClassName={style.active_link} className={style.link}
                                         to={'/register'}>Register</NavLink>
                            </li>
                    }

                    {
                        isAuth ?
                            <li>
                                <NavLink onClick={logout}
                                         className={style.logout + ' ' + style.link}
                                         to={'#'}>Log Out
                                </NavLink>
                            </li>
                            :
                            <li>
                                <NavLink activeClassName={style.active_link} className={style.link}
                                         to={'/login'}>Log In
                                </NavLink>
                            </li>
                    }


                </ul>

                <button onClick={onToggleMenu} className={isToggleCollapsed ? style.btn_toggler : style.btn_collapse}>
                    <span/>
                    <span/>
                    <span/>
                </button>

            </div>


            <ul className={style.vertical_navbar} style={!isToggleCollapsed ? {
                'visibility': 'visible',
                'opacity': '1',
                'zIndex': 1001
            } : {'visibility': 'hidden', 'opacity': '0'}}>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link} to={'/home'}>Home</NavLink>
                </li>

                <li>
                    <NavLink activeClassName={style.active_link} className={style.link}
                             to={'/profile'}>Profile</NavLink>
                </li>

                <li>
                    <NavLink activeClassName={style.active_link} className={style.link}
                             to={'/packs'}>Packs</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link}
                             to={`${chosenPackId ? "/cards/" + chosenPackName + '/' + chosenPackId : "/cards/noName/noId"}`}>Cards</NavLink>
                </li>


                {
                    isAuth ? '' :
                        <li>
                            <NavLink activeClassName={style.active_link} className={style.link}
                                     to={'/password_restore'}>Restore</NavLink>
                        </li>
                }


                {
                    isAuth ? '' :
                        <li>
                            <NavLink activeClassName={style.active_link} className={style.link}
                                     to={'/register'}>Register</NavLink>
                        </li>
                }

                {
                    isAuth ?
                        <li>
                            <NavLink
                                onClick={logout}
                                className={style.logout + ' ' + style.link}
                                to={'#'}>Log
                                Out</NavLink>
                        </li>
                        :
                        <li>
                            <NavLink activeClassName={style.active_link} className={style.link} to={'/login'}>Log
                                In</NavLink>
                        </li>
                }


            </ul>


        </div>
    )
}


export default Header;
