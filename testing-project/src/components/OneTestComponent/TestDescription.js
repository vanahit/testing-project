import styled from 'styled-components';
import React from 'react';

const DescriptionDiv = styled.div`
        position: absolute;
        z-index: 9999;
        padding: 10px 10px;
        word-wrap: break-word;
        left: calc(50% - 100px);
		top: 200px;
        width: 400px;
        height: 100px;
        color: white;
		font-size: 20px;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		transition:  0.5s ;

		@media screen and (max-width: 1188.5px) {
			font-size: 12px;
		}		
`;

const TestDescription = props => {
    return (
        <DescriptionDiv 
            companyLogin={props.companyLogin}
            onMouseLeave={() => props.onOut()}
        >
			{props.description}
		</DescriptionDiv >
	)
}

export default TestDescription;