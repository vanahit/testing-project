import './App.css';
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
import HomePage from "./components/HomePage";
import Header from "./components/Header";

class App extends Component {
  render() {
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


export default App;
