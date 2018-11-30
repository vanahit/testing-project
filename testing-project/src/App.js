import './App.css';
import React, { Component}  from 'react'
import {Switch, Route} from "react-router-dom";
import TestCreator from './containers/QuizCreator/TestCreator';
import TestPassPanel from './containers/TestPassPanel/TestPassPanel';
import AboutUs from './components/AboutUs/AboutUs';
import Authorization from "./components/Autorization/Authorization";
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import AllTests from "./containers/Pages/AllTests";
import AllCompanies from "./containers/Pages/AllCompanies";
import AllUsers from "./containers/Pages/AllUsers";
import User from "./containers/Pages/User";
import NoMatch from "./components/NoMatch";
import HomePage from "./containers/HomePage/HomePage";
import Header from "./components/Header";
import { connect } from 'react-redux';
import { getTests, getUsers, getCompanies } from './store/actions/appAction';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {testsLoaded: this.props.testsLoaded}
    }

    componentDidMount() {
        this.props.getCompanies();
        this.props.getTests();
        this.props.getUsers();
        
  }

  componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded === true && this.props.testsLoaded !== prevProps.testsLoaded) {
            
            this.setState({testsLoaded: this.props.testsLoaded})
        }
  }

  render() {
    console.log(this.state.testsLoaded);
    return (
      <div>
        <Header/>
          <Switch className="App">
            <Route exact path={'/'} component={HomePage}/>
            <Route path='/authorization/' component={Authorization}/>
            <Route path='/registration/user' component={AutorizationUser}/>
            <Route path='/registration/company' component={AutorizationCompany}/>
            <Route path="/Companies/" component={AllCompanies} />
            <Route path="/Users/" component={AllUsers} />
            <Route path="/User/:Text" component={User} />
            <Route path="/aboutUs/" component={AboutUs} />
            <Route path="/testCreator/" component={TestCreator} />
            <Route path="/testPassPanel/" component={TestPassPanel} />
            <Route path="/tests/" component={AllTests} />
            <Route component={NoMatch}/>
           
         </Switch>
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
        getTests: tests =>  dispatch(getTests(tests)),
        getUsers: users =>  dispatch(getUsers(users)),
        
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(App);
