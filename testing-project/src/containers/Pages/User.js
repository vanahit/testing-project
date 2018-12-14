import React, {Component} from 'react';
import { NavLink, Route } from "react-router-dom";
import UserProfile from './UserProfile';
import UserTests from "./UserTests";
import {Redirect} from "react-router";
import StartTest from './StartTest';

export default class User extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			(this.props.user && this.props.user.type === "user") ?
			<div className="containerUser">
				<nav className="tabBar">
					<NavLink exact activeClassName="active" to={`/${this.props.user.firstName}${this.props.user.lastName}/profile`}  >Profile</NavLink>
					<NavLink activeClassName="active" to={`/${this.props.user.firstName}${this.props.user.lastName}/tests`}  >My Tests</NavLink>
				</nav>
				<Route path="/:user/profile" component={() => <UserProfile user={this.props.user} />}  />
				<Route path="/:user/tests" component={() => <UserTests user={this.props.user} />}  />
				<Route path="/:user/start-test" component={() =>
                                    <StartTest user={this.props.user} />} />
			</div> :
			<Redirect to='/authorization'/>
		);
	}
}