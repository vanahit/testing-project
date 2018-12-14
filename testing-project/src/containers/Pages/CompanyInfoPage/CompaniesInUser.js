import React from 'react';
import CompanyTests from './CompanyTests';
import styled from 'styled-components';
import CompanySvg from './CompanySvg';

const CompanySvgDiv = styled.div`
	width: 200px;
	margin: auto;
	:hover {
		fill: #FF5959;
	}
`;


export default function CompaniesInUser(props) {
		return(
			props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<div className="imgDiv">
						< CompanySvgDiv> <CompanySvg /> </ CompanySvgDiv>
					</div>
					<div className="infoUser">
						<h2>{props.item.name}</h2>
						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</div>
					</div>
				</div>
				<div className="labelHeader">Company Tests</div>
				 <CompanyTests addCurrentItem={props.addCurrentItem} item={props.item}/> 
			</div>
		);
	
}