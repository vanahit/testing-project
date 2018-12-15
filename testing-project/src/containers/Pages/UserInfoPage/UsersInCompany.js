import React from 'react';
import PassedTests from '../PassedTests';
import styled from 'styled-components';
import UserSvg from '../UserSvg';

const UserSvgDiv = styled.div`
	margin: 30px auto;
	margin-right: 20px;
	width: 200px;
	:hover {
		fill: #FF5959;
	}
`;

export default function UserInCompany (props) {

	function skills(arr) {
		return arr.join(', ')
	}
	return (
			props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<UserSvgDiv><UserSvg /></UserSvgDiv>
					<div className="infoUser">
						<h2>{props.item.firstName} {props.item.lastName} </h2>

						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
						</div>
						<div className="skillsDivUser">
							<span className="gray">Skills: </span>
							<span className="orange"> {skills(props.item.languages)} </span>
						</div>
						<div className="skillsDivUser">
							{props.currentUser && props.currentUser.type === 'company' &&
								<>
								<span className="gray">E-mail: </span>
								<span className="orange"> {props.item.email} </span>
								</>
							}
							
						
						</div>
					</div>
				</div>
				<div className="labelHeader">Companies Tests</div>
				<PassedTests user={props.item} userId={props.userId}  currentUser={props.currentUser}  />
			</div>
		);
}
