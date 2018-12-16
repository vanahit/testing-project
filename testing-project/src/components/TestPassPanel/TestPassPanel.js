import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import TestFinished from './TestFinished';
import TestPasser from './TestPasser';
import {deleteTest, increaseUserScore} from '../../store/actions/testPasser';
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
		time: this.props.test.currentTime ? this.props.test.currentTime : this.props.test.testDuration * 60,
		currentIndex: this.props.test.currentQuestionIndex ? this.props.test.currentQuestionIndex : 0,
		totalScore: this.props.test.currentScore ? this.props.test.currentScore : 0,
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

	componentDidMount(){
		this.props.increaseUserScore(this.state.totalScore);
		window.addEventListener('beforeunload', this.updatePassingTest);
	}

	updatePassingTest = () => {
		console.log('unmounted');
		this.props.increaseUserScore(-this.props.userScore);
		let userTests = this.props.user.tests.filter(test => test.userScore >= 0);
		if (this.state.user) {
			let userTest =  firebase.database().ref(`user/${this.state.user.id}/tests/${this.state.test.id}`);
			userTest.child('currentScore').set( this.props.userScore);
			userTest.child('currentTime').set(this.state.time);
			userTest.child('currentQuestionIndex').set(this.state.currentIndex);

			if (this.state.time === 0 || this.state.currentIndex === this.props.test.questions.length - 1) {
				userTest.update({userScore: this.props.userScore});
				let testRef = firebase.database().ref(`tests/${this.props.test.id}`);
				userTest.child('currentScore').remove();
				userTest.child('currentTime').remove();
				userTest.child('currentQuestionIndex').remove();
				testRef.child(`passers`).child(`${this.props.user.id}`).set({...this.props.user, tests: userTests});
			}
		}
	}

	getTime = (time) => {
		this.setState({time: time});
	}

	getCurrentIndex = (index) => {
		this.setState({currentIndex: index});
	}

	componentWillUnmount() {
		this.updatePassingTest();
		window.removeEventListener('beforeunload', this.updatePassingTest);
	}
	render() {
		return (
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
						/>
				}
			</Main>
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

