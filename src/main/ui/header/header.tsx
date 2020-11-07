import React, {useState} from 'react';
import style from './header.module.scss'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../bll/state/store";
import {logoutThunkCreator} from "../../bll/state/loginReducer";

const arrowDownElement = <FontAwesomeIcon className={style.arrow_down} icon={faAngleDown}/>


const Header = () => {

    //for header background color
    const isCurrentPageProfile = useSelector<AppRootType, boolean>(state => state.app.isCurrentPageProfile);


    const [isToggleCollapsed, setToggleCollapsed] = useState<boolean>(true);
    const [isFeaturesSubMenuExpanded, setFeaturesSubMenuExpanded] = useState<boolean>(false);
    const [isSettingsSubMenuExpanded, setSettingsSubMenuExpanded] = useState<boolean>(false);

    let isAuth = useSelector<AppRootType, boolean>(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutThunkCreator())
    }

    const onToggleMenu = () => {
        setToggleCollapsed(!isToggleCollapsed);

    }

    const onExpandFeaturesSubMenu = () => {
        if (isSettingsSubMenuExpanded) {
            setSettingsSubMenuExpanded(false)
        }
        setFeaturesSubMenuExpanded(!isFeaturesSubMenuExpanded)

    }
    const onExpandSettingsSubMenu = () => {
        if (isFeaturesSubMenuExpanded) {
            setFeaturesSubMenuExpanded(false)
        }
        setSettingsSubMenuExpanded(!isSettingsSubMenuExpanded)
    }

    const onBlurFeaturesSubMenu = () => {
        setFeaturesSubMenuExpanded(false)
    }
    const onBlurSettingsSubMenu = () => {
        setSettingsSubMenuExpanded(false)
    }


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

                    {/*<li>*/}
                    {/*    <NavLink activeClassName={style.active_link} className={style.link}*/}
                    {/*             to={'/features'}>Features {arrowDownElement}</NavLink>*/}
                    {/*    <ul className={style.sub_menu_wrapper}>*/}
                    {/*        <li>*/}
                    {/*            <NavLink activeClassName={style.active_link} className={style.sub_link}*/}
                    {/*                     to={'/feature0'}>Feature 0</NavLink>*/}
                    {/*        </li>*/}

                    {/*        /!*<li>*!/*/}
                    {/*        /!*    <NavLink activeClassName={style.active_link} className={style.sub_link}*!/*/}
                    {/*        /!*             to={'/feature_1'}>Feature 1</NavLink>*!/*/}
                    {/*        /!*</li>*!/*/}
                    {/*        /!*<li>*!/*/}
                    {/*        /!*    <NavLink activeClassName={style.active_link} className={style.sub_link}*!/*/}
                    {/*        /!*             to={'/feature_2'}>Feature 2</NavLink>*!/*/}
                    {/*        /!*</li>*!/*/}

                    {/*    </ul>*/}

                    {/*</li>*/}


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
