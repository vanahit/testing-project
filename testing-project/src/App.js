import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import TestCreator from './containers/QuizCreator/TestCreator';
import TestPassPanel from './containers/TestPassPanel/TestPassPanel';
import AboutUs from './components/AboutUs/AboutUs';
import Authorization from "./components/Autorization/Authorization";
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import Company from "./containers/Pages/Company";
import CompaniesInUser from "./containers/Pages/CompaniesInUser";
import UsersInCompany from "./containers/Pages/UsersInCompany";
import AllTests from "./containers/Pages/AllTests";
import AllCompanies from "./containers/Pages/AllCompanies";
import AllUsers from "./containers/Pages/AllUsers";
import User from "./containers/Pages/User";
import NoMatch from "./components/NoMatch";
import HomePage from "./components/HomePage";
import Header from "./components/Header_footer/Header";
import * as firebase from "firebase";
import CompanyPage from "./components/Autorization/CompanyPage";
import Layout from "./Hoc/Layout";


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
                <Layout>
                    <Switch className="App">
                        <Route exact path={'/'} component={HomePage}/>
                        <Route path='/registration/user' component={AutorizationUser}/>
                        <Route path='/registration/company' component={AutorizationCompany}/>

                        <Route path="/Users/" component={AllUsers}/>
                        <Route path="/Companies/" component={AllCompanies}/>

                        <Route path="/CompaniesInUser/" component={CompaniesInUser}/>
                        <Route path="/UsersInCompany/" component={UsersInCompany}/>

                        <Route path="/User/:Text" component={User}/>
                        <Route path="/Company/:Text" component={Company}/>
                        <Route path={'/companyPage'}
                               component={() => <CompanyPage currentCompany={this.state.currentLog}/>}/>
                        <Route
                            path='/authorization/'
                            component={() => <Authorization currentCompany={this.state.currentLog}
                            />}
                        />
                        <Route path="/aboutUs/" component={AboutUs}/>
                        <Route path="/testCreator/" component={TestCreator}/>
                        <Route path="/testPassPanel/" component={TestPassPanel}/>
                        <Route path="/tests/" component={AllTests}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Layout>
            </div>
        );
    }


}


export default App;
