import styled  from 'styled-components';
import React from 'react';

const LinkDiv = styled.div`
	background-color: white;
	z-index: 2;
	top: 0px;
	overflow: hidden;
	width: 1200px;
	padding: 30px 0;
	font-size: 14px;
	border-bottom: 1px solid #D6D6D6;
`;

export default function TestCreatorLink (props) {
    return (
		<LinkDiv>
			Home / My Account / Test Create
		</LinkDiv>		
	);
}
