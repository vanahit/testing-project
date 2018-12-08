import React, {Component} from 'react';
import src from '../../images/generic-avatar.png';
import PassedTests from './PassedTests';
import styled from 'styled-components';
const img = styled.div`

`;


export default class CompaniesInUser extends Component {
	constructor(props){
		super(props)
	}
	skills(arr){
		return arr.join(', ')
	}
	render(){
		
		return(
			this.props.location.state.userInfo && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<div className="imgDiv">
						<img src={src} />
					</div>
					<div className="infoUser">
						<h2>{this.props.location.state.userInfo.firstName} {this.props.location.state.userInfo.lastName} </h2>
						
						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</div>
						<div className="skillsDivUser">
							<span className="gray">Skills: </span>
							<span className="orange"> {this.skills(this.props.location.state.userInfo.languages)} </span>
						</div>
					</div>
				</div>
				<div className="labelHeader">Companies Tests</div>
				 <PassedTests user = {this.props.location.state.userInfo} /> 
			</div>
		);
	}
}