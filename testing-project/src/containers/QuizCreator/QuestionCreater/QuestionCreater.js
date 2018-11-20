import React, { Component } from 'react';
import OneAnswerCreater from './OneAnswerCreater';
import styled from 'styled-components'
import {connect} from 'react-redux';
import {addQuestion} from '../../../store/actions/testCreater';

const Radio = styled.input`
  width: 24px;
  height: 24px;
  border: 1px solid #4F9DA6;
  background: #4F9DA6;
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
const Column = styled.td`
	padding: 0;
	width: ${props => props.width + 'px' || '1068'};
	min-width: ${props => props.minWidth + 'px' || '132'};
	vertical-align: ${props => props.verAlign  || 'top'};
	padding-bottom: 30px;
	box-sizing: border-box;
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

	@media screen and (max-width: 580px) {
		font-size: 12px;
	}
  ::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
	:-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}
`;
const AddAnswerDiv = styled.div`
	font-size: 14px;
	color: #4F9DA6;
`;
const Counter = styled.button`
	width: 44px;
	height: 40px;
	border: 1px solid #4F9DA6;
	background-color: white;
	border-top: 0; border-bottom: 0; 
	border-left: ${props => props.borderLeft + 'px' || '0'};
	border-right: ${props => props.borderRight + 'px' || '0'}; 
`;
const AnswersCount = styled.span`
	 display: inline-block;
	 text-align center;
	 width: 44px;
`;
const ButtonsDiv =  styled.div `
		border: 1px solid #4F9DA6;
		border-right: 0;
		border-left: 0;
`;
const Question = styled.div`
	margin-top: 15px;
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
			}
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
		e.persist();
		const newAnswer = {id: Date.now(), title: '', isRight: false};
		return new Promise((resolve, reject) => {
			switch (e.target.id) {
				case 'title':
				  this.setState({questionTitle: e.target.value});
					resolve(this.state.questionTitle);
					break;
				case 'score':
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
					e.target.id === 'plus' && this.state.answers.length <= 5 && 
					this.setState({answers: this.state.answers.concat(newAnswer)});
					resolve(this.state.answers);
					break;
				default:
			}
     }).then(item => {
			let updatedItem;
				switch (e.target.id) {
					case 'title':	updatedItem = this.state.questionTitle;	break;
					case 'score': updatedItem = this.state.score;	break;
					case 'isRight':	updatedItem = this.state.isRight;	break;
					case 'delete': updatedItem = this.state.answers; break;
					case 'minus':	updatedItem = this.state.answers;	break;
					case 'plus':	updatedItem = this.state.answers;	break;
					default:			updatedItem = this.state.answers;
				}
		    this.props.getQuestionValues(updatedItem, e.target.id, this.props.id);
    })
	}
	componentDidUpdate(prevState) {
	 if((prevState.isRight !== this.state.isRight) || (prevState.answers.length !== this.state.answers.length)) {
			 this.props.getQuestionValues(this.state.isRight, 'isRight', this.props.id);
			 this.props.getQuestionValues(this.state.answers, 'answers', this.props.id);
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
								id='isRight'
								onClick={(e) => this.updateQuestionValues(e)}
							/>
							<OneAnswerCreater
								count={index + 1}
								id = {input.id}
								isRight={input.id === this.state.isRight ? true : false}
								getInputValue={this.getInputValue}
							/>
							{this.state.answers.length > 2 && 
							<DeleteAnswer 
								width={30} 
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
            <table>
							<thead>
									<tr>
										<Column width={'1068'}>
													<QuestionDetails
														type='text' 
														placeholder={`${this.props.count}. Question Title`}
														value={this.state.questionTitle}
														id='title'
														onChange={(e) => this.updateQuestionValues(e)} 
													/>
										</Column>
										<Column minWidth={'132'} verAlign={'top'}>
											<QuestionDetails
												width={'100%'}
												type='number' 
												min='0' 
												placeholder="Score" 
												value={this.state.score}
												id='score'
												onChange={(e) => this.updateQuestionValues(e)} 
											/>
										</Column>
									</tr>
								</thead>
								<tbody>
									<tr>
									<Column width={'1068'}>
												{this.answersListCreater()}     
										</Column>
										<Column minWidth={'132'} verAlign={'top'} >
											<AddAnswerDiv>Add more answers</AddAnswerDiv>
											<ButtonsDiv>
												<Counter 
													type='button'
													id='minus'
													onClick={(e) => this.updateQuestionValues(e)}>
													-
												</Counter>
													<AnswersCount>{this.state.answers.length}</AnswersCount>
												<Counter 
													type='button'
													id='plus'
													onClick={(e) => this.updateQuestionValues(e)}>
														+
												</Counter>
											</ButtonsDiv>
										</Column>
								</tr>
							</tbody>
            </table>
        </Question>
	  );
  }
}
function mapStateToProps(state) {
  return {
   	questions: state.test.questions,
  }
}
function mapDispatchToProps(dispatch) {
  return {
   	addQuestion: (question) => dispatch(addQuestion(question)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreater)
