import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import QuestionCreater from './QuestionCreater/QuestionCreater';
import InvalidScoreFlag from '../../components/QuizCreater/InvalidScoreFlag';
import SuccessText from '../../components/QuizCreater/TestCreateSuccessText';
import { connect } from 'react-redux';
import {submittedFalse, submittedTrue, changeTotalScore} from '../../store/actions/testCreater';
import { firebase } from '../../firebase/firebase';
import 'react-sticky-header/styles.css';
import { StickyContainer, Sticky } from 'react-sticky';

const Main = styled.div`
	background-color: white;
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
	overflow: auto;
	
`;
const FixedPart = styled.div` 
	background-color: white;
	border-bottom: 1px solid #D6D6D6;
	z-index: 9999;
`;
const MarginBottom = styled.div`
	margin-top: 115px;
`;
const TestCreaterLink = styled.div`
	position:fixed;
	background-color: white;
	z-index: 2;
	top: 0px;
	overflow: hidden;
	width: 1200px;
	padding: 30px 0;
	font-size: 14px;
	border-bottom: 1px solid #D6D6D6;
`;
const FlexRow = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 30px 0;
	justify-content: space-between;
	width: ${props => props.width || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;
const FlexChild = styled.div`
	position: relative;
	box-sizing: border-box;
	width: ${props => props.width || ''};   
	@media screen and (max-width: 1190px) {
		margin: 10px 5px;
		min-width: 98%;
	}
`;
const TestDetails = styled.input`
	width: ${props => props.width || '292px'};
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
	width: 292px;
	height: 60px;
	font-size: 24px;
	padding-left: 16px;
	color: #4F9DA6;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	transition: font-size 0.5s ease-in-out;

	@media screen and (max-width: 1190px) {
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
		margin: 10px 5px;
		max-width: 98%;
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
	position:	${props => props.offsetTop < window.offsetTop && 'fixed'};
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
	}
`;
const Button = styled.div`
	width: 100%;
	text-align: right;
`;
const QuestionsDiv = styled.div`
	border-bottom: 1px solid #D6D6D6;
`;

class TestCreator extends Component {
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
			isAnswerValid: false,
			isQuestionValid: false,
			testCreated: false,
			
		}
	}

	selectBox = () => {
		const languages = ['Choose Type', 'JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<Select
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

	numberFieldsHandler = (e) => {
		let value = 1;
		if (e.target.value < 0) {
			value = +e.target.value * (-1);
		} else if (e.target.value > 0) {
			value = +e.target.value;
		} else {
			value = '';
		}
		if (e.target.name === 'passScore') {
			this.setState({ passScore: value }) 
		} 
		if (e.target.name === 'duration') {
			this.setState({ testDuration: value }) 
		}
	}

	getQuestionValues = (id, state) => {
		let questions = this.state.questions.map(question => {
			if (question.id === id) {
				question.questionTitle = state.questionTitle;
				question.isRight = state.isRight; 
				question.score = state.score;
				question.answers = state.answers;
			}
			return question;
		})
		this.setState({ questions: questions });
	}
	
	addQuestion = () => {
		let oneQuestion = {
			id: Date.now(),
			answers: [{ id: Date.now(), title: '', isRight: false }, { id: Date.now() + 1, title: '', isRight: false }],
			isRight: 0,
			questionTitle: '',
			score: '',
	}
		this.setState({ questions: this.state.questions.concat(oneQuestion), testCreated: false});
	}

	deleteQuestion = (id, score) => {
		let change = 0;
		change = score ? score : 0;

		this.setState({questions: this.state.questions.filter(question => question.id !== id)});
		this.props.changeTotalScore(-change);
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
		
		db.ref('tests').push({...test })
			this.props.submittedFalse();
			this.props.changeTotalScore(-this.props.totalScore);
			this.setState({testCreated: true});
			this.setState({
					questions: [],
					id: Date.now(),
					testTitle: '',
					description: '',
					testDeadline: '',
					testType: '',
					company: '',
					testDuration: '',
					totalScore: this.props.totalScore,
					passScore: '',
					isEditing: false,
				})	

	}
	
	checkInputValidation = (inputName) => {
		switch (inputName) {
			case 'title' :
				return this.props.submitted && !this.state.testTitle ?  `Fill Test Title` : `Test Title`;
			case 'company' :
				return this.props.submitted && !this.state.company ? `Fill company` : `Company`;	
			case 'description' :
				return this.props.submitted && !this.state.description 
					? `Fill description of test its complexity , target audience etc` : `Description`; 	
			case 'deadline' :
				return this.props.submitted && !this.state.testDeadline ? `Fill deadline of test` : `Deadline`;
			case 'duration' :
				return this.props.submitted && !this.state.testDuration ? `Fill test duration` : `Test Duration in minutes`;	
			case 'score' :
				return this.props.submitted && !this.state.passScore ? `Fill passing score` : `Passing Score`;
			case 'type' :
				return this.props.submitted && !this.state.testType ? `Choose type` : ``; 
			default:
		}
	}
	
	isFilled = (inputValue) => {
		return !inputValue ? true : false;
	}

	isAnswerValid = (validBoolean) => {
		this.setState({isAnswerValid: validBoolean});
	}

	isQuestionValid = (validBoolean) => {
		this.setState({isQuestionValid: validBoolean});
	}

	formValidation = () => {
		let state = this.state;
		return state.testTitle 
				&& state.description
				&& state.testDeadline 
				&& state.passScore 
				&& state.description 
				&& state.company 
				&& state.testDuration 
				&& state.testType 
				&& state.isQuestionValid
				&& !state.passScoreInvalid
	}
	submitted = () => {
		return new Promise((resolve, reject) => {
			this.props.submittedTrue();
			resolve(this.props.submitted);
		})
	}

	submitHandler = (e) => {
		e.preventDefault();
		this.submitted()
		.then(() => {
			if (this.formValidation()) {
				this.postData();
				console.log('valid');
			} else {
				this.checkInputValidation();
				console.log('valid');
			}
		})
	}

	getTodayDate = () => {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();
		if(dd < 10) {
			dd = '0' + dd
		} 
		if (mm < 10) {
			mm = '0' + mm
		} 
   		return	today = yyyy + '-' + mm + '-' + dd;
	}
	 
	componentDidUpdate(prevProps, prevState) {
		if ((prevProps.totalScore !== this.props.totalScore) || (prevState.passScore !== this.state.passScore)) {
			if(this.state.passScore > this.props.totalScore) {
				this.setState({passScoreInvalid: true})
			} else {
				this.setState({passScoreInvalid: false})
			}
		}
	}
	
	render() {
		return (
			<Main>
			<StickyContainer>
				<TestCreaterLink>
					Home / My Account / Test Create
				</TestCreaterLink>
				<form onSubmit={this.submitHandler}>
				<MarginBottom>
					<FlexRow>
							<FlexChild >
								<TestDetails
									width={'584px'}
									type="text"
									placeholder={this.checkInputValidation('title')}
									value={this.state.testTitle}
									onChange={(e) => { this.setState({ testTitle: e.target.value }) }} 
									invalid = {this.isFilled(this.state.testTitle)} 
								/>
							</FlexChild>
							<FlexChild>
								<TestDetails
									type="text"
									placeholder={this.checkInputValidation('company')}
									value={this.state.company}
									onChange={(e) => { this.setState({ company: e.target.value }) }}
									invalid = {this.isFilled(this.state.company)} 
								/>
							</FlexChild>
							<FlexChild> {this.selectBox()}  </FlexChild>
						</FlexRow>
						<FlexRow width={'100%'}>
							<Description 
								placeholder={this.checkInputValidation('description')} 
								value={this.state.description}
								onChange={(e) => { this.setState({ description: e.target.value }) }} 
								invalid = {this.isFilled(this.state.description)}
							/>
						</FlexRow>
					</MarginBottom>
					 <Sticky topOffset={200} >
						{
							({
								style,
					 			isSticky,
								wasSticky,
								distanceFromTop,
								distanceFromBottom,
								calculatedHeight
							  }) => (
						<FixedPart style={style} topOffset={30} position={100}>
						<FlexRow  width={'100%'} >
							<FlexChild width={'292px'}>
							 <TestDetails
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
								<FlexChild width={'300px'}>
								<TestDetails
									type='number'
									name='duration' 
									placeholder={this.checkInputValidation('duration')}
									value={this.state.testDuration}
									invalid = {this.isFilled(this.state.testDuration)}  
								/>
								
							</FlexChild >
							<FlexChild width={'48%'}>
								<Button>
									<AddButton 
										type='button' 
										className='header' 
										onClick={this.addQuestion}
										offsetTop={this.offsetTop}>
										ADD QUESTION
									</AddButton>
								</Button>
							</FlexChild>
						</FlexRow>
					</FixedPart>
					)}
					</Sticky>
						{this.state.questions.length > 0 && 
							<QuestionsDiv>
								{this.state.questions.map((question, index) =>
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
							</QuestionsDiv>
						}
					
					{this.state.questions.length > 0 && 

						<FlexRow>
							<FlexChild  width={'292px'}>
									<TestDetails
										type='text'
										placeholder="Total Score"  
										disabled 
										value={`Total Score ${this.props.totalScore}`}/>
								</FlexChild>
								<FlexChild width={'300px'}>
									{ this.state.passScoreInvalid && <InvalidScoreFlag />}
									<TestDetails
										type='number'
										name='passScore'
										placeholder={this.checkInputValidation('score')} 
										value={this.state.passScore}
										onChange={this.numberFieldsHandler}
										invalid = {this.isFilled(this.state.passScore)}  
									/>
								</FlexChild>
							<FlexChild width={'48%'}>
								<Button>
									<AddButton>CREATE TEST</AddButton>
								</Button>
							</FlexChild>
						</FlexRow>
						
					}
						

				</form>
					<FlexRow>
						{this.state.testCreated && <SuccessText/>} 
					</FlexRow>	
					
					</StickyContainer>
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
		changeTotalScore: (score) => dispatch(changeTotalScore(score)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreator)

