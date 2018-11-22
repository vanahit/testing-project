import React, { Component } from 'react';
import OneAnswerCreater from './OneAnswerCreater';
import styled, {css} from 'styled-components'
import {connect} from 'react-redux';
import {increaseTotalScore, submittedFalse} from '../../../store/actions/testCreater';

const Radio = styled.input`
  width: 21px;
  height: 21px;

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
				top: -23px;
				left: 4px;
				position: relative;
				background-color: rgba(79, 157, 166, 1);
				content: '';
				display: inline-block;
				visibility: visible;
				border: 1px solid rgba(79, 157, 166, 1);
		}
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
	transition: font-size 1s ease-in-out;
	
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
		font-size: 16px;
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

const DeleteQuestion = styled.button`
		position: absolute;
		right: 0px;
		top: -20px;
		color:rgba(230, 36, 22, 1);
		font-size: 24px;
		background-color: transparent;
		border: 0;
`;
const DeleteAnswerText = styled.div`
		position: absolute;
		padding: 5px 10px;
		right: 30px;
		top: -30px;
		color:rgba(230, 36, 22, 1);
		font-size: 14px;
		background-color: rgba(79, 157, 166, 0.2);
		border-radius: 4px;
		
`; 
const RadioText = styled.div`
		position: absolute;
		padding: 5px 10px;
		left: 2px;
		top: 150px;
		color:rgba(230, 36, 22, 1);
		font-size: 14px;
		background-color: rgba(79, 157, 166, 0.2);
		border-radius: 4px;
		
`;
const Trinagle = styled.div`
		position: absolute;
		top: -19px;
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 20px solid rgba(79, 157, 166, 0.2);
`;

class QuestionCreater extends Component {
   	constructor(props) {
			super(props);
  		 this.state = {
				id: this.props.id,
				answers: [{id: Date.now(), title: '', isRight: false}, {id: Date.now() + 1, title: '', isRight: false}],
				isRight: 0,
				questionTitle: '',
				score: '',
				invalid: false,
				submitted: this.props.submitted,
				closeOver: false,
			}
			this.validatedItemsCount = 0; 
	}
	getInputValue = (title, id, isRight) => {
    let answers = this.state.answers.map(answer => {
      if (answer.id === id) {
        answer.title = this.clearWordFromSpaces(title);
        answer.isRight = isRight; 
      } 
      return answer; 
		})
		this.setState({answers: answers});
	}
	
  clearWordFromSpaces = (word) => {
		return  word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
	}
	updateQuestionValues = (e, id = '') => {
		let updatedItem;
		e.persist();
		const newAnswer = {id: Date.now(), title: '', isRight: false};
		return new Promise((resolve, reject) => {
			switch (e.target.id) {
				case 'title':
				  this.setState({questionTitle: e.target.value});	resolve(this.state.questionTitle);
					break;
				case 'score':
					this.props.increaseTotalScore(-this.state.score);
					this.setState({score: +e.target.value});
					resolve(this.state.score);
					break;
				case 'isRight':
				  this.setState({isRight: +e.target.value});
					resolve(this.state.isRight);
					break;
				case 'delete':
					if (this.state.answers.length > 2) {
						this.setState( {answers: this.state.answers.filter(answer => answer.id !== id) });
						this.state.isRight === id && this.setState({isRight: 0});
						resolve(this.state.answers);
					}
					break;
				case 'minus':
					e.target.id === 'minus' && this.state.answers.length >= 3 && 
					this.setState({answers: this.state.answers.splice(1)});
					resolve(this.state.answers);
					break;
				case 'plus':
					this.props.submittedFalse();
					e.target.id === 'plus' && this.state.answers.length < 5 && 
					this.setState({answers: this.state.answers.concat(newAnswer)});
					resolve(this.state.answers);
					break;
				default:
			}
     }).then(item => {
				switch (e.target.id) {
					case 'title':	updatedItem = this.state.questionTitle;	break;
					case 'score': 
						updatedItem = this.state.score;	
						this.props.increaseTotalScore((updatedItem));
						break;
					case 'isRight':	updatedItem = this.state.isRight;	break;
					case 'delete': updatedItem = this.state.answers; break;
					case 'minus':	updatedItem = this.state.answers;	break;
					case 'plus':	updatedItem = this.state.answers;	break;
					default:			updatedItem = this.state.answers;
				}
				this.isQuestionValid();
			  this.props.getQuestionValues(updatedItem, e.target.id, this.props.id);
    })
	}
	checkInputValidation = (inputName) => {
		let placeholderText = '';
		switch (inputName) {
			case 'title' :
				placeholderText = (this.props.submitted && !this.state.questionTitle) 
					? `${this.props.count}. Fill Question Title` 
					: `${this.props.count}. Question Title`;
					break;
			case 'score' :
				placeholderText = this.props.submitted && !this.state.score 
					? `Fill Score` 
					: `Score`;
					break;
			default:
		}
			return placeholderText;
	}
	isFilled = (inputValue) => {
		return this.props.submitted && !inputValue ? true : false;
	}
	isQuestionValid = () => {
		(this.state.isRight && this.state.questionTitle && this.state.score && this.props.submitted) 
		 ? this.props.isQuestionValid(true) : this.props.isQuestionValid(false);
	}
	componentDidUpdate(prevProps, prevState) {
	 if((prevState.isRight !== this.state.isRight) || (prevState.answers.length !== this.state.answers.length)) {
			this.props.getQuestionValues(this.state.isRight, 'isRight', this.props.id);
			this.props.getQuestionValues(this.state.answers, 'answers', this.props.id);
		 }
		 prevProps.submitted !== this.props.submitted && this.isQuestionValid();
	}
	answersListCreater = () => {
		return ( 
				this.state.answers.map((input, index) => (
						<div key={input.id}>
								<Radio
									type='radio'
									name={`question${this.props.id}`} 
									value={input.id} 
									id='isRight'
									onClick={(e) => this.updateQuestionValues(e)}
							/>
							<OneAnswerCreater
								isAnswerValid={this.props.isAnswerValid}
								valid={this.props.answerValid}
								count={index + 1}
								id = {input.id}
								isRight={input.id === this.state.isRight ? true : false}
								getInputValue={this.getInputValue}
							/>
							{this.state.answers.length > 2 && 
							<DeleteAnswer 
								type='button'
								id='delete'
								onClick={(e) => this.updateQuestionValues(e, input.id)}
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
												{this.state.closeOver && <DeleteAnswerText >Delete question {this.props.count} </DeleteAnswerText>}
												{!this.state.isRight && this.props.submitted && <RadioText>Please choose one as right<Trinagle></Trinagle></RadioText>}
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
												id='title'
												name ='question title'
												onChange={(e) => this.updateQuestionValues(e)} 
											/>
										</FlexChild>
										<FlexChild width={'132px'} verAlign={'top'}>
											<QuestionDetails
												width={'100%'}
												type='number' 
												min='0'
												placeholder= {this.checkInputValidation('score')}
												value={this.state.score < 0 ? (-1 * this.state.score) : this.state.score}
												invalid = {this.isFilled(this.state.score)}
												id='score'
												onChange={(e) => this.updateQuestionValues(e)} 
											/>
										</FlexChild>
								</FlexRow>
								<FlexRow  width={'98%'} wrap={'wrap-reverse'}>
									<FlexChild maxWidth={'1060px'}>
												{this.answersListCreater()}     
									</FlexChild>
									<FlexChild width={'140px'} verAlign={'top'} >
										<AddAnswerDiv>Add more answers</AddAnswerDiv>
										<ButtonsDiv>
												<ButtonsFlexChild 
													type='button'
													id='minus'
													onClick={(e) => this.updateQuestionValues(e)}>
													-
												</ButtonsFlexChild>
													<CountFlexChild>{this.state.answers.length}</CountFlexChild>
												<ButtonsFlexChild 
													type='button'
													id='plus'
													onClick={(e) => this.updateQuestionValues(e)}>
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
