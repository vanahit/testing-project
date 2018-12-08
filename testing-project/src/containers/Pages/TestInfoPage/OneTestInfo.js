import React, {Component} from 'react';
import { NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { firebase } from '../../../firebase/firebase';
import { addUserTest } from '../../../store/actions/appAction';

const Main = styled.div`
    margin: auto;
    margin-bottom: 100px;
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
    margin: 30px 26px 26px 0;
    padding: 15px 20px;
    border: 0;
    border-radius: 4px;
    background-color: ${props => props.disabled ? '#4F9DA6' :'rgba(255, 89, 89, 1)'};
	color: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    font-weight: bold;
    font-size: 20px;
	box-sizing: border-box;
	: hover {
		cursor: ${props => props.disabled ? ''  : 'pointer' }
	}
`;

class OneTestInfo extends Component {

    add = (test) => {
       
		if (this.props.user && this.props.user.type === 'user') {
			let userUrl = this.props.user.id;
			firebase.database().ref(`user/${this.props.user.id}/tests`).once('value',  (snapshot)=> {
				if (snapshot.hasChild(`${test.id}`)) {
				
				} else {
					this.props.userTestAdded();
					this.props.addUserTest(test);
					let userRef = firebase.database().ref(`user/${userUrl}`);
					userRef.child('tests').child(`${test.id}`).set({...test, userScore: -1});
				}
			});
		} else {
			this.props.testAddClicked();
		}
	}
	render() {
        console.log(this.props.user)
		return(
           this.props.testInfo &&
            <Main>
               <Title>{ this.props.testInfo.title}</ Title>
                <FlexRow>
                    <FlexChild width={'146px'}>
                        Logo
                    </FlexChild>
                    <FlexChild width={'calc(100% - 354px)'}>
                        <TestTitle>{ this.props.testInfo.testTitle}</TestTitle>
                        <TestDescription>{this.props.testInfo.testType}</TestDescription>
                        <PassingDescription>
                             {this.props.testInfo.description}. 
                        </PassingDescription>
                        < Square />  
                        <TestDetails>Number of questions : </TestDetails>
                        <TestDetailsValue>{this.props.testInfo.questions.length}</TestDetailsValue>
                        < Square />  
                        <TestDetails>Time : </TestDetails>
                        <TestDetailsValue>{this.props.testInfo.testDuration} minutes</TestDetailsValue>
                        < Square />  
                        <TestDetails>Score : </TestDetails>
                        <TestDetailsValue>{this.props.testInfo.totalScore} points</TestDetailsValue>
                        
                        {
							    (this.props.user && this.props.user.type !== 'company') || !this.props.user 
								? <Button 
									onClick={() => this.add(this.props.testInfo)}
									disabled = {this.props.added ? true : false}>
									{this.props.added === true ? 'Added' : 'Add test'}
 								</Button>
								: ""
						}
                       
                    </FlexChild>
                </FlexRow>
            </Main>
        );
	}
}

function mapStateToProps(state) {
	return {
        test: state.testPasser.testDetails,
        passingTest: state.appReducer.passingTest,
	}
}
function mapDispatchToProps(dispatch) {
	return {
        addUserTest: test => dispatch(addUserTest(test)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OneTestInfo)