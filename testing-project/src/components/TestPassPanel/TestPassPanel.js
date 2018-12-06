import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import TestFinished from './TestFinished';
import TestPasser from './TestPasser';
import {deleteTest} from '../../store/actions/testPasser';
import {Redirect} from "react-router";
import { firebase } from '../../firebase/firebase';
import {Route, Switch} from "react-router-dom";
import User from '../../containers/Pages/User';

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
			console.log(this.state.test)
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
		// https://test-project-4ab6b.firebaseio.com/user/DvJ47mWkUQMXQezVRZDA6nWqTL53/tests/-LS0j3a0GongklJjoPEw/score
		this.setState({testEnd: true});
		console.log(this.props.userScore)
		if (this.state.user) {
			let testRef =  firebase.database().ref(`user/${this.state.user.id}/tests/${this.state.test.id}`);
			testRef.update({userScore: this.props.userScore});
		}

	}

	render() {
		return (
			this.state.user && this.state.user.type === 'user' ?
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
						<TestFinished 
							totalScore={this.state.totalScore}
						/>
				}
			</Main>
		: <Redirect to='/authorization'/>
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

