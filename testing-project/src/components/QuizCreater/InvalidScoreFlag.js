import styled, {css} from 'styled-components';
import React, { Component } from 'react';

const InvalidScoreText = styled.div`
		position: absolute;
		padding: 5px 10px;
		left: 2px;
		top: -35px;
		color: rgba(185, 4, 46, 0.7);
		font-size: 14px;
		background-color: rgba(79, 157, 166, 0.2);
		border-radius: 4px;
		
`;
const Trinagle = styled.div`
		position: absolute;
		top: 26px;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 15px solid rgba(79, 157, 166, 0.2);
`;
export default function invalidScoreFlag (props) {
    return (
		<InvalidScoreText>
				<Trinagle ></Trinagle> 
				   must be less then total score
		</InvalidScoreText>
	)
}
