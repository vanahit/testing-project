import React, {Component} from 'react';
import src from '../../images/generic-avatar.png';
import PassedTests from './PassedTests';
import styled from 'styled-components';
import UserSvg from './UserSvg';

const UserSvgDiv = styled.div`
	margin: 30px auto;
	width: 200px;
	:hover {
		fill: #FF5959;
	}
`;




export default class UserInCompany extends Component {
	constructor(props){
		super(props)
	}
	skills(arr){
		return arr.join(', ')
	}
	render(){
		
		return(
			this.props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<UserSvgDiv><UserSvg /></UserSvgDiv>
					<div className="infoUser">
						<h2>{this.props.item.firstName} {this.props.item.lastName} </h2>
						
						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</div>
						<div className="skillsDivUser">
							<span className="gray">Skills: </span>
							<span className="orange"> {this.skills(this.props.item.languages)} </span>
						</div>
					</div>
				</div>
				<div className="labelHeader">Companies Tests</div>
				 <PassedTests user = {this.props.item} /> 
			</div>
		);
	}
}