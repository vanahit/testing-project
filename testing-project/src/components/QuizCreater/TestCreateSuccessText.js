import { BrowserRouter as Link, Route } from "react-router-dom";
import styled from 'styled-components';
import React from 'react';

const RouterLink = styled.span`
	color: #4F9DA6;
	font-style: underline;
`;
const SuccessText = styled.div`
	font-size: 20px;
`;
export default function successText (props) {
    return (
        <SuccessText>
            Test created successfully. <RouterLink > See All Tests. </RouterLink> 
        </SuccessText>
        
	)
}
