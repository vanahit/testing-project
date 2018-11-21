import React, { Component } from 'react';
import styled from 'styled-components';
import QuestionCreater from './QuestionCreater/QuestionCreater';
import { connect } from 'react-redux';
import {  } from '../../store/actions/testCreater';
import { firebase } from '../../firebase/firebase';

const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	overflow: auto;
`;
const Test = styled.div` 
	width: 100%;
	margin-bottom: 30px;
	border: 1px solid #D6D6D6;
	border-right: 0px;
	border-left: 0px;
`;
const TestCreaterLink = styled.div`
	margin: 30px 0;
	font-size: 14px;
`;
const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 30px 0;
	justify-content: space-between;
	align-items: center;
	width: ${props => props.width || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;
const Title = styled.div`
	flex: 50%;
    flex-shrink: 1;
	box-sizing: border-box;
`;
const Type = styled.div`
	flex: 25%;
	text-align: right;
	box-sizing: border-box;
`;
const Company = styled.div`
	flex: 25%;
	box-sizing: border-box;
`;
const TestDetails = styled.input`
	min-width: ${props => props.minWidth || 'calc(100% - 16px)'};
	width: ${props => props.width || 'calc(100% - 16px)'};
	height: 60px;
	padding-left: 16px;
	color: rgba(79, 157, 166, ${props => props.opacity || '1'});
	font-size: 24px;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box;

	:disabled {
		background-color: white;
	}
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
`;
const Select = styled.select`
	min-width: calc(100% - 8px);
	height: 60px;
	padding-left: 16px;
	color: #4F9DA6;
	font-size: 24px;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	
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
`;
const Description = styled.textarea`
	width: 100%;
	height: 120px;
	padding: 16px;
	color: #4F9DA6;
	border: 1px solid #4F9DA6;
	font-size: 24px;

	@media screen and (max-width: 580px) {
		font-size: 12px;
	}
	::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
	:-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}
`;
const AddButton = styled.button`
	margin-bottom: 30px;
	width: 234px;
	height: 60px;
	border-radius: 4px;
	border: 0px;
	background-color: #4F9DA6;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
	color: white;
	font-size: 24px;
`;
const AddTest = styled.div`
	width: 100%;
	text-align: center;
`;

class TestCreater extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			id: Date.now(),
			testTitle: '',
			description: '',
			testDeadline: '',
			testType: '',
			company: '',
			time: '',
			passScore: '',
			totalScore: '',
			isEditing: false,
			isValid: '',
		}
	}
	componentDidMount() {
	}
	getQuestionValues = (item, type, id) => {
		let questions = this.state.questions.map(question => {
			console.log(question.id); console.log(this.props.id);
			if (question.id === id) {
				console.log('yesss there is no problem')
				type === 'title' && (question.questionTitle = this.clearWordFromSpaces(item));
				type === 'isRight' && (question.isRight = item);
				type === 'answers' && (question.answers = item);
				type === 'score' && (question.score = item);
			}
			return question;
		})
		this.setState({ questions: questions });
	}
	selectBox = () => {
		const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<Select
				minWidth={'calc(100% - 8px)'}
				required
				onChange={(e) => this.setState({ testType: e.target.value })}
				value={this.state.testType}>
				{
					languages.map((option, index) => (
						<option key={index + 1}> {option} </option>
					))}
			</Select>
		);
	}
	addQuestion = () => {
		let oneQuestion = {
			id: Date.now(),
			answers: [{ id: Date.now(), title: '', isRight: false }, { id: Date.now() + 1, title: '', isRight: false }],
			isRight: 0,
			questionTitle: '',
			time: '',
			score: '',
			isEditing: false,
		}
		this.setState({ questions: this.state.questions.concat(oneQuestion) })
	}
	clearWordFromSpaces = (word) => {
		return word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
	}
	postData = () => {
		let db = firebase.database();
			this.setState({
				...this.state,
				passers: 0,
				testTitle: this.clearWordFromSpaces(this.state.testTitle),
				testDeadline: Date(this.state.testDeadline),
				company: this.clearWordFromSpaces(this.state.company),
				description: this.clearWordFromSpaces(this.state.description),
				question: this.state.questions
			})
	
			db.ref('tests').push({ ...this.state });
	
			this.setState({
				questions: [],
				id: Date.now(),
				testTitle: '',
				description: '',
				testDeadline: '',
				testType: '',
				company: '',
				time: '',
				totalScore: '',
				passScore: '',
				isEditing: false,
			})
		
	}
	submitHandler = (e) => {
		e.preventDefault();
		this.postData();
	}
	isValid() {

	}
	componentDidUpdate (prevState) {

	}
	render() {
		return (
			<Main>
				<TestCreaterLink> Home / My Account / Test Create </TestCreaterLink>
				<form onSubmit={this.submitHandler}>
					<Test>
						<FlexRow width={'100%'}>
							<Title>
								<TestDetails
									required
									width={'calc(100% - 16px)'}
									type="text"
									placeholder="Test Title"
									value={this.state.testTitle}
									onChange={(e) => { this.setState({ testTitle: e.target.value }) }} />
							</Title>
							<Company>
								<TestDetails
									required
									minWidth={'calc(100% - 8px)'}
									type="text"
									placeholder="Company"
									value={this.state.company}
									onChange={(e) => { this.setState({ company: e.target.value }) }} />
							</Company>
							<Type> {this.selectBox()}  </Type>
						</FlexRow>
						<FlexRow width={'100%'}>
							<Description 
								placeholder="Description" 
								value={this.state.description}
								onChange={(e) => { this.setState({ description: e.target.value }) }} 
							/>
						</FlexRow>
						<FlexRow width={'100%'}>
							<div><TestDetails
								required
								width={'292px'}
								type='text'
								placeholder="Test Deadline"
								onFocus={(e) => e.target.type = 'date'}
								onChange={(e) => { this.setState({ testDeadline: e.target.value }) }} /></div>
							<div><TestDetails
								required
								width={'292px'}
								type='number' min="0"
								placeholder="Minutes"
								value={this.state.time}
								onChange={(e) => { this.setState({ time: e.target.value }) }} /></div>

							<div><TestDetails
								required
								width={'292px'}
								type='number'
								min="0" 
								placeholder="Total Score"  
								disabled 
								value={this.props.totalScore}/></div>
							<div><TestDetails
								width={'292px'}
								type='number'
								min="0"
								placeholder="Passing Score" value={this.state.passScore}
								onChange={(e) => { this.setState({ passScore: +e.target.value }) }} /></div>
						</FlexRow>
						<AddButton type='button' onClick={this.addQuestion}>ADD QUESTION</AddButton>
					</Test>
					{this.state.questions.length > 0 && this.state.questions.map((question, index) =>
						<QuestionCreater
							key={question.id + index}
							id={question.id}
							count={index + 1}
							getQuestionValues={this.getQuestionValues} />
					)}
					
					{this.state.questions.length > 0 && <AddTest>
						<AddButton  onClick={this.submitHandler}>CREATE TEST</AddButton></AddTest> }
				</form>
			</Main>
		);
	}

}

function mapStateToProps(state) {
	console.log(state.test.questions);
	return {
		totalScore: state.test.totalScore,
	}
}
function mapDispatchToProps(dispatch) {
	return {
	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreater)

