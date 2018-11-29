import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import Authorization from "./components/Autorization/Authorization";
import AboutUs from './components/AboutUs/AboutUs';
import TestCreater from './containers/QuizCreator/TestCreater';
import './App.css';
import NoMatch from "./components/NoMatch";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import * as firebase from "firebase";


class App extends Component {

    state = {
        currentLog: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((currentLog) => {
            if (currentLog) {
                this.setState({currentLog});
                console.log(`log in `);
            } else {
                console.log('log out');
                this.setState({currentLog: null})
            }
        });
    }


    render() {
        return (
            <div>
                <Header isLogged={this.state.currentLog}/>
                <Switch className="App">
                    <Route exact path={'/'} component={HomePage}/>
                    <Route
                        path='/authorization/'
                        component={() => <Authorization currentCompany={this.state.currentLog}
                        />}
                    />
                    <Route path="/AboutUs/" component={AboutUs}/>
                    <Route path="/TestCreater/" component={TestCreater}/>
                    <Route component={NoMatch}/>
                </Switch>
                {/*<CompanyPage/>*/}
            </div>

        );
    }
}


export default App;
