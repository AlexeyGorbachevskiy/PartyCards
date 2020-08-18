import React from 'react';
import './App.css';
import Header from "./main/ui/header/header";
import {HashRouter, Redirect, Route,} from "react-router-dom";
import Home from "./main/ui/home/home";

const App = () => {
    return (
        <div className="App">
            <HashRouter>

                {/*provider*/}
                <Header/>
                <Home/>
                <Route exact path='/' render={() => <Redirect to={'/home'}/>}/>
            </HashRouter>
        </div>
    );
}

export default App;
