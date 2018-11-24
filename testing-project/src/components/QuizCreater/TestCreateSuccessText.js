import { BrowserRouter as Link, Router } from "react-router-dom";
import styled, {css} from 'styled-components';
import React, { Component } from 'react';
import AllTests from '../../containers/Pages/AllTests';

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
            <Link to='/Tests'>link to tests</Link> 
            {/* <RouterLink > 
                 <span>Test</span> 
            </RouterLink>  */}
        </SuccessText>        
	)
}
