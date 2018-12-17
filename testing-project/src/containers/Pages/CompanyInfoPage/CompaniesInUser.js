import React from 'react';
import CompanyTests from './CompanyTests';
import styled from 'styled-components';
import CompanySvg from './CompanySvg';

const UserSvgDiv = styled.div`
	margin: 0px auto;
	margin-right: 20px;
	width: 250px;
	:hover {
		fill: #FF5959;
	}
`;
const Main = styled.div`
	padding-top: 77px;
	box-sizing: border-box;
`;

export default function CompaniesInUser(props) {
	return (
		<Main>
			{props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<div className="imgDiv image-content">
						<UserSvgDiv className="image-content">
							{props.item.image ? <img src={props.item.image} alt="User" /> : <CompanySvg />}
						</UserSvgDiv>
					</div>
					<div className="infoUser">
						<h2>{props.item.name}</h2>
						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
						</div>
					</div>
				</div>
				<div className="labelHeader">Company Tests</div>
				<CompanyTests
					testAddClicked={props.testAddClicked}
					userTestAdded={props.userTestAdded}
					user={props.user}
					item={props.item}
				/>
			</div>}
		</Main>
	);

}