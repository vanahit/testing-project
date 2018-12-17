import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import TestCreator from './components/TestCreator/TestCreator';
import TestEditor from './components/TestCreator/TestEditor';
import AboutUs from './components/AboutUs/AboutUs';
import Authorization from "./components/Autorization/Authorization";
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import Company from "./containers/Pages/Company";
import CompaniesInUser from "./containers/Pages/CompanyInfoPage/CompaniesInUser";
import UsersInCompany from "./containers/Pages/UserInfoPage/UsersInCompany";
import AllTests from "./containers/Pages/AllTests";
import AllCompanies from "./containers/Pages/AllCompanies";
import AllUsers from "./containers/Pages/AllUsers";
import User from "./containers/Pages/User";
import NoMatch from "./components/NoMatch";
import HomePage from "./components/HomePage/HomePage";
import { connect } from 'react-redux';
import { getCompanies, getTests, getUsers } from './store/thunks/thunks';
import * as firebase from "firebase";
import Layout from "./Hoc/Layout";
// import PopUpLogin from './components/PopUps/PopUpLogin';
// import PopUpDelete from './components/PopUps/PopUpDelete';
import PopUpTestAdded from './components/PopUps/PopUpTestAdded';
import StartTest from './containers/Pages/StartTest';
import OneTestInfo from './containers/Pages/TestInfoPage/OneTestInfo';


class App extends Component {


    state = {
        currentLog: null,
        testsLoaded: this.props.testsLoaded,
        companiesLoaded: this.props.companiesLoaded,
        userTestAdded: false,
        user: null
    };
    passers = 0;

    componentDidMount() {

        firebase.auth().onAuthStateChanged((currentLog) => {
            if (currentLog) {
                this.setState({ currentLog });

                if (localStorage.getItem("current") === "company") {
                       firebase.database().ref(`companies/${currentLog.uid}`).on('value', (snapshot) => {

                        if (snapshot.val()) {
                            this.setState({ currentLog, user: { ...snapshot.val() } })
                        }
                    })
                }
                if (localStorage.getItem("current") === "user") {
                    firebase.database().ref(`user/${currentLog.uid}`).on('value', (snapshot) => {
                        let user = {};
                        let tests = [];
                        if (snapshot.hasChild('tests')) {
                            snapshot.child('tests').forEach(childSnapshot => {
                                tests.push({
                                    id: childSnapshot.key,
                                    ...childSnapshot.val()
                                })
                            })
                        } else {
                            tests = [];
                        }
                        user = {
                            id: snapshot.key,
                            ...snapshot.val(),
                            tests
                        }
                        if (snapshot.val()) {
                            this.setState({ currentLog, user: user });
                        }
                    })
                }
              
            } else {
                localStorage.removeItem("current")
                this.setState({ currentLog: null, user: null })
            }
        });
        this.props.getCompanies();
        this.props.getTests();
        this.props.getUsers();
    }


    
    userTestAdded = () => {
        this.setState({ userTestAdded: !this.state.userTestAdded });
    }
    addCurrentItem = (currentItem) => {
        this.setState({ currentItem: currentItem });
    }

    render() {
        return (
            <div>

                
                
                {this.state.userTestAdded &&
                    <PopUpTestAdded exists={false} userTestAdded={this.userTestAdded} user={this.state.user}>
                        added to tests in your propfile
                    </PopUpTestAdded>
                }

                <Layout currentLog={this.state.currentLog} user={this.state.user}>
                    <Switch className="App">
                        <Route exact path={'/'} component={() =>
                            <HomePage
                                
                                userTestAdded={this.userTestAdded}
                                user={this.state.user}
                                addCurrentItem={this.addCurrentItem}

                            />} />
                        <Route path="/tests/" component={() =>
                            <AllTests
                                
                                userTestAdded={this.userTestAdded}
                                user={this.state.user}
                            />} />
                        {this.props.companies && this.props.companies.map(item => {
                            return (
                                <Route
                                    key={item.id}
                                    path={`/company-info-page/${item.name}`}
                                    component={() => 
                                    <CompaniesInUser 
                                        item={item}
                                        
                                        userTestAdded={this.userTestAdded}
                                        user={this.state.user}
                                     />} 
                                />
                            )
                        })}
                          {this.props.users && this.props.users.map(item => {
                            return (
                                <Route 
                                    key={item.id}
                                    path={`/user-info-page/${item.firstName}${item.lastName}`}
                                    component={() => <UsersInCompany
                                        currentUser={this.state.user} 
                                        item={item} 
                                        userId={this.state.user ? this.state.user.id : 1} passers={this.passers && this.passers}/>} />
                            )
                        })}
                         {this.props.tests && this.props.tests.map(item => {
                            return (
                                <Route 
                                key={item.id}
                                    path={`/test-info-page/${item.id}`} component={() =>
                                    <OneTestInfo
                                        user={this.state.user}
                                        item={item}
                                        
                                        userTestAdded={this.userTestAdded}
                                    />} />
                            )
                        })}

                        {this.props.tests && this.props.tests.map(item => {
                            this.passers = item.passers;
                            return (
                                <Route 
                                    key={item.id}
                                    path={`/${item.company}/test${item.id}`} component={() => <AllUsers  passers={item.passers ? item.passers : 'no'}/>} />
                            )
                        })}

                        <Route path="/autorization-company" component={AutorizationCompany} currentCompany={this.state.currentLog} user={this.state.user} />
                        <Route path="/autorization-user" component={AutorizationUser} currentCompany={this.state.currentLog} user={this.state.user} />
                        <Route path="/aboutUs/" component={AboutUs} />
                        <Route path='/registration/user' component={AutorizationUser} />
                        <Route path='/registration/company' component={AutorizationCompany} />
                        <Route path="/users/" component={AllUsers} />
                        <Route path="/companies/" component={() => <AllCompanies addCurrentItem={this.addCurrentItem} />} />
                        <Route
                            path='/authorization/'
                            component={() => <Authorization currentCompany={this.state.currentLog}
                                user={this.state.user} />}
                        />

                        {localStorage.getItem("current") === "user"
                            ? <Switch>
                                <Route path="/:user/start-test" component={() =>
                                    <StartTest user={this.state.user} />} />
                                <Route path="/:user/profile" component={() => <User currentCompany={this.state.currentLog} user={this.state.user} />} />
                                <Route path="/:user/tests" component={() => <User currentCompany={this.state.currentLog} user={this.state.user} />} /> 
                            </Switch>

                            : <Switch>
                                <Route path="/:company/add-test" component={() => <TestCreator user={this.state.user} />} />
                                <Route path="/:company/edit-test" component={() =>
                                    <TestEditor editingTest={this.props.editingTest} user={this.state.user} />}
                                />
                                <Route path="/:company/profile" component={() =>
                                    <Company
                                        currentCompany={this.state.currentLog}
                                        user={this.state.user}
                                         />} />
                                <Route path="/:company/tests" component={() =>
                                    <Company
                                        currentCompany={this.state.currentLog}
                                        user={this.state.user}
                                         />} />
                                <Route path="/:company/invited-users" component={() =>
                                    <Company
                                        currentCompany={this.state.currentLog}
                                        user={this.state.user}
                                         />} />
                            </Switch>
                        }

                        <Route component={NoMatch} />

                    </Switch>
                </Layout>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        testsLoaded: state.appReducer.testsLoaded,
        companiesLoaded: state.appReducer.companiesLoaded,
        editingTest: state.appReducer.editingTest,
        users: state.appReducer.users,
        companies: state.appReducer.companies,
        tests: state.appReducer.tests,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCompanies: companies => dispatch(getCompanies(companies)),
        getTests: tests => dispatch(getTests(tests)),
        getUsers: users => dispatch(getUsers(users)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
