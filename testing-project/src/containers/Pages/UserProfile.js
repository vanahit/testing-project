import React, {Component} from 'react';
import src from '../../images/is.jpg';
import PassedTests from './PassedTests';



export default class UserProfile extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<div className="userContent">
					<div className="imgDiv">
						<img src={src} />
					</div>
					<div className="infoUser">
						<h2>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h2>
						<div>
							{this.props.user.description}
						</div>
					</div>
				</div>
				<div className="settings">
					<span>Edit</span>{` / `}<span>Profie Settings</span>
				</div>
				<div className="labelHeader">Passed Tests</div>
				<PassedTests />
			</div>
		);
	}
}