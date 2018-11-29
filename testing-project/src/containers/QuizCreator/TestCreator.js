import React, { Component } from 'react';
import styled  from 'styled-components'
import { connect } from 'react-redux';
import { addQuestion, addQuestionSubmitted, submittedTrue, updateQuestions, questionNotValid, answerNotValid, deleteStateData, testCreatedFalse } from '../../store/actions/testCreator';
import 'react-sticky-header/styles.css';
import { StickyContainer, Sticky } from 'react-sticky';
import { firebase } from '../../firebase/firebase';
import TestTitle from './TestComponents/TestTitle';
import TestCreatorCompany from './TestComponents/TestCreatorCompany';
import TestType from './TestComponents/TestType';
import TestDeadline from './TestComponents/TestDeadline';
import TestDuration from './TestComponents/TestDuration';
import TestDescription from './TestComponents/TestDescription';
import Button from '../../components/QuizCreator/Button';
import QuestionCreator from './QuestionCreator/QuestionCreator';
import TestPassScore from './TestComponents/TestPassScore';
import TestTotalScore from './TestComponents/TestTotalScore';
import SuccessText from '../../components/QuizCreator/TestCreateSuccessText';

const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
	overflow: auto;
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
const QuestionsDiv = styled.div`
    border-bottom: 1px solid #D6D6D6;
`;

const TestHeader = styled.div`
    border-bottom: 1px solid #D6D6D6;
    
`;

class TestCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			testTitle: '',
			description: '',
			testDeadline: '',
            testType: '',
            passScore: '',
			company: '',
			testDuration: '',
		}
	}
    getInputValue = (e, field) => {
        let value = e.target.value;
        value = this.clearWordFromSpaces(value);
        
        if (e.target.type === 'number') {
            if (value < 0) {
                value = +value * (-1);
            } else if (value > 0) {
                value = +value;
            } else {
                value = '';
            }
        }
        this.setState({ [field]: value });
    }

    clearWordFromSpaces = (word) => {
		return word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
    }

    isFilled = (inputValue) => {
        return !inputValue && this.props.submitted ? true : false;
    }
    
    addQuestion = () => {
        this.props.addQuestionSubmitted();
        if (this.formValidation()) {
           this.props.addQuestion();
           this.props.questionNotValid();
		   this.props.ansnwerNotValid();
		   this.props.testCreatedFalse();
        }
    }

    getQuestionValues = (id, state) => {
		let questions = this.props.questions.map(question => {
			if (question.id === id) {
				question.questionTitle = state.questionTitle;
				question.isRight = +state.isRight; 
				question.score = state.score;
				question.answers = state.answers;
			}
			return question;
		})
		this.props.updateQuestions(questions);
	}

	formValidation = () => {
		let state = this.state;
		return state.testTitle 
				&& state.description
				&& state.testDeadline 
				&& state.description 
				&& state.company 
				&& state.testDuration 
				&& state.testType 
    }
    
    postData = () => {
		let db = firebase.database();
		let test = {
				id: Date.now(),
                ...this.state,
                questions: this.props.questions,
                isEditing: false,
                passers: 0,
		};
		db.ref('tests').push({...test })
			
	}

    submitHandler = () => {
		return new Promise ((resolve, reject) => {
			this.props.submittedTrue();
			resolve(this.props.submitted)
		}) .then (() => {
			if (this.formValidation()
				&& this.state.passScore
				&& this.props.isAnswerValid
				&& this.props.isQuestionValid 
				&& (this.state.passScore <= this.props.totalScore)) {

				this.postData();
				this.props.deleteStateData();

				this.setState({
					testTitle: '',
					description: '',
					testDeadline: '',
					testType: '',
					passScore: '',
					company: '',
					testDuration: '',
				})	
			}
		})
	}
	
    render() {
		return (
            <Main>
				<TestHeader>
					<FlexRow>
						<TestTitle
							getInputValue={this.getInputValue}
							value={this.state.testTitle}
							isFilled={this.isFilled}
						/>
						<TestCreatorCompany 
							getInputValue={this.getInputValue}
							value={this.state.company}
							isFilled={this.isFilled} 
						/>
						<TestType 
							getInputValue={this.getInputValue}
							value={this.state.testType}
							isFilled={this.isFilled} 
						/>
					</FlexRow>
					<FlexRow>
						<TestDescription 
							getInputValue={this.getInputValue}
							value={this.state.description}
							isFilled={this.isFilled}
						/>
					</FlexRow>
					<FlexRow>
						<TestDeadline 
							getInputValue={this.getInputValue}
							value={this.state.testDeadline}
							isFilled={this.isFilled} 
						/>
						<TestDuration
							getInputValue={this.getInputValue}
							value={this.state.testDuration}
							isFilled={this.isFilled}  
						/>
					<Button onClick={this.addQuestion}>ADD QUESTION</Button>
					</FlexRow>
				</TestHeader>
				{!this.props.testCreated && this.props.questions.length > 0 && 
					<>
						<QuestionsDiv>
							{this.props.questions.map((question, index) =>
								<QuestionCreator
									key={question.id + index}
									id={question.id}
									count={index + 1}
									isFilled={this.isFilled}
									clearWordFromSpaces={this.clearWordFromSpaces}
									getQuestionValues={this.getQuestionValues}  
								/>
							)}
						</QuestionsDiv>
						<FlexRow>
							<TestTotalScore />
							<TestPassScore
								getInputValue={this.getInputValue}
								value={this.state.passScore}
							/>
							<Button onClick={this.submitHandler}>
								CREATE TEST
							</Button>
						</FlexRow> 
					</> 
                }

                <FlexRow>
                   {this.props.testCreated && <SuccessText/>} 
                </FlexRow>
            </Main>
		);
	}
}

function mapStateToProps(state) {
	return {
        totalScore: state.testCreator.totalScore,
        submitted: state.testCreator.addQuestionSubmitted,
		questions: state.testCreator.questions,
		isAnswerValid: state.testCreator.isAnswerValid,
		isQuestionValid: state.testCreator.isQuestionValid,
		testCreated: state.testCreator.testCreated,

	}
}
function mapDispatchToProps(dispatch) {
	return {
        addQuestion: () => dispatch(addQuestion()),
        addQuestionSubmitted: () => dispatch(addQuestionSubmitted()),
        submittedTrue : () => dispatch(submittedTrue()),
        updateQuestions: (questions) => dispatch(updateQuestions(questions)),
        questionNotValid: () => dispatch(questionNotValid()),
        ansnwerNotValid: () => dispatch(answerNotValid()),
		deleteStateData: () => dispatch(deleteStateData()),
		testCreatedFalse: () => dispatch(testCreatedFalse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreator)



