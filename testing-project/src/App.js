import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Authorization from "./components/Autorization/Authorization";
import AboutUs from './components/AboutUs/AboutUs';
import TestCreater from './containers/QuizCreator/TestCreater';
import './App.css';


class App extends Component {


    render() {
        return (

            <div className="App">
                <Route path='/authorization/' component={Authorization}/>
                <Route path="/AboutUs/" component={AboutUs}/>
                <Route path="/TestCreater/" component={TestCreater}/>
            </div>
        );
    }
}


export default App;
