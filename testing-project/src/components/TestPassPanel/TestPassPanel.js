import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import TestFinished from './TestFinished';
import TestPasser from './TestPasser';
import {deleteTest} from '../../store/actions/testPasser';
import {Redirect} from "react-router";
import { firebase } from '../../firebase/firebase';


const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
	color: white;
	overflow: none;
`;

class TestPassPanel extends Component {
	state = {
		testEnd: false,
		test: this.props.test,
		user: this.props.user,
		totalScore: 0,
	}
	componentDidUpdate(prevProps) {	
        if (this.props.test !== prevProps.test) {
			this.setState({test: this.props.test});
		}

		if (this.props.user !== prevProps.user ) {
            this.setState({ user: this.props.user });
        }
    }

	testEnded = () => {
		this.setState({testEnd: true});
	}

	totalScore = (score) => {
		this.setState({totalScore: this.state.totalScore + score});
	}

	componentWillUnmount() {
		this.setState({testEnd: true});
		let userTests = this.props.user.tests.filter(test => test.userScore >= 0);
		if (this.state.user) {
			let userTest =  firebase.database().ref(`user/${this.state.user.id}/tests/${this.state.test.id}`);
			userTest.update({userScore: this.props.userScore});
			let testRef = firebase.database().ref(`tests/${this.props.test.id}/passers`);
			testRef.child(`${this.props.user.id}`).set({...this.props.user, tests: userTests});
		}
	}

	render() {
		return (
			<Main>
				{
					!this.state.testEnd && this.state.test &&
						<TestPasser 
							totalScore={this.totalScore}
							testEnded={this.testEnded}
							test={this.state.test}
						/>
				}
				{
					this.state.testEnd &&
						<TestFinished user={this.props.user}
							totalScore={this.state.totalScore}
						/>
				}
			</Main>
		);
	}
}

function mapStateToProps(state) {
	return {
		test: state.testPasser.testDetails,
		userScore: state.testPasser.userScore,
	}
}
function mapDispatchToProps(dispatch) {
	return {
		deleteTest: () => dispatch(deleteTest()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPassPanel)

