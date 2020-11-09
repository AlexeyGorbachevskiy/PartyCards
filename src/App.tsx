import React, {useEffect} from 'react';
import './App.css';
import Header from "./main/ui/header/header";
import {Redirect, Route,} from "react-router-dom";
import {AppRootType} from "./main/bll/state/store";
import {useDispatch, useSelector} from "react-redux";
import Home from "./main/ui/routes/home/Home";
import Profile from "./main/ui/routes/profile/Profile";
import Login from "./main/ui/routes/login/Login";
import Register from "./main/ui/routes/register/Register";
import Settings from "./main/ui/routes/settings/Settings";
import NewPassword from "./main/ui/routes/settings/newPassword/NewPassword";
import PasswordRestore from "./main/ui/routes/settings/passwordRestore/PasswordRestore";
import Features from "./main/ui/routes/features/Features";
import Feature0 from "./features/f0-test/Feature0";
import Preloader from "./main/ui/common/preloader/Preloader";
import {initializeAppThunkCreator} from "./main/bll/state/appReducer";
import Packs from "./main/ui/routes/packs/Packs";
import Cards from "./main/ui/routes/cards/Cards";

const App = () => {

    const dispatch = useDispatch();

    const userId = useSelector<AppRootType, string>(state => state.login._id);
    useEffect(() => {
        if(!userId){
            dispatch(initializeAppThunkCreator());
        }

    }, [])

    const initialized = useSelector<AppRootType, boolean>(state => state.app.initialized);
    if (!initialized) {
        return(
            <div className="App" style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <Preloader/>
            </div>
        )
    }



    return (
        <div className="App">
            <Header/>
            <Route exact path='/' render={() => <Redirect to={'/home'}/>}/>
            <Route path='/home' render={() => <Home/>}/>
            <Route path='/profile' render={() => <Profile/>}/>
            <Route path='/packs' render={() => <Packs/>}/>
            <Route path='/cards' render={() => <Cards/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/register' render={() => <Register/>}/>
            <Route path='/settings' render={() => <Settings/>}/>
            <Route path='/new_password/:token' render={() => <NewPassword/>}/>
            <Route path='/password_restore' render={() => <PasswordRestore/>}/>
            <Route path='/features' render={() => <Features/>}/>
            <Route path='/feature0' render={() => <Feature0/>}/>
        </div>

    );
}

export default App;
