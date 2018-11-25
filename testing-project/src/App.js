import React, {Component} from 'react';
import AboutUs from './components/AboutUs/AboutUs';
import {Route} from "react-router-dom";
import TestCreater from './containers/QuizCreator/TestCreater';
import TestPassPanel from './containers/TestPassPanel/TestPassPanel';
import './App.css';
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import AllTests from "./containers/Pages/AllTests";
import AllCompanies from "./containers/Pages/AllCompanies";
import AllUsers from "./containers/Pages/AllUsers";
import {firebase} from './firebase/firebase';

class App extends Component {

    render() {
        return (
            <div className="App">
               <Route path='/' />
               <Route path='/registration/user' component={AutorizationUser}/>
               <Route path='/registration/company' component={AutorizationCompany}/>
               <Route path="/aboutUs/" component={AboutUs} />
               <Route path="/testCreater/" component={TestCreater} />
               <Route path="/testPassPanel/" component={TestPassPanel} />
               <Route path="/tests/" component={AllTests} />
            </div>
    );
  }
}




export default App;
