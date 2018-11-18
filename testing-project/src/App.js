import React, { Component } from 'react';
import AboutUs from './components/AboutUs/AboutUs';
import { Route } from "react-router-dom";
import TestCreater from './containers/QuizCreator/TestCreater';
import './App.css';
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import {firebase} from './firebase/firebase';



class App extends Component {
    render() {
        return (
            <div className="App">
               <Route path='/registration/user' component={AutorizationUser}/>
               <Route path='/registration/company' component={AutorizationCompany}/>
               <Route path="/AboutUs/" component={AboutUs} />
                <div className='test-creater'>
                  <TestCreater />
                </div>
            </div>
    );
  }
}

firebase.auth().onAuthStateChanged((user)=>{
    if (user){
        console.log('log in');
    }else {
        console.log('log out');
    }
});


export default App;
