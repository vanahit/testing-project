import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import TestFinished from './TestFinished';
import TestPasser from './TestPasser';
import axios from 'axios';
import {addTest, deleteTest} from '../../store/actions/testPasser';


const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
	color: white;
	overflow: none;
`;

class TestPassPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			testEnd: false,
			testLoaded: false
		}
	}

	componentDidMount() {	
        axios.get('https://test-project-4ab6b.firebaseio.com/tests/-LS0j3a0GongklJjoPEw.json')
            .then((response) => {
				this.props.addTest(response.data);
				if (this.props.test) {
					this.setState({testLoaded: true})
				}
        	})	
    }

	testEnded = () => {
		this.setState({testEnd: true});
	}

	totalScore = (score) => {
		this.setState({totalScore: this.state.totalScore + score});
	}

	render() {
		return (
			<Main>
				{
					!this.state.testEnd && this.state.testLoaded &&
						<TestPasser 
							totalScore={this.totalScore}
							testEnded={this.testEnded}
						/>
				}
				{
					this.state.testEnd &&
						<TestFinished 
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
	}
}
function mapDispatchToProps(dispatch) {
	return {
		addTest: (test) => dispatch(addTest(test)),
		deleteTest: () => dispatch(deleteTest()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPassPanel)

