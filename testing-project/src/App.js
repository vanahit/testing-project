import React, {Component} from 'react';
import AboutUs from './components/AboutUs/AboutUs';

import {Route} from "react-router-dom";


import TestCreater from './containers/QuizCreator/TestCreater';

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
            
               <Route path='/registration/user' component={AutorizationUser}/>
               <Route path='/registration/company' component={AutorizationCompany}/>
               <Route path="/AboutUs/" component={AboutUs} />
               <Route path="/TestCreater/" component={TestCreater} />
               <Route path="/Tests/" component={AllTests} />
               <Route path="/Companies/" component={AllCompanies} />
               <Route path="/Users/" component={AllUsers} />
            </div>
    );
  }
}




export default App;
