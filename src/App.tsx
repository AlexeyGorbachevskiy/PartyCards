import React from 'react';
import './App.css';
import Header from "./main/ui/header/header";
import {HashRouter, Redirect, Route,} from "react-router-dom";
import {store} from "./main/bll/state/store";
import {Provider} from "react-redux";
import Home from "./main/ui/routes/home/Home";
import Profile from "./main/ui/routes/profile/Profile";
import Login from "./main/ui/routes/login/Login";
import Register from "./main/ui/routes/register/Register";
import Settings from "./main/ui/routes/settings/Settings";
import NewPassword from "./main/ui/routes/settings/newPassword/NewPassword";
import PasswordRestore from "./main/ui/routes/settings/passwordRestore/PasswordRestore";
import Features from "./main/ui/routes/features/Features";
import Feature0 from "./features/f0-test/Feature0";

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>

                    <Header/>
                    <Route exact path='/' render={() => <Redirect to={'/home'}/>}/>
                    <Route path='/home' render={() => <Home/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/register' render={() => <Register/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/new_password' render={() => <NewPassword/>}/>
                    <Route path='/password_restore' render={() => <PasswordRestore/>}/>
                    <Route path='/features' render={() => <Features/>}/>
                    <Route path='/feature0' render={() => <Feature0/>}/>

                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
