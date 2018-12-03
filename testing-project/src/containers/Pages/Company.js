import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import CompanyTests from './CompanyTests';
import InvitedUsers from "./InvitedUsers";
import {Redirect} from "react-router";
import CompanyProfile from "./CompanyProfile";

export default class Company extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            (this.props.currentCompany) ?
                <div className="containerUser">
                    <nav className="tabBar">
                        <NavLink exact activeClassName="active" to="/company/profile">Profile</NavLink>
                        <NavLink activeClassName="active" to="/Company/Tests">Tests</NavLink>
                        <NavLink activeClassName="active" to="/Company/InvitedUsers">Invited Users</NavLink>
                    </nav>
                    <Route path="/company/profile" component={CompanyProfile}/>
                    <Route path="/company/tests" component={CompanyTests}/>
                    <Route path="/company/invitedUsers" component={InvitedUsers}/>
                </div> :
                <Redirect to='/authorization'/>
        );
    }
}