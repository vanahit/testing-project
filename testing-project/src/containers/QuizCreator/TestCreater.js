import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import QuestionCreater from './QuestionCreater/QuestionCreater';
import InvalidScoreFlag from '../../components/QuizCreater/InvalidScoreFlag';
import SuccessText from '../../components/QuizCreater/TestCreateSuccessText';
import { connect } from 'react-redux';
import {submittedFalse, submittedTrue,  increaseTotalScore} from '../../store/actions/testCreater';
import { firebase } from '../../firebase/firebase';


const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
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
	position:relative;
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
	position:relative;
	width:  ${props => props.width || '25%'};
	box-sizing: border-box;
		   
	@media screen and (max-width: 1190px) {
		margin: 5px;
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
	transition: font-size 0.5s ease-in-out;
	:disabled {
		background-color: white;
	}
	@media screen and (max-width: 1190px) {
		margin-top: 5px;
		min-width: 100%;
	}
	@media screen and (max-width: 580px) {
		font-size: 16px;
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
const Select = styled.select`
	width: calc(100% - 8px);
	height: 60px;
	font-size: 24px;
	padding-left: 16px;
	color: #4F9DA6;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	transition: font-size 0.5s ease-in-out;

	@media screen and (max-width: 1190px) {
		margin-top: 5px;
		min-width: 100%;
	}

	@media screen and (max-width: 580px) {
		font-size: 16px;
	}
	::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
	:-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}
	${props => props.invalid && css`
		font-size: 22px;
		transition: font-size 1s ease-in-out;
		color: rgba(185, 4, 46, 0.5);
		border-bottom: 1px solid rgba(185, 4, 46, 1);
		::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
		::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
		:-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
		:-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
	`}
`;
const Description = styled.textarea`
	width: 100%;
	height: 120px;
	padding: 16px;
	color: #4F9DA6;
	font-size: 24px;
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	transition: font-size 0.5s ease-in-out;
	
	@media screen and (max-width: 1190px) {
		margin-top: 5px;
		min-width: 100%;
	}
	@media screen and (max-width: 580px) {
		font-size: 16px;
	}
	::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
	:-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}

	${props => props.invalid && css`
		font-size: 22px;
		transition: font-size 0.5s ease-in-out;
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
	transition: width 2s, height 2s, font-size 1s ease-in-out;
	
	@media screen and (max-width: 580px) {
		font-size: 12px;
		width: 120px;
		height: 20x;
		text-align: center;
	}
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
			testTitle: '',
			description: '',
			testDeadline: '',
			testType: '',
			company: '',
			totalScore: '',
			passScore: '',
			testDuration: '',
			passScoreInvalid: false,
			isEditing: false,
			isAnswerValid: false,
			isQuestionValid: false,
			isFormValid: false,
			testCreated: false,
			
		}
	}
	passScoreHandleChange = (e) => {
		return new Promise((resolve, reject) => {
			this.setState({ passScore: +e.target.value }) 
			resolve(this.state.passScore)
		}).then((passScore) => {
			this.state.passScore > this.props.totalScore 
				? this.setState({passScoreInvalid: true}) : this.setState({passScoreInvalid: false})
		})
	}
	getQuestionValues = (item, type, id) => {
		let questions = this.state.questions.map(question => {
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
		const languages = ['Choose Type', 'JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<Select
				width={'calc(100% - 8px)'}
				invalid = {this.checkInputValidation('type')}
				onChange={(e) => this.setState({ testType: e.target.value })}
				value={this.state.testType}>
				{
					languages.map((option, index) => (
						<option 
							key={index + 1}
							disabled = {index === 0 && this.state.testType ? true : false}
						> 
						{option} 
						</option>
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
			score: '',
	}
		this.setState({ questions: this.state.questions.concat(oneQuestion), testCreated:false })
		this.props.submittedFalse();
	}
	deleteQuestion = (id) => {
		this.setState({questions: this.state.questions.filter(question => question.id !== id)});
	}
	clearWordFromSpaces = (word) => {
		return word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
	}
	postData = () => {
		let db = firebase.database();
			let test = {
				id: Date.now(),
				testTitle: this.clearWordFromSpaces(this.state.testTitle),
				testDeadline: Date(this.state.testDeadline),
				company: this.clearWordFromSpaces(this.state.company),
				description: this.clearWordFromSpaces(this.state.description),
				testType: this.state.testType,
				passScore: this.state.passScore,
				totalScore: this.props.totalScore,
				testDuration: this.state.testDuration,
				questions: this.state.questions,
				passers: 0,
			};
			db.ref('tests').push({...test });
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
					testCreated: false,
				})
				this.props.submittedFalse();
				this.props.increaseTotalScore(-this.props.totalScore);
	}	
	submitHandler = (e) => {
		e.preventDefault();
		return new Promise((resolve, reject) => {
			this.props.submittedTrue();
			resolve(this.props.submitted)
		}).then(submitted => {
			this.formValidation();
		}).then(isFormValid => {
			this.state.isFormValid && this.postData();
			this.state.isFormValid && this.setState({testCreated: true})
		})
	}
	formValidation = () => {
		let state = {...this.state};
		(state.testTitle && state.description && state.testDeadline && state.passScore 
			&& state.description && state.company && state.testDuration 
			&& state.isAnswerValid && state.testType && state.isQuestionValid && !state.passScoreInvalid) 
				? this.setState({isFormValid: true}) : this.setState({isFormValid: false});
	}
	checkInputValidation = (inputName) => {
		let placeholderText = '';
		switch (inputName) {
			case 'title' :
				placeholderText = (this.props.submitted && !this.state.testTitle) ?  `Fill Test Title` : `Test Title`;	break;
			case 'company' :
				placeholderText = this.props.submitted && !this.state.company ? `Fill company` : `Company`;	break;
			case 'description' :
				placeholderText = this.props.submitted && !this.state.description 
					? `Fill description of test its complexity , target audience etc` : `Description`; 	break;
			case 'deadline' :
				placeholderText = this.props.submitted && !this.state.testDeadline ? `Fill deadline of test` : `Deadline`;	break;
			case 'duration' :
				placeholderText = this.props.submitted && !this.state.testDuration ? `Fill test duration` : `Test Duration`;	break;
			case 'score' :
				placeholderText = this.props.submitted && !this.state.passScore ? `Fill passing score` : `Passing Score`; break;
			case 'type' :
				placeholderText = this.props.submitted && !this.state.testType ? `Choose type` : ``; break;
			default:
		}
		return placeholderText;
	}
	isFilled = (inputValue) => {
		return this.props.submitted &&  !inputValue ? true : false;
	}
	isAnswerValid = (validBoolean) => {
		this.setState({isAnswerValid: validBoolean});
	}
	isQuestionValid = (validBoolean) => {
		this.setState({isQuestionValid: validBoolean});
	}
	componentDidUpdate(prevProps) {
		if(prevProps.totalScore !== this.props.totalScore) {
			this.state.passScore > this.props.totalScore 
				? this.setState({passScoreInvalid: true}) : this.setState({passScoreInvalid: false})
		}
	}
	getTodayDate = () => {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();
		if(dd < 10){
			dd = '0' + dd
		} 
		if (mm < 10){
			mm = '0' + mm
		} 
   		return	today = yyyy + '-' + mm + '-' + dd;
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
									placeholder={this.checkInputValidation('title')}
									value={this.state.testTitle}
									onChange={(e) => { this.setState({ testTitle: e.target.value }) }} 
									invalid = {this.isFilled(this.state.testTitle)} 
								/>
							</FlexChild>
							<FlexChild width={'25%'}>
								<TestDetails
									width={'calc(100% - 8px)'}
									type="text"
									placeholder={this.checkInputValidation('company')}
									value={this.state.company}
									onChange={(e) => { this.setState({ company: e.target.value }) }}
									invalid = {this.isFilled(this.state.company)} 
								/>
							</FlexChild>
							<FlexChild width={'25%'}> {this.selectBox()}  </FlexChild>
						</FlexRow>
						<FlexRow width={'100%'}>
							<FlexChild width={'100%'}>
								<Description 
									placeholder={this.checkInputValidation('description')} 
									value={this.state.description}
									onChange={(e) => { this.setState({ description: e.target.value }) }} 
									invalid = {this.isFilled(this.state.description)}
								/>
							</FlexChild>
						</FlexRow>
						<FlexRow width={'100%'}>
							<FlexChild>
								<TestDetails
									width={'292px'}
									type='text'
									min={this.getTodayDate()}
									placeholder={this.checkInputValidation('deadline')}
									value = {this.state.testDeadline}
									onFocus={(e) => e.target.type = 'date'}
									onBlur={(e) => {e.target.type = !this.state.testDeadline ? 'text' : 'date'}}
									onChange={(e) => { this.setState({ testDeadline: e.target.value }) }}
									invalid = {this.isFilled(this.state.testDeadline)} 
								/>
							</FlexChild>
							<FlexChild>
								<TestDetails
									width={'292px'}
									type='number' min="0"
									placeholder={this.checkInputValidation('duration')}
									value={this.state.testDuration < 0 ? (-1 * this.state.testDuration) : this.state.testDuration}
									onChange={(e) => { this.setState({ testDuration: +e.target.value}) }}
									invalid = {this.isFilled(this.state.testDuration)}  
								/>
							</FlexChild>
							<FlexChild>
								<TestDetails
									width={'292px'}
									type='text'
									min="0" 
									placeholder="Total Score"  
									disabled 
									value={`Total Score ${this.props.totalScore}`}/>
							</FlexChild>
							<FlexChild>
								{ this.state.passScoreInvalid && <InvalidScoreFlag />}
								<TestDetails
									width={'292px'}
									type='number'
									min="0"
									max={this.state.totalScore}
									placeholder={this.checkInputValidation('score')} 
									value={this.state.passScore < 0 ? (-1 * this.state.passScore) : this.state.passScore}
									onChange={this.passScoreHandleChange}
									invalid = {this.isFilled(this.state.passScore)}  
								/>
							</FlexChild>
						</FlexRow>
						<AddButton type='button' onClick={this.addQuestion}>ADD QUESTION</AddButton>
					</Test>
					{this.state.questions.length > 0 && this.state.questions.map((question, index) =>
						<QuestionCreater
							isAnswerValid={this.isAnswerValid}
							isQuestionValid={this.isQuestionValid}
							key={question.id + index}
							id={question.id}
							count={index + 1}
							getQuestionValues={this.getQuestionValues} 
							deleteQuestion={this.deleteQuestion}
						/>
					)}
					{this.state.questions.length > 0 && 
						<AddTest>
							<AddButton>CREATE TEST</AddButton>
						</AddTest> }
				</form>
					<FlexRow>{ this.state.testCreated && <SuccessText />} </FlexRow>	
				
			</Main>
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
	 submittedTrue: () => dispatch( submittedTrue()),
	 submittedFalse: () => dispatch( submittedFalse()),
	 increaseTotalScore: (score) => dispatch(increaseTotalScore(score)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreater)

