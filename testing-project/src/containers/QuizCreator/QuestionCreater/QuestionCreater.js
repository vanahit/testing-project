import React, { Component } from 'react';
import OneAnswerCreater from './OneAnswerCreater';
import styled from 'styled-components'
import {connect} from 'react-redux';
import {addQuestion} from '../../../store/actions/testCreater';

const RadioButton = styled.input`
		width:15px;
		height:15px;
`;
const Input = styled.input`
	margin: 5px;
	padding: 10px 5px;
	width: 80%;
	height: 10px;
	font-size: 12px;
`;

const Ul = styled.ul`
	margin:0;
	padding: 0;
	list-style: none;
	width: 100%;
`;
const Li = styled.li`

`;
const FlexContainer = styled.div`
	display: flex;
	margin: auto;
  margin-top: 5px;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  width: ${props => props.width + '%' || '100%'};
  flex-direction: ${props => props.dir || 'row'};
  box-sizing: border-box;
`;
const Button = styled.button`
	margin: 5px;
	font-size: 14px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid ${props => props.color  || ''};
  background-color: ${props => props.color || 'white'};
  width: ${props => props.width + 'px' || 'px'};
  height:${props => props.height + 'px' || '10px'};
`;
const TitleField = styled.textarea`
  rows: ${props => props.rows  || '4'};
  width: 100%;
`;
class QuestionCreater extends Component {
   	constructor(props) {
			super(props);
  		 this.state = {
				id: Date.now(),
				answers: [{id: Date.now(), title: '', isRight: false}, {id: Date.now() + 1, title: '', isRight: false}],
				isRight: 0,
				questionTitle: '',
				time: '',
				score: '',
				isEditing: false,
			 }
		}
	componentDidMount() {
    //this.answersListCreater();
  }
  addAnswer = () => {
   	let newAnswer = {id: Date.now(), title: '', isRight: false};
    this.setState({answers: this.state.answers.concat(newAnswer)});
  }
  isValid = (e) => {
  	switch (e.target.id) {
  		case 'score':
  			return	!e.target.value || e.target.value === 0 || e.target.setCustomValidity('Please input score of question');
  		case 'minutes':
  			return !e.target.value || e.target.value === 0 || 'Please input duration of question';
  		case 'title':
  			return !e.target.value || 'Please input title of question';
  		case 'radio':
  			return !e.target.value || 'Please input right answer of question';
  		default:
  			return !e.target.value || 'Please input answer';
  	}
	}
  inputsCountChangeHandler = (e) => {
      e.target.id === 'plus' && this.state.answers.length <= 4 && this.addAnswer();
   		e.target.id === 'minus' && this.state.answers.length >= 3 && this.setState({answers: this.state.answers.splice(1)});
      this.answersListCreater();
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
  deleteChosenAnswer = (id) => {
		if (this.state.answers.length > 2) {
			this.setState( {answers: this.state.answers.filter(answer => answer.id !== id) });
			this.state.isRight === id && this.setState({isRight: 0});
		}
  }
  submitHandler = (e) => {
  	e.preventDefault();
  	this.addQuestion();
  	this.clearFields();
  }
  clearWordFromSpaces = (word) => {
		return  word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
	}
	addQuestion = () => {
			this.props.addQuestion(this.state);
	}
	clearFields = () => {
		let answers = this.state.answers.map((answer, index) => {
			answer.id = Date.now() + index;
			answer.title = '';
			answer.isRight = false;
			return answer;
		})
		this.setState({
			id:  Date.now(),
			answers : answers,
			isRight: 0,
		  questionTitle: '',
		  time: '',
		  score: '',
		  isEditing: false,
		});
	}
	answersListCreater = () => {
		return ( 
			<Ul>
				{this.state.answers.map(input => (
					<Li key={input.id}>
						<FlexContainer >
							<RadioButton
								required
								type='radio'
								name='isRight' 
								value={input.id} 
								onChange={(e) => this.setState({isRight: +e.target.value})}
							/>
							<OneAnswerCreater
								id={input.id} 
								isRight={input.id === this.state.isRight ? true : false}
								getInputValue={this.getInputValue}
							/>
							<Button 
								width={30} 
								onClick={() => this.deleteChosenAnswer(input.id)}
								type='button'
							> 
								X 
							</Button>
						</FlexContainer>
					</Li>))}
			</Ul>
		)
	} 	  
    render() {
      return (
        <div>
           	<form onSubmit={this.submitHandler}>
							<FlexContainer dir={'column'} width={150}>
								<span>Question title</span>
								<TitleField
									required
									rows={2} 
									value={this.state.questionTitle}
									id='title'
									onChange={(e) => (this.setState( {questionTitle: e.target.value}))}
								/> 
							</FlexContainer>
          	<FlexContainer width={150}>
          		<FlexContainer dir='column' >
          			Input score of question
          			<Input 
          				required
          				type='number' 
          				min='0'
          				id='score'
          				placeholder='Input score of question'
          				value={this.state.score}
          				onChange={(e) => (this.setState( {score: +e.target.value}))}

          		/>
							</FlexContainer>
          	 		<FlexContainer dir='column' >
          			Input duration in minutes
          			<Input 
          				required
          				type='number' 
          				min='0'
          				id='minutes'  
          				placeholder='Input ending time of question'
          				value={this.state.time}
          				onChange={(e) => (this.setState( {time: +e.target.value}))}
          			/>
          	 	</FlexContainer>
          	  <FlexContainer  width={30}>
	              <span>Count of answers</span> 
	                <Button type='button' width={20} height={20} onClick={this.inputsCountChangeHandler} id='minus'> - </Button>
	                  {this.state.answers.length}
	                <Button type='button' width={20} height={20} onClick={this.inputsCountChangeHandler} id='plus'> + </Button>
	            </FlexContainer>
							
           	{this.answersListCreater()}
           	
            		
		        </FlexContainer>
		        <div><Button width={100}> Add answer </Button></div>
		      </form>
        
		    </div>
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
