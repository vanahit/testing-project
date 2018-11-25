import React, { Component } from 'react';
import OneAnswerCreater from './OneAnswerCreater';
import QuestionDeleteFlag from '../../../components/QuizCreater/QuestionDeleteFlag';
import RadioFlag from '../../../components/QuizCreater/RadioFlag';
import styled, {css} from 'styled-components'
import {connect} from 'react-redux';
import {increaseTotalScore, submittedFalse} from '../../../store/actions/testCreater';

const Radio = styled.input`
	margin: 5px;
	width: 22px;
	height: 22px;

	:before {
		width: 21px;
		height: 21px;
		border-radius: 15px;
		top: -1px;
		left: -1px;
		position: relative;
		background-color: white;
		content: '';
		display: inline-block;
		visibility: visible;
		border: 1px solid rgba(79, 157, 166, 1);
	}
	:checked:after {
		width: 11px;
		height: 11px;
		border-radius: 15px;
		top: -22px;
		left: 4px;
		position: relative;
		background-color: rgba(79, 157, 166, 1);
		content: '';
		display: inline-block;
		visibility: visible;
		border: 1px solid rgba(79, 157, 166, 1);
	}
`;
const DeleteQuestion = styled.button`
	position: absolute;
	right: 5px;
	top: -25px;
	color: rgba(230, 36, 22, 1);
	font-size: 24px;
	background-color: transparent;
	border: 0;	
`;
const DeleteAnswer = styled.button`
		margin-left: 8px;
		width: 40px;
		height: 40px;
		color:rgba(230, 36, 22, 1);
		font-size: 24px;
		background-color: white;
		border: 1px solid rgba(231, 231, 231, 1);
`;
const QuestionDetails = styled.input`
	width: ${props => props.width  || 'calc(100% - 16px)'};
	height: 60px;
	padding-left: 16px;
	color: #4F9DA6;
	font-size: 24px;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box; 
	transition: font-size 0.5s ease-in-out;
	
	@media screen and (max-width: 1190px) {
		margin-top: 5px;
		min-width: 100%;
	}
	@media screen and (max-width: 580px) {
		font-size: 12px;
	}
  ::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
	:-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}

	${props => props.invalid && css`
		font-size: 22px;
		color: rgba(185, 4, 46, 0.5);
    border-bottom: 1px solid rgba(185, 4, 46, 1);
    ::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
    ::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
    :-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
    :-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
  `}
`;

const AddAnswerDiv = styled.div`
	font-size: 14px;
	color: #4F9DA6;
`;
const ButtonsDiv = styled.div`
	display: flex;
	width: 132px;
`;
const ButtonsFlexChild = styled.div`
	flex:44px; 
	height: 44px; 
	line-height: 44px; 
	text-align: center; 
	border: 1px solid #4F9DA6;
`;
const CountFlexChild = styled.div`
	flex:44px; 
	height: 44px; 
	line-height: 44px; 
	text-align: center; 
	border: 1px solid #4F9DA6;
	border-right: 0;
	border-left: 0;
`;
const Question = styled.div`
	margin-top: 15px;
	position: relative;
`;
const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start; 
	margin: 30px 0;
	justify-content: space-between;
	width: ${props => props.width || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-wrap:  ${props => props.wrap || 'wrap'};
		min-width: 100%;
		max-width: 100%;
	}
`;
const FlexChild = styled.div`
	max-width:  ${props => props.maxWidth || '100%'};
	width: ${props => props.width || '100%'};
	box-sizing: border-box;
	@media screen and (max-width: 1190px) {
		margin-top: 5px;
		min-width: 100%;
	}
`;
class QuestionCreater extends Component {
   	constructor(props) {
			super(props);
  		 this.state = {
				id: this.props.id,
				answers: [{id: Date.now(), title: ''}, {id: Date.now() + 1, title: '',}],
				isRight: 0,
				questionTitle: '',
				score: '',
				invalid: false,
				closeOver: false,
			}
			
	}
	getInputValue = (title, id) => {
    	let answers = this.state.answers.map(answer => {
			if (answer.id === id) {
				answer.title = this.clearWordFromSpaces(title);
			} 
			return answer; 
		})
		this.setState({answers: answers});
	}

    clearWordFromSpaces = (word) => {
		return  word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
	}

	scoreHandler = (e) => {
		let score = 1;
		if (e.target.value < 0) {
			score = +e.target.value * (-1);
		} else if (e.target.value > 0) {
			score = +e.target.value;
		} else {
			score = '';
		}
		this.props.increaseTotalScore((score - this.state.score));
		this.setState({score:  score});
	}

	answersCountHandler =(e, id='') => {
		if (e.target.id === 'minus') {
			if (this.state.answers.length > 2) {
				this.setState({answers: this.state.answers.splice(1)});
			} 
		}
		if (e.target.id === 'plus') {
			let newAnswer = {id: Date.now(), title: '', isRight: false};
			if (this.state.answers.length < 5) {
				this.setState({answers: this.state.answers.concat(newAnswer)});
			}
		}
		if (e.target.id === 'delete') {
			if (this.state.answers.length > 2) {
				this.setState( {answers: this.state.answers.filter(answer => answer.id !== id) });
				this.state.isRight === id && this.setState({isRight: 0});
			}
		}
	}

	updateQuestionValues = () => {
		console.log(this.props.id)
		this.getInputValue();
		let state = {
			questionTitle: this.clearWordFromSpaces(this.state.questionTitle),
			score: this.state.score,
			answers: this.state.answers,
			isRight: this.state.isRight,
		}
		this.isQuestionValid();
		this.props.getQuestionValues(this.props.id, state);
	}

	checkInputValidation = (inputName) => {
		if (inputName === 'title') {
			return  (this.props.submitted && !this.state.questionTitle)
				? `${this.props.count}. Fill Question Title` 
				: `${this.props.count}. Question Title`;
		}
		if (inputName === 'score') {
			return (this.props.submitted && !this.state.score) 
				? `Fill Score` 
				: `Score`;
		}
	}

	isFilled = (inputValue) => {
		return this.props.submitted && !inputValue ? true : false;
	}

	isQuestionValid = () => {
		if (this.state.isRight && this.state.questionTitle && this.state.score) {
			this.props.isQuestionValid(true)

		} else {
			this.props.isQuestionValid(false);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.submitted && 
			((prevProps.submitted !== this.props.submitted)
			|| (prevState.questionTitle !== this.state.questionTitle) 
			|| (prevState.score !== this.state.score) 
			|| (prevState.isRight !== this.state.isRight)
			|| (prevState.answers.length !== this.state.answers.length))) {
		
			this.isQuestionValid();
			this.updateQuestionValues() ;
		}
	}

	answersListCreater = () => {
		return ( 
			this.state.answers.map((input, index) => (
				<div key={input.id}>
					<Radio
						type='radio'
						name={`question${this.props.id}`} 
						value={input.id} 
						onClick={(e) => this.setState({isRight: +e.target.value})}
					/>
					<OneAnswerCreater
						isAnswerValid={this.props.isAnswerValid}
						valid={this.props.answerValid}
						count={index + 1}
						id = {input.id}
						getInputValue={this.getInputValue}
					/>
					{this.state.answers.length > 2 && 
					<DeleteAnswer 
						type='button'
						id='delete'
						onClick={(e) => this.answersCountHandler(e, input.id)}
					>
						X 
					</DeleteAnswer>}
				</div>))
		);
	} 	  
    render() {
      return (
		<Question>
			<FlexRow width={'98%'}>
				<FlexChild width={'1068px'}>
					{this.state.closeOver && <QuestionDeleteFlag count={this.props.count}/>}
					{!this.state.isRight && this.props.submitted && <RadioFlag count={this.props.count}/>}
					<DeleteQuestion 
						type='button'
						onMouseOver= {()=> this.setState({closeOver: true})}
						onMouseOut= {()=> this.setState({closeOver: false})}
						onClick= {() => this.props.deleteQuestion(this.props.id)}	
					> X  
					</DeleteQuestion>
					<QuestionDetails
						type='text' 
						placeholder={this.checkInputValidation('title')}
						value={this.state.questionTitle}
						invalid = {this.isFilled (this.state.questionTitle)}
						onChange={(e) => this.setState({questionTitle: e.target.value})} 
					/>
					</FlexChild>
					<FlexChild width={'132px'} verAlign={'top'}>
						<QuestionDetails
							width={'100%'}
							type='number' 
							placeholder= {this.checkInputValidation('score')}
							value={this.state.score}
							invalid = {this.isFilled(this.state.score)}
							onChange={this.scoreHandler} 
						/>
					</FlexChild>
				</FlexRow>
				<FlexRow width={'98%'} wrap={'wrap-reverse'}>
					<FlexChild maxWidth={'1060px'}>
						{this.answersListCreater()}     
					</FlexChild>
					<FlexChild width={'140px'} verAlign={'top'} >
						<AddAnswerDiv>Add more answers</AddAnswerDiv>
						<ButtonsDiv>
							<ButtonsFlexChild 
								type='button'
								id='minus'
								onClick={this.answersCountHandler}>
									-
							</ButtonsFlexChild>							
							<CountFlexChild>{this.state.answers.length}</CountFlexChild>
							<ButtonsFlexChild 
								type='button'
								id='plus'
								onClick={this.answersCountHandler}>
									+
							</ButtonsFlexChild>
						</ButtonsDiv>
					</FlexChild>						
				</FlexRow>			
        	</Question>
	    );
  	}
}
function mapStateToProps(state) {
  return {
	 totalScore: state.test.totalScore,
	 submitted: state.test.submitted,
  }
}
function mapDispatchToProps(dispatch) {
  return {
		increaseTotalScore: (score) => dispatch(increaseTotalScore(score)),
		submittedFalse: () => dispatch( submittedFalse()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreater)
