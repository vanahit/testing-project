import React, {Component} from 'react';
import { NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from 'react-redux';
import {Redirect} from "react-router";

const AllDiv = styled.div`
	margin-top: 30px;
	font-size: 16px;
    padding-bottom: 10px;
`;

const LinkDiv = styled(NavLink)`
    display: inline-block;
    text-decoration: none;
    color: #141218;
    :hover, :active {
        text-decoration: underline;
        cursor: pointer;
    }
`;
const TestLink = styled(NavLink)`
    text-decoration: none;
   
`;

const Main = styled.div`
    margin: auto;
    max-width: 1200px;
    color: rgba(16, 5, 41, 1);
    overflow: auto;
`;

const FlexRow = styled.div`
	display: flex;
	flex-direction: ${props => props.dir || 'row'};
	flex-wrap: wrap;
	width: ${props => props.width || '100%'};
	height: ${props => props.height || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;

const FlexChild = styled.div`
	width:  ${props => props.width || '25%'};
	box-sizing: border-box;
		   
	@media screen and (max-width: 1190px) {
		margin: 5px;
		min-width: 100%;
	}
`;

const TestTitle = styled.div`
    font-size: 34px;
    color: #4F9DA6;
    font-weight: bold;
    margin-bottom: 16px;
`;

const Title = styled.div`
    width: 100%;
    margin: 30px 0;
    font-size: ${props => props.size || '34px'};  
    color:rgba(79, 157, 166, 1);
    border-bottom: 1px solid rgba(220, 220, 220, 1);
`;
const Square = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #4F9DA6;

`;
const TestDescription= styled.div`
    font-size: 24px;
    color: #FFAD5A;
    margin-bottom: 16px;

`;
const PassingDescription = styled.div`
    font-size: 24px;
    color: #141218;
    margin-bottom: 16px;

`;
const TestDetails = styled.span`
    display: inline-block;
    margin-left: 8px;
    font-size: 16px;
`;
const TestDetailsValue = styled.span`
    display: inline-block;
    margin-left: 8px;
    margin-right:30px;
    font-size: 16px;
    color:#FFAD5A; 
`;

const Button = styled.button`
    display: block;
    margin: 32px 0 200px 0;
    padding: 16px 18px;
    border: 0;
    border-radius: 4px;
    background-color:rgba(255, 89, 89, 1);
	color: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    font-weight: bold;
    font-size: 20px;
    box-sizing: border-box;
    :hover {
        cursor: pointer;
    }
`;

class StartTest extends Component {
	state = {
        test: this.props.test,
        user: this.props.user,
    }

    componentDidUpdate(prevProps) {	
        if (this.props.test !== prevProps.test) {
            this.setState({test: this.props.test});
            console.log(this.state.test)
        }
        if (this.props.user !== prevProps.user ) {
            this.setState({ user: this.props.user });
        }
}
	render() {
       
		return(
            this.state.user && this.state.user.type === 'user' ?
            this.state.test &&
            <Main>
                <AllDiv>
                    <LinkDiv to={`/${this.state.user.firstName}${this.state.user.lastName}/start-test`}> My Account </LinkDiv> 
                        /{' '}
                    Start tests 
                </AllDiv>
                <Title>Start Test</ Title>
                    
                <FlexRow>
                    <FlexChild width={'146px'}>
                        Logo
                    </FlexChild>
                    <FlexChild width={'calc(100% - 354px)'}>
                        <TestTitle>{this.state.test.testTitle}</TestTitle>
                        <TestDescription>{this.state.test.description}</TestDescription>
                        <PassingDescription>
                            You can take the test once.
                            If you stop the test in the middle, you will get as much as you managed to score. 
                        </PassingDescription>
                        < Square />  
                        <TestDetails>Number of questions : </TestDetails>
                        <TestDetailsValue>{this.state.test.questions.length}</TestDetailsValue>
                        < Square />  
                        <TestDetails>Time : </TestDetails>
                        <TestDetailsValue>30 minutes</TestDetailsValue>
                        < Square />  
                        <TestDetails>Score : </TestDetails>
                        <TestDetailsValue>{this.state.test.totalScore} points</TestDetailsValue>
                        <TestLink to={`/${this.state.user.firstName}${this.state.user.lastName}/test/${this.state.test.id}`}>
                            <Button>START TEST ></Button>
                        </TestLink>
                    </FlexChild>
                </FlexRow>
        </Main>
        : <Redirect to='/authorization'/>
        );
	}
}

function mapStateToProps(state) {
	return {
		test: state.testPasser.testDetails,
	}
}
function mapDispatchToProps(dispatch) {
	return {
	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTest)