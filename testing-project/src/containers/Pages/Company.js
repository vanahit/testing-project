import React, {Component} from 'react';
import { NavLink, Route } from "react-router-dom";
import CompanyProfile from './CompanyProfile';
import CompanyTests from './CompanyTests';
import InvitedUsers from "./InvitedUsers";

export default class Company extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="containerUser">
				<nav className="tabBar">
					<NavLink exact activeClassName="active" to="/Company/Profile"  >Profile</NavLink>
					<NavLink activeClassName="active" to="/Company/Tests"  >Tests</NavLink>
					<NavLink activeClassName="active" to="/Company/InvitedUsers"  >Invited Users</NavLink>
				</nav>
				<Route path="/Company/Profile" component={CompanyProfile}  />
				<Route path="/Company/Tests" component={CompanyTests}  />
				<Route path="/Company/InvitedUsers" component={InvitedUsers}  />
			</div>
		);
	}
}