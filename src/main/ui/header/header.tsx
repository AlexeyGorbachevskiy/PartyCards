import React, {useState} from 'react';
import style from './header.module.scss'
import {NavLink} from "react-router-dom";


const Header = () => {

    const [isToggleCollapsed, setToggleCollapsed] = useState<boolean>(true);

    const onToggleMenu = () => {
        setToggleCollapsed(!isToggleCollapsed);

    }


    return (
        <div className={style.header}>
            <div className={style.container} style={!isToggleCollapsed ? {'backgroundColor':'#1e2326'} : {'backgroundColor':'transparent'}}>

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
                        <NavLink activeClassName={style.active_link} className={style.link} to={'/profile'}>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link} to={'/features'}>Features</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link} to={'/login'}>Log In</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={style.active_link} className={style.link} to={'/register'}>Register</NavLink>
                    </li>

                </ul>

                <button onClick={onToggleMenu} className={isToggleCollapsed ? style.btn_toggler : style.btn_collapse}>
                    <span/>
                    <span/>
                    <span/>
                </button>

            </div>

            <ul className={style.vertical_navbar} style={!isToggleCollapsed ? {'opacity': '1'} : {'opacity': '0'}}>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link} to={'/home'}>Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link} to={'/profile'}>Profile</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link} to={'/features'}>Features</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link} to={'/login'}>Log In</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active_link} className={style.link} to={'/register'}>Register</NavLink>
                </li>

            </ul>


        </div>
    )
}


export default Header;