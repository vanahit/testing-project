import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import QuestionCreater from './QuestionCreater/QuestionCreater';
import { connect } from 'react-redux';
import {submittedFalse, submittedTrue} from '../../store/actions/testCreater';
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
const FlexChild = styled.div`
	width:  ${props => props.width || '25%'};
	   box-sizing: border-box;
	   
	@media screen and (max-width: 1190px) {
		min-width: 100%;
	}
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

	${props => props.invalid && css`
		font-size: 24px;
		color: rgba(185, 4, 46, 0.5);
		border-bottom: 1px solid rgba(185, 4, 46, 1);
		::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
		::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
		:-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
		:-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
	`}
`;
const Select = styled.select`
	width: calc(100% - 8px);
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

	${props => props.invalid && css`
		font-size: 24px;
		color: rgba(185, 4, 46, 0.5);
    border-bottom: 1px solid rgba(185, 4, 46, 1);
    ::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
    ::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
    :-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
    :-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
  `}
	
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
const DeleteQuestion = styled.button`
	margin-left: 8px;
	width: 40px;
	height: 40px;
	color:rgba(230, 36, 22, 1);
	font-size: 24px;
	background-color: white;
	border: 1px solid rgba(231, 231, 231, 1);
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
				width={'calc(100% - 8px)'}
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
		this.props.submittedFalse();
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
				testDuration: '',
				totalScore: '',
				passScore: '',
				isEditing: false,
			})
		
	}
	submitHandler = (e) => {
		e.preventDefault();
		this.props.submittedTrue();
		this.state.isValid && this.postData();
	}
	checkValidation = (inputName) => {
		let placeholderText = '';
		switch (inputName) {
			case 'title' :
				placeholderText = (this.props.submitted && !this.state.testTitle) ?  `Fill Test Title` : `Test Title`;	break;
			case 'company' :
				placeholderText = this.props.submitted && !this.state.company ? `Fill company` : `Company`;	break;
			case 'description' :
				placeholderText = this.props.submitted && !this.state.description 
					? `Fill description of test/n  its complexity , target audience etc` : `Description`; 	break;
			case 'deadline' :
				placeholderText = this.props.submitted && !this.state.testDeadline ? `Fill deadline of test` : `Deadline`;	break;
			case 'duration' :
				placeholderText = this.props.submitted && !this.state.testDuration ? `Fill test duration` : `Test Duration`;	break;
			case 'score' :
				placeholderText = this.props.submitted && !this.state.passScore ? `Fill passing score` : `Passing Score`; break;
			default:
		}
		return placeholderText;
	}
	isValid = (inputValue) => {
		return this.props.submitted && !inputValue ? true : false;
	}
	render() {
		return (
			<Main>
				<TestCreaterLink> Home / My Account / Test Create </TestCreaterLink>
				<form onSubmit={this.submitHandler}>
					<Test>
						<FlexRow>
							<FlexChild width={'50%'}>
								<TestDetails
									width={'calc(100% - 16px)'}
									type="text"
									placeholder={this.checkValidation('title')}
									value={this.state.testTitle}
									onChange={(e) => { this.setState({ testTitle: e.target.value }) }} 
									invalid = {this.isValid(this.state.testTitle)} 
								/>
							</FlexChild>
							<FlexChild width={'25%'}>
								<TestDetails
									width={'calc(100% - 8px)'}
									type="text"
									placeholder={this.checkValidation('company')}
									value={this.state.company}
									onChange={(e) => { this.setState({ company: e.target.value }) }}
									invalid = {this.isValid(this.state.company)} 
								/>
							</FlexChild>
							<FlexChild width={'25%'}> {this.selectBox()}  </FlexChild>
						</FlexRow>
						<FlexRow width={'100%'}>
							<Description 
								placeholder={this.checkValidation('description')} 
								value={this.state.description}
								onChange={(e) => { this.setState({ description: e.target.value }) }} 
								invalid = {this.isValid(this.state.description)}
							/>
						</FlexRow>
						<FlexRow width={'100%'}>
							<FlexChild>
								<TestDetails
								width={'292px'}
								type='text'
								placeholder={this.checkValidation('deadline')}
								onFocus={(e) => e.target.type = 'date'}
								onBlur={(e) => {e.target.type = !this.state.testDeadline ? 'text' : 'date'}}
								onChange={(e) => { this.setState({ testDeadline: e.target.value }) }}
								invalid = {this.isValid(this.state.testDeadline)} 
								/>
							</FlexChild>
							<FlexChild>
								<TestDetails
								required
								width={'292px'}
								type='number' min="0"
								placeholder={this.checkValidation('duration')}
								value={this.state.testDuration < 0 ? (-1 * this.state.testDuration) : this.state.testDuration}
								onChange={(e) => { this.setState({ testDuration: e.target.value}) }}
								invalid = {this.isValid(this.state.testDuration)}  
								/>
							</FlexChild>
							<FlexChild>
								<TestDetails
								width={'292px'}
								type='number'
								min="0" 
								placeholder="Total Score"  
								disabled 
								value={this.props.totalScore}/>
							</FlexChild>
							<FlexChild>
								<TestDetails
								width={'292px'}
								type='number'
								min="0"
								placeholder={this.checkValidation('score')} 
								value={this.state.passScore < 0 ? (-1 * this.state.passScore) : this.state.passScore}
								onChange={(e) => { this.setState({ passScore: +e.target.value }) }}
								invalid = {this.isValid(this.state.passScore)}  
								/>
							</FlexChild>
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
		submitted: state.test.submitted,
	}
}
function mapDispatchToProps(dispatch) {
	return {
	 submittedTrue: () => dispatch( submittedTrue()),
	 submittedFalse: () => dispatch( submittedFalse()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreater)

