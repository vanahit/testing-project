import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import Authorization from "./components/Autorization/Authorization";
import AboutUs from './components/AboutUs/AboutUs';
import TestCreater from './containers/QuizCreator/TestCreater';
import './App.css';
import NoMatch from "./components/NoMatch";
import HomePage from "./components/HomePage";
import Header from "./components/Header";



class App extends Component {


    render() {
        return (
            <div>
                <Header/>
                <Switch className="App">
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path='/authorization/' component={Authorization}/>
                    <Route path="/AboutUs/" component={AboutUs}/>
                    <Route path="/TestCreater/" component={TestCreater}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>

        );
    }
}


export default App;
