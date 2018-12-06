import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import TestCreator from './components/TestCreator/TestCreator';
import TestEditor from './components/TestCreator/TestEditor';
import TestPassPanel from './components/TestPassPanel/TestPassPanel';
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
import HomePage from "./components/HomePage/HomePage";
import {connect} from 'react-redux';
import {getCompanies, getTests, getUsers} from './store/thunks/thunks';
import * as firebase from "firebase";
import Layout from "./Hoc/Layout";
import PopUpLogin from './components/PopUps/PopUpLogin';
import PopUpDelete from './components/PopUps/PopUpDelete';
import { userLogin } from './store/actions/appAction';
import PopUpTestAdded from './components/PopUps/PopUpTestAdded';
import StartTest from './containers/Pages/StartTest';

class App extends Component {


    state = {
        currentLog: null,
        testsLoaded: this.props.testsLoaded,
        companiesLoaded: this.props.companiesLoaded,
        testAddClicked: false,
        testDeletedClicked: false,
        userTestAdded: false,
        userTestExists: false,
        user: null
    };

    componentDidMount() {

        firebase.auth().onAuthStateChanged((currentLog) => {
            if (currentLog) {
                this.setState({currentLog});

                if(localStorage.getItem("current") === "company") {
                    this.props.userLogin('company');
                    
                    firebase.database().ref(`companies/${currentLog.uid}`).once('value',(snapshot)=>{
                        if(snapshot.val()){
                            this.setState({currentLog, user: {...snapshot.val()} })
                        } else {
                            this.setState({currentLog: null, user: null })
                        }
                    })
                }
                if(localStorage.getItem("current") === "user") {
                    this.props.userLogin('user');
                    firebase.database().ref(`user/${currentLog.uid}`).once('value',(snapshot)=>{
<<<<<<< HEAD
                        let user = {};
                        let tests = [];
                        snapshot.child('tests').forEach(childSnapshot => {
                            tests.push({
                                id: childSnapshot.key,
                                ...childSnapshot.val()
                            })
                        })
                        user = {
                            id: snapshot.key,
                            ...snapshot.val(),
                            tests
                        }
                        this.setState({currentLog, user: user})
=======
                        if(snapshot.val()){
                            this.setState({currentLog, user: {...snapshot.val()} })
                        } else {
                            this.setState({currentLog: null, user: null })
                        }
>>>>>>> ca9edaae9bfbbe43b3009062cc5481cdca16d547
                    })
                }

                console.log(`log in `);
            } else {
                console.log('log out');
                localStorage.removeItem("current")
                this.setState({currentLog: null, user: null})
            }
        });
        this.props.getCompanies();
        this.props.getTests();
        this.props.getUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded === true && this.props.testsLoaded !== prevProps.testsLoaded) {

            this.setState({testsLoaded: this.props.testsLoaded})
        }
        if (this.props.companiesLoaded === true && this.props.companiesLoaded !== prevProps.companiesLoaded) {

            this.setState({companiesLoaded: this.props.companiesLoaded})
        }
    }

    testAddClicked = () => {
        this.setState({testAddClicked: !this.state.testAddClicked});
    };

    testDeletedClicked = () => {
        this.setState({testDeletedClicked: !this.state.testDeletedClicked});
    }
    userTestAdded = () => {
        this.setState({userTestAdded: !this.state.userTestAdded});
    }
    userTestExists = () => {
        this.setState({userTestExists: !this.state.userTestExists});
    }

    componentWillUnmount() {
        //this.setState({testAddClicked: false});
    }

    render() {
        return (
            <div>

                {this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked}/>} 
                {this.state.testDeletedClicked && <PopUpDelete testDeletedClicked={this.testDeletedClicked}/>} 
                {this.state.userTestAdded && 
                    <PopUpTestAdded  exists={false}  userTestAdded={this.userTestAdded} user={this.state.user}>
                        added to tests in your propfile
                    </PopUpTestAdded>
                }
                {this.state.userTestExists && 
                    <PopUpTestAdded  exists={true}  userTestExists={this.userTestExists} user={this.state.user}>
                        has already been added to your tests
                    </PopUpTestAdded>
                }

                <Layout currentLog={this.state.currentLog} user={this.state.user}>
                    <Switch className="App">
                        <Route exact path={'/'} component={() => <HomePage testAddClicked={this.testAddClicked}/>}/>
                        <Route path="/tests/" component={() => 
                            <AllTests 
                                testAddClicked={this.testAddClicked}
                                userTestAdded={this.userTestAdded}
                                userTestExists={this.userTestExists}
                                currentUser={this.state.currentLog} 
                                user={this.state.user}
                            />}/>
                        <Route path='/registration/user' component={AutorizationUser}/>
                        <Route path='/registration/company' component={AutorizationCompany}/>
                        <Route path="/Users/" component={AllUsers}/>
                        <Route path="/companies/" component={AllCompanies}/>
                        <Route path="/CompaniesInUser/" component={CompaniesInUser}/>
                        <Route path="/UsersInCompany/" component={UsersInCompany}/>
                        <Route path="/:company/add-test" component={() => <TestCreator user={this.state.user} />}/>
                        <Route path="/:company/edit-test" component={() => 
                            <TestEditor editingTest={this.props.editingTest} user={this.state.user} />}
                        />
<<<<<<< HEAD
                           <Route
=======
                        {localStorage.getItem("current") === "user" ? 
                                                    <Route path="/:user/:text" component={() => <User currentCompany={this.state.currentLog} user={this.state.user} />}/> :
                                                    <Route path="/:company/:text" component={() => 
                                                        <Company 
                                                            currentCompany={this.state.currentLog} 
                                                            user={this.state.user} 
                                                            testDeletedClicked={this.testDeletedClicked}
                                                        />}/>}

                        <Route
>>>>>>> ca9edaae9bfbbe43b3009062cc5481cdca16d547
                            path='/authorization/'
                            component={() => <Authorization currentCompany={this.state.currentLog}
                                                            user={this.state.user}/>}
                        />
                        {localStorage.getItem("current") === "user" 
                            ? <div>
                                <Route path="/:user/start-test" component={() => 
                                    <StartTest user={this.state.user}/>}/>
                                <Route path="/:user/test/:Id" component={() => 
                                    <TestPassPanel passingTest={this.props.passingTest} user={this.state.user}/>}/>
                                <Route path="/:user/:text" component={() => <User currentCompany={this.state.currentLog} user={this.state.user} />}/> 
                                
                                </div>
                            
                            : <Route path="/:company/:text" component={() =>  
                                <Company 
                                    currentCompany={this.state.currentLog} 
                                    user={this.state.user} 
                                    testDeletedClicked={this.testDeletedClicked} />}/>
                        }

                     
                        <Route path="/aboutUs/" component={AboutUs}/>
                       
                        
                        <Route component={NoMatch}/>

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
        passingTest: state.appReducer.passingTest,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCompanies: companies => dispatch(getCompanies(companies)),
        getTests: tests => dispatch(getTests(tests)),
        getUsers: users => dispatch(getUsers(users)),
        userLogin: userType => dispatch(userLogin(userType))

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
