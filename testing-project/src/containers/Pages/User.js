import React, {Component} from 'react';
import { NavLink, Route } from "react-router-dom";
import UserProfile from './UserProfile';
import UserTests from "./UserTests";

export default class User extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="containerUser">
				<nav className="tabBar">
					<NavLink exact activeClassName="active" to="/User/Profile"  >Profile</NavLink>
					<NavLink activeClassName="active" to="/User/Tests"  >My Tests</NavLink>
				</nav>
				<Route path="/User/Profile" component={UserProfile}  />
				<Route path="/User/Tests" component={UserTests}  />
			</div>
		);
	}
}