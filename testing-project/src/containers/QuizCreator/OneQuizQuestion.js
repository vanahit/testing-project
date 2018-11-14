import React, { Component } from 'react';
import styled from 'styled-components'
import css from 'styled-components';
import QuestionCreator from './QuestionCreator';

const Wrapper = styled.section`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
   
`;
const QuizAnswerTitle = styled.textarea`
	width: 700px;
	height:50px;
	border solid 2px grey;

`;

export default class OneQuizQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quizTitle:'',
			answers: [],
		}
		this.titleChangeHandler = this.titleChangeHandler.bind(this);
	}
	titleChangeHandler(e) {
		this.setState({ quizTitle: e.target.value});
	}
	
	render() {
		return (
			<Wrapper>
				<QuestionCreator />
			</Wrapper>
		);
	}
}
