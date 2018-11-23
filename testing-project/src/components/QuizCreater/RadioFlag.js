import styled, {css} from 'styled-components';
import React, { Component } from 'react';

const RadioText = styled.div`
		position: absolute;
		padding: 5px 10px;
		left: 0px;
		top: 62px;
		color: rgba(185, 4, 46, 0.7);
		font-size: 14px;
		background-color: rgba(79, 157, 166, 0.2);
		border-radius: 4px;
		
`;
const Trinagle = styled.div`
		position: absolute;
		top: 27px;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 15px solid rgba(79, 157, 166, 0.2);
`;
export default function radioFlag (props) {
    return (
		<RadioText>
				<Trinagle ></Trinagle> 
				  choose right answer of question {props.count}
		</RadioText>
	)
}
