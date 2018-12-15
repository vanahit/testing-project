import React, { Component } from 'react';
import styled from 'styled-components'
import js_svg from '../../images/typeIcons/js.svg';
import cplus_svg from '../../images/typeIcons/cplus.svg';
import php_svg from '../../images/typeIcons/php.svg';
import react_svg from '../../images/typeIcons/react.svg';
import css_svg from '../../images/typeIcons/css.svg';
import sharp_svg from '../../images/typeIcons/csharp.svg';
import non_svg from '../../images/typeIcons/non-type.svg';
import html_svg from '../../images/typeIcons/html.svg';
import { connect } from 'react-redux';
import { addUserTest } from '../../store/actions/appAction';
import { firebase } from '../../firebase/firebase';
import { NavLink } from "react-router-dom";

const TestBlock = styled.div`
	position: relative;
	text-decoration: none;
	display: block;
	width: 100%;
	border: 1px solid rgba(220, 220, 220, 1);
	border-radius: 4px;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
	box-sizing: border-box;
`;

const Details = styled.div`
	padding: 16px;
`;

const TestTitle = styled.div`
	font-size: 20px;
	color: #4F9DA6;
	font-weight: bold;
	margin-bottom: 8px;
`;

const Company = styled.div`
	font-size: 20px;
	color: #FFAD5A;
	font-weight: bold;
	margin-bottom: 8px;
`;

const Data = styled.span`
	text-decoration: none;
	font-size: 20px;
	color: #4F9DA6;
	margin-bottom: 8px;
`;
const PassersLink = styled(NavLink)`
	text-decoration: underline;
	font-size: 24px;
	font-weight: bold;
	color: #4F9DA6;
	margin-bottom: 8px;
`;
const DataTitle = styled.div`
	font-size: 20px;	
	color: black;
	margin-bottom: 8px;
`;

const Button = styled.button`
    padding: 10px 15px;
    border: 0;
    border-radius: 4px;
    background-color: ${props => props.color || 'rgba(255, 89, 89, 1)'};
	color: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    font-weight: bold;
    font-size: 20px;
	box-sizing: border-box;
	: hover {
		cursor: ${props => props.disabled ? ''  : 'pointer' }
	}
`;
const Img = styled.img`
	margin: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
`;
const Flex = styled.div`
	margin: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const DetailsLink = styled(NavLink)`
	font-size: 20px;
	text-decoration: underline;
	color:#4F9DA6;
	: hover {
		cursor: pointer;
		
	} 
`;


class TestComponent extends Component {
	state = {
		testExists: false,
	}

	convertDate = (date) => {
		let today = new Date(date);
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}
		return today = dd + '/' + mm + '/' + yyyy;
	}

	chooseImg = () => {
		switch (this.props.test.testType) {
			case 'JavaScript':
				return js_svg;
			case 'PHP':
				return php_svg;
			case 'C#':
				return sharp_svg;
			case 'React':
				return react_svg;
			case 'HTML':
				return html_svg;
			case 'CSS':
				return css_svg;
			case 'C++':
				return cplus_svg;
			default:
				return non_svg;
		}
	}


	add = (test) => {
		if (this.props.user && this.props.user.type === 'user') {
			let userUrl = this.props.user.id;
			firebase.database().ref(`user/${this.props.user.id}/tests`).once('value', (snapshot) => {
				if (snapshot.hasChild(`${test.id}`)) {

				} else {
					this.props.userTestAdded();
					this.props.addUserTest(test);
					let userRef = firebase.database().ref(`user/${userUrl}`);
					userRef.child('tests').child(`${test.id}`).set({ ...test, userScore: -1 });
				}
			});
		} else {
			this.props.testAddClicked();
		}
	}

	checkIfAdded = (test) => {
		if (this.props.user && this.props.user.tests) {
			for (let i = 0; i < this.props.user.tests.length; i++) {
				if (test.id === this.props.user.tests[i].id) {
                    if (this.props.user.tests[i].userScore < 0)  {
                        return 'added';
                    } else {
                        return 'passed';
                    }
				} 
            }
            
			return false;
		}
	}
	
	render() {
		let test = this.props.test;
		return (
			<>
				<TestBlock>
					<Img src={this.chooseImg()} />
					<Details>
						<TestTitle>
							{test.testTitle}
						</TestTitle>
						<Company>
							{test.company}
						</Company>
						<DataTitle>
							Passes: {' '}
							<PassersLink to={`/${test.company}/test${test.id}/passers`}>
								{test.passers ? test.passers.length : 0}
							</PassersLink>
						</DataTitle>
						<DataTitle>
							Deadline:{' '}
							<Data>
								{this.convertDate(test.testDeadline)}
							</Data>
						</DataTitle>
					</Details>
					<Flex >
						<DetailsLink to={`/test-info-page/${test.id}`}>
							<span>View Details</span>
						</DetailsLink>
						{
                                (this.props.user && this.props.user.type !== 'company') || !this.props.user ?
                                    <>
                                        {!this.checkIfAdded(test)  &&
                                            <Button 
                                                onClick={() => this.add( test )}>
                                                Add test >  
                                            </Button>
                                        }
                                        {
                                        this.checkIfAdded(test) === 'added' &&
                                        
                                            <Button 
                                                color={'#FFAD5A'}
                                                onClick={() => this.add( test )}>
                                                Pass test > 
                                            </Button>
                                        }
                                        {
                                        this.checkIfAdded(test) === 'passed' &&
                                            <Button 
                                                color={'#4F9DA6'}
                                                disabled
                                                onClick={() => this.add( test )}>
                                                
                                                Passed 
                                            </Button>
                                        }
                                    </>
                                    : ""
						}
					</Flex>
				</TestBlock>
			</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addUserTest: test => dispatch(addUserTest(test)),
	}
}

export default connect(null, mapDispatchToProps)(TestComponent)
