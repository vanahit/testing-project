import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import TestFinished from './TestFinished';
import TestPasser from './TestPasser';
import { deleteTest, increaseUserScore } from '../../store/actions/testPasser';
import { firebase } from '../../firebase/firebase';
import { Redirect } from 'react-router-dom';
import Loader from '../Loader';

const Main = styled.div`
	margin: auto;
	margin-top: 190px;
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
		time: this.props.test.currentTime ? this.props.test.currentTime : this.props.test.testDuration * 60,
		currentIndex: this.props.test.currentQuestionIndex ? this.props.test.currentQuestionIndex : 0,
		totalScore: this.props.test.currentScore ? this.props.test.currentScore : 0,
		unmounted: false
	}

	testEnded = () => {
		this.setState({ testEnd: true });
	}

	totalScore = (score) => {
		this.setState({ totalScore: this.state.totalScore + score });
	}

	componentDidMount() {
		this.props.increaseUserScore(this.state.totalScore);
		window.addEventListener('beforeunload', this.updatePassingTest);
	}

	updatePassingTest = () => {

		if (this.props.user) {
			this.props.increaseUserScore(-this.props.userScore);
			let userTests = this.props.user.tests.filter(test => test.userScore >= 0);

			let userTest = firebase.database().ref(`user/${this.state.user.id}/tests/${this.state.test.id}`);
			userTest.child('currentScore').set(this.props.userScore);
			userTest.child('currentTime').set(this.state.time);
			userTest.child('currentQuestionIndex').set(this.state.currentIndex);

			if (this.state.testEnd) {
				userTest.update({ userScore: this.props.userScore });
				let testRef = firebase.database().ref(`tests/${this.props.test.id}`);
				userTest.child('currentScore').remove();
				userTest.child('currentTime').remove();
				userTest.child('currentQuestionIndex').remove();
				testRef.child(`passers`).child(`${this.props.user.id}`).set({ ...this.props.user, tests: userTests });

			}
		}

	}

	getTime = (time) => {
		this.setState({ time: time });
	}

	getCurrentIndex = (index) => {
		this.setState({ currentIndex: index });
	}

	componentWillUnmount() {
		this.setState({ unmounted: true });
		this.updatePassingTest();

	}
	render() {
		return (
			this.state.user && this.state.user.type === 'user' ?
				this.state.test ?
					<Main>
						{
							!this.state.testEnd && this.state.test &&
							<TestPasser
								getCurrentIndex={this.getCurrentIndex}
								getTime={this.getTime}
								user={this.state.user}
								totalScore={this.totalScore}
								testEnded={this.testEnded}
								test={this.props.test}
								time={this.state.time}
							/>
						}
						{
							this.state.testEnd &&
							<TestFinished user={this.props.user}
								totalScore={this.state.totalScore}
								test={this.props.test}
							/>
						}
					</Main>
					: <Loader />
				: <Redirect to='/tests' />
		);
	}
}

function mapStateToProps(state) {
	return {
		userScore: state.testPasser.userScore,
	}
}
function mapDispatchToProps(dispatch) {
	return {
		deleteTest: () => dispatch(deleteTest()),
		increaseUserScore: (score) => dispatch(increaseUserScore(score)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPassPanel)

