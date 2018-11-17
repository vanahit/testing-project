import React, { Component } from 'react';
import AboutUs from './components/AboutUs/AboutUs';
import { Route } from "react-router-dom";
import './App.css';
import Route from "react-router/es/Route";
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";


class App extends Component {
    render() {
        return (
            <div className="App">
               <Route path='/registration/user' component={AutorizationUser}/>
               <Route path='/registration/company' component={AutorizationCompany}/>
               <Route path="/AboutUs/" component={AboutUs} />
      </div>
    );
  }
}

export default App;
