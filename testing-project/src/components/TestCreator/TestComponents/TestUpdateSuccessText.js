
import {Link} from "react-router-dom";
import styled from 'styled-components';
import React from 'react';

const RouterLink = styled.span`
	color: #4F9DA6;
	text-decoration: underline;
`;
const TextDiv = styled.div`
	font-size: 20px;
`;
export default function UpdateSuccessText (props) {
    return (
        <TextDiv>
            Test updated successfully.{' '} 
            <Link to='/tests'> 
                <RouterLink >See All Tests. </RouterLink> 
            </Link>
        </TextDiv>
        
	)
}
