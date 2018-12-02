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
import PopUpLogin from './components/PopUps/PopUpLogin';
import CompanyProfile from "./containers/Pages/CompanyProfile";



class App extends Component {


    state = {
        currentLog: null,
        testsLoaded: this.props.testsLoaded,
        companiesLoaded: this.props.companiesLoaded,
        testAddClicked: false,
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
        if (this.props.companiesLoaded === true && this.props.companiesLoaded !== prevProps.companiesLoaded) {

            this.setState({companiesLoaded: this.props.companiesLoaded})
        }
    }

   testAddClicked = () => {
        this.setState({testAddClicked: !this.state.testAddClicked});
    }

    componentWillUnmount() {
        this.setState({testAddClicked: false});
    }
    render() {
        console.log(this.state.currentLog);

        return (
            <div>
                {this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked}/>} 
                <Layout currentLog={this.state.currentLog}>
                    <Switch className="App">
                        <Route exact path={'/'} component={() => <HomePage  testAddClicked={this.testAddClicked} />}/>
                        <Route path='/registration/user'  component={AutorizationUser}/>
                        <Route path='/registration/company'  component={AutorizationCompany}/>
                        <Route path="/Users/" component={AllUsers}/>
                        <Route path="/companies/" component={AllCompanies}/>

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
                        <Route path="/tests/" component={ () => <AllTests  testAddClicked={this.testAddClicked} />}/>
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
