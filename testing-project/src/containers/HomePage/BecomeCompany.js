import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import { connect } from 'react-redux';
import forCompanyImg from './img/forCompany.jpg';
import CheckBox from '../../components/HomePage/CheckBox';

const GetStartedDiv = styled.div`
    color: white;
    width: 100%;   
    text-align: right;
    margin-top: 115px;
    padding: 16px;
    background-color: rgba(20, 18, 24, 0.75);
    font-size: 24px;
    box-sizing: border-box;	
`;

const FlexChild = styled.div`
    position: relative;
    width: 49%;
	width: ${props => props.width || ''};  
    box-sizing: border-box; 
    
	@media screen and (max-width: 1190px) {
		margin: 20px 5px;
		min-width: 98%;
	}
`;

const Button = styled.button`
    width: ${props => props.width || ''};  
    height: 60px;
    border: 0;
    border-radius: 4px;
    background-color:rgba(255, 89, 89, 1);
    color: white;
    font-weight: bold;
    font-size: 18px;
`;

const TitleWhite = styled.div`
    padding: 100px 16px 16px 16px;
    color: white;
    font-size: 48px;
    font-weight: bold;
    box-sizing: border-box;
   
`;
const BlackShadow = styled.div`
    width: 100%;
    background-color: rgba(20, 18, 24, 0.5);
`;
const Block = styled.div`
    position: relative;
    width: 100%;
    background-image: url(${forCompanyImg});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    box-sizing: border-box;
`;
class BecomeCompany extends Component {
	constructor(props) {
		super(props);
		this.state ={};
	}

    render() {
		return (
            <FlexChild>
                    <Block>
                        <BlackShadow>
                            <TitleWhite>
                                FOR COMPANY  
                            </TitleWhite>
                            <CheckBox>Register Your Company</CheckBox>
                            <CheckBox>Create Tests</CheckBox>
                            <CheckBox>Invite the Best Users to Your Company</CheckBox>
                                                                
                            <GetStartedDiv>
                                <Button width={'228px'}>
                                    BECOME COMPANY
                                </Button>
                            </GetStartedDiv>
                        </BlackShadow>
                    </Block>
            </FlexChild>
               
        );
	}
}

function mapStateToProps(state) {
	return {
	
	}
}

export default connect(mapStateToProps, null)(BecomeCompany)
