import React, {Component} from 'react';
import src from '../../images/is.jpg';
import PassedTests from './PassedTests';
import styled from 'styled-components';
const img = styled.div`

`;



export default class CompaniesInUser extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<div className="imgDiv">
						<img src={src} />
					</div>
					<div className="infoUser">
						<h2>Cam Gigandet</h2>
						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</div>
					</div>
				</div>
				<div className="settings">
					<button>Send Invitation</button>
				</div>
				<div className="labelHeader">Passed Tests</div>
				{/* <PassedTests /> */}
			</div>
		);
	}
}