import React from 'react';
import src from '../../images/is.jpg';
import PassedTests from './PassedTests';



export default function UserProfile (props) {
	return (
		<div>
			<div className="userContent">
				<div className="imgDiv">
					<img src={src} alt="User pic"/>
				</div>
				<div className="infoUser">
					<h2>{`${props.user.firstName} ${props.user.lastName}`}</h2>
					<div>
						{props.user.description}
					</div>
				</div>
			</div>
			<div className="settings">
				<span>Edit</span>{` / `}<span>Profie Settings</span>
			</div>
			<div className="labelHeader">Passed Tests</div>
			<PassedTests user={props.user} />
		</div>
	);

}