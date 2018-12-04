import React, {Component} from 'react';
import AutorizationUser from "./AutorizationUser";
import AutorizationCompany from "./AutorizationCompany";
import '../../App.css';
import { NavLink, Route } from "react-router-dom";
import {Redirect} from "react-router";
import {firebase} from '../../firebase/firebase';


class Authorization extends Component {


    state = {
        selectedTab: 'company',
        name:"uiscdbsacd"
       
    };

    componentDidMount() {
        this.mounted = true;
        firebase.database().ref('companies/qnUuRBUn2LeTx083lturGIqB6nj1').on('value',(snapshot)=>{
            if (this.mounted) {
                this.setState({name: snapshot.val().name})
            }
            
        });
    }
    componentWillUnmount () {
        this.mounted = false;
    }
    changeTab(tab) {
        this.setState({
            selectedTab: tab
        })
    }
    // {(this.props.user && localStorage.getItem("current") === "company") ? 
    //                 <Redirect to={`/${this.props.user.name}/profile`}/> :
    //                 (this.props.user && localStorage.getItem("current") === "user") ?
    //                 <Redirect to={`/${this.props.user.firstName}${this.props.user.lastName}/profile`}/> :
    //                 <div className="containerUser">
    //                     <nav className="tabBar">
    //                         <NavLink exact activeClassName="active" to={`/authorization/company`}>COMPANY</NavLink>
    //                         <NavLink activeClassName="active" to={`/authorization/user`}>USER</NavLink>
    //                     </nav>
    //                     <Route path="/authorization/company" component={AutorizationCompany}/>
    //                     <Route path="/authorization/user" component={AutorizationUser}/>
    //                 </div>}
    render() {
        return (
            <div>
            {(this.props.user && localStorage.getItem("current") === "company") ?
                     <Redirect to={`/${this.props.user.name}/profile`}/> :
                     (this.props.user && localStorage.getItem("current") === "user") ?
                    <Redirect to={`/${this.props.user.firstName}${this.props.user.lastName}/profile`}/> :
                    <div className='switch-buttons'>
                        <p>Home/Login Company</p>
                        <button className={this.state.selectedTab === 'company' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('company')}>COMPANY
                        </button>
                        <button className={this.state.selectedTab === 'user' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('user')}>USER
                        </button>
                        {this.state.selectedTab === 'company' ?
                            <AutorizationCompany /> :
                            <AutorizationUser/>}
                    </div>}
                
                
                }

            </div>
        );
    }
}


export default Authorization;
