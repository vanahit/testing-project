import React, {Component} from 'react';
import AboutUs from './components/AboutUs/AboutUs';
import {Route} from "react-router-dom";
import TestCreator from './containers/QuizCreator/TestCreator';
import TestPassPanel from './containers/TestPassPanel/TestPassPanel';
import './App.css';
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import AllTests from "./containers/Tests/AllTests";

class App extends Component {

    render() {
        return (
            <div className="App">
               <Route path='/registration/user' component={AutorizationUser}/>
               <Route path='/registration/company' component={AutorizationCompany}/>
               <Route path="/aboutUs/" component={AboutUs} />
               <Route path="/testCreater/" component={TestCreator} />
               <Route path="/TestPassPanel/" component={TestPassPanel} />
               <Route path="/tests/" component={AllTests} />
            </div>
    );
  }
}




export default App;
