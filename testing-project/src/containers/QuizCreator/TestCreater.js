import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionCreater from './QuestionCreater/QuestionCreater';
import {connect} from 'react-redux';
import {deleteQuestions} from '../../store/actions/testCreater';

const Ul = styled.ul`
	margin:0;
	padding: 0;
	list-style: none;
	width: 100%;
`;
const Li = styled.li`
	border-bottom: 1px solid grey
`;
const Modal= styled.div`
	width: 90%;
	height: 500px;
	background-color: rgba(255, 255, 255, 0.5);
	position: absolute;
	margin: auto;
	border: 1px solid black;
`;
const Div = styled.div`
	display: table-cell;
	padding: 10px;
	width: ${props => props.width + '%' || '100%'};
	text-align: ${props => props.align  || 'left'}
`;
const Select = styled.select`
	margin: 5px;
	width: 100px;
	height: 30px;
`;
const Input = styled.input`
	margin: 5px;
	padding: 10px 5px;
	width: 80%;
	height: 10px;
	font-size: 12px;
`;
const FlexContainer = styled.div`
  display: flex;
  word-break: break-word;
  margin: auto;
  padding: 0 10px;
  margin-top: 5px;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  width: ${props => props.width + '%' || '100%'};
  flex-direction: ${props => props.dir || 'row'};
  flex-wrap: wrap;
  box-sizing: border-box;
`;
const QuestionsDiv = styled.div`
  display: flex;
  margin: auto;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 14px;
  border-top: 1px solid grey;
  align-items: center;
  width: ${props => props.width + '%' || '200px'};
  flex-direction: ${props => props.dir || 'row'};
  flex-wrap: wrap;
  box-sizing: border-box;
`;
const Button = styled.button`
  margin: 5px;
  font-size: 14px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid ${props => props.color  || ''};
  background-color: ${props => props.color || 'white'};
  width: ${props => props.width + 'px' || '100px'};
  height:${props => props.height + 'px' || '10px'};
`;
const TitleField = styled.textarea`
  rows: ${props => props.rows  || '4'};
  width: 100%;
`;

class TestCreater extends  Component {
	constructor(props) {
		super(props);
		this.state = {id: Date.now(), testTitle: '', testDeadline: '', testType: '', company: '', isEdites: false}
	}
	componentDidMount() {
		fetch('https://testing-f6114.firebaseio.com/.json')
		.then(responce => console.log(responce.json()));
		
	}
	clearWordFromSpaces = (word) => {
		return  word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
	}
	postData = () => {
		this.setState ({
			...this.state,
			testTitle: this.clearWordFromSpaces(this.state.testTitle),
			testDeadline: Date(this.state.testDeadline),
			company: this.clearWordFromSpaces(this.state.company),
			question: this.props.questions,
		})
		this.setState({
			id: Date.now(),
			testTitle: '', 
			testDeadline: '',
			testType: '', 
			company: '', 
			isEdites: false
		})
	}
	selectBox = () => {
		const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return(
			<Select 
				required
				onChange={(e) => this.setState({testType: e.target.value})} 
				value={this.state.testType}>
				{languages.map((option, index) => (
					<option key={index + 1}> {option} </option>
				))}
			</Select>
		);
	
	}
	questionsListCreater = () => {
		return ( 
			<QuestionsDiv width={90}>
			<Ul>
				{this.props.questions.map((question, index) => (
					<Li key={question.id}>
						<Div width={84}>
							{this.props.questions[index].questionTitle}
						</Div>
						<Div width={100} align={'right'}>
							<Button 
								onClick={() => this.editChosenQuestion()}
								width={60} 
								type='button'
							> 
								edit
							</Button>
							<Button 
								onClick={() => this.deleteChosenQuestion(question.id)}
								width={60} 
								type='button'
							> 
								delete
							</Button>
						</Div>
					</Li>))}
			</Ul>
			</QuestionsDiv>
		)
	}
	editChosenQuestion = () => {
		return <Modal> <QuestionCreater /></Modal>
	} 
	submitHandler = (e) => {
		e.preventDefault();
		this.postData();
		this.props.deleteQuestions();
	}	  
	render() {
		return(
			<div>
			<form onSubmit={this.submitHandler}>
			<Div width={100}>
			<FlexContainer width={100} dir={'column'}>
				 <FlexContainer width={100} dir={'column'}>
					<span>Input title of Test</span>
						<TitleField
							required
							rows={2} 
							value={this.state.testTitle}
							onChange={(e) => {this.setState({testTitle: e.target.value})}}
						/>
					  
	          		</FlexContainer>
					  <FlexContainer width={100}>
						<FlexContainer dir='column' >
							Test type  
							{this.selectBox()}
						</FlexContainer>
						<FlexContainer dir='column' >
							Company name
							<Input 
								required
								type='text' 
								placeholder='Input company'
								value={this.state.company}
								onChange={(e) => {this.setState({company: e.target.value})}}
							/>
						</FlexContainer>
						<FlexContainer dir='column' >
							Test deadline
							<Input 
								required
								type='date' 
								placeholder='Input deadline of test'
								value={this.state.testDeadline}
								onChange={(e) => {this.setState({testDeadline: e.target.value})}}
								
							/>
						</FlexContainer>
						</FlexContainer>
	            </FlexContainer>
				</Div>
				<Div width={20}>
					{this.props.questions.length > 0 && <Button width={100}>Add Test</Button>} 	
				</Div>
			</form>
			<Div width={90}>
				<QuestionCreater />
			</Div>
			<Div width={20}></Div>	
			<FlexContainer dir={'column'} width={100}>
				<FlexContainer width={100}>
					{this.props.questions.length > 0 && this.questionsListCreater()}
				</FlexContainer>
			</FlexContainer>
		</div>
		
	);
}
}

function mapStateToProps(state) {
	console.log(state.test.questions);
  return {
	  questions: state.test.questions,
	}
}
function mapDispatchToProps(dispatch) {
  return {
	deleteQuestions: () => dispatch(deleteQuestions()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreater)
