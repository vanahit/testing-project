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
						<h2>Cam Gigandet</h2>
						<div>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
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