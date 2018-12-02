import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import TestCreator from './components/TestCreator/TestCreator';
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
<<<<<<< HEAD
import PopUpLogin from './components/PopUps/PopUpLogin';
=======
import CompanyProfile from "./containers/Pages/CompanyProfile";
>>>>>>> 32c0f3e8b6fc80e6964c8064b2fdaee91fbb1ebd


class App extends Component {


    state = {
<<<<<<< HEAD
        currentLog: null,
        testsLoaded: this.props.testsLoaded,
        testAddClicked: false,

=======
        currentLog: [],
        testsLoaded: this.props.testsLoaded
>>>>>>> 32c0f3e8b6fc80e6964c8064b2fdaee91fbb1ebd
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
        this.props.getCompanies();
        this.props.getTests();
        this.props.getUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded === true && this.props.testsLoaded !== prevProps.testsLoaded) {

            this.setState({testsLoaded: this.props.testsLoaded})
        }
    }

<<<<<<< HEAD
    testAddClicked = () => {
        this.setState({testAddClicked: !this.state.testAddClicked});
    }
 
=======
>>>>>>> 32c0f3e8b6fc80e6964c8064b2fdaee91fbb1ebd
    render() {
        console.log(this.state.currentLog);

        return (
            <div>
                {this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked}/>} 
                <Layout currentLog={this.state.currentLog}>
                    <Switch className="App">
<<<<<<< HEAD
                        <Route exact path={'/'} component={() => <HomePage  testAddClicked={this.testAddClicked} />}/>
                        <Route path='/registration/user'  component={AutorizationUser}/>
                        <Route path='/registration/company'  component={AutorizationCompany}/>
=======
                        <Route exact path={'/'} component={HomePage}/>
                        <Route path='/registration/user' component={AutorizationUser}/>
                        <Route path='/registration/company' component={AutorizationCompany}/>
>>>>>>> 32c0f3e8b6fc80e6964c8064b2fdaee91fbb1ebd

                        <Route path="/Users/" component={AllUsers}/>
                        <Route path="/Companies/" component={AllCompanies}/>

                        <Route path="/CompaniesInUser/" component={CompaniesInUser}/>
                        <Route path="/UsersInCompany/" component={UsersInCompany}/>

                        <Route path="/User/:Text" component={User}/>
                        <Route path="/Company/:Text" component={() => <Company currentCompany={this.state.currentLog}/>}/>
                        {/*<Route path='/company/profile'*/}
                               {/*component={() => <CompanyProfile currentCompany={this.state.currentLog}/>}/>*/}
                        <Route
                            path='/authorization/'
                            component={() => <Authorization currentCompany={this.state.currentLog}/>}
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

function mapStateToProps(state) {
    return {
        testsLoaded: state.appReducer.testsLoaded
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
