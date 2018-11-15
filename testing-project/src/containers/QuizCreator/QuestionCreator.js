import React, { Component } from 'react';
import styled from 'styled-components'
import css from 'styled-components'
import OneAnswer from '../../containers/QuizCreator/OneAnswer';
import {createQuestionAnswer, activeAnswer} from '../../store/actions/createAnswer';
import {connect} from 'react-redux';

const Div = styled.div`
  margin: 20px 0;
`;
const Span = styled.span`
  font-size: 14px;
  margin-right: 10px;
`;
const Input = styled.input`
  padding: 5px;
  margin-right: 5px;
  margin-left:${props => props.margin + 'px' || ''};
  width: ${props => props.width + 'px' || ''};
  height:${props => props.height+ 'px' || ''};
  border: solid 2px ${props => props.color  || ''};
  color: black; 
`;
const QuestionAnswerTitle = styled.textarea`
  width: 700px;
  height:50px;
  border solid 2px grey;

`;
const Ul = styled.ul`
  padding: 0;
  list-style: none;
`;
const Li = styled.li``;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid grey;
  color: grey;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: ${props => props.width + 'px' || ''};
  height:${props => props.height+ 'px' || ''};
`;

class QuestionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: { questionTitle: '', duration: '', score:'', },
      answers:{answer1: {}, answer0: {}, answer2: {}},
      answersNumber: 3,
      isValid: false,

    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.answersCreater = this.answersCreater.bind(this);
    this.timeChangeHandler = this.timeChangeHandler.bind(this);
    this.scoreChangeHandler = this.scoreChangeHandler.bind(this);
    this.questionChangeHandler = this.questionChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.formValidate = this.formValidate.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  questionChangeHandler(e) {
    this.setState( { formControls: {...this.state.formControls, questionTitle: e.target.value } } );
  }
  handleOptionChange(e) {
    this.setState( { answersNumber: +e.target.value} );
  }
  timeChangeHandler(e) {
    this.setState( { formControls: {...this.state.formControls, duration: +e.target.value } } );
  }
  scoreChangeHandler(e) {
    this.setState( { formControls: {...this.state.formControls, score: +e.target.value } } );
  }
  formValidate() {
    let count = 0;
    let formControls = this.state.formControls;
    for (let input in formControls) {
      !formControls[input] && count++; 
    }
    console.log(!count);
    count === 3 ? this.setState({isValid: true}) : this.setState({isValid: false});
  }

  addAnswer() {
    this.formValidate();
    this.setAnswers();
    this.props.createQuestionAnswer();
  }
  setAnswers(obj) {
    let key = Object.keys(obj)[0];
    console.log(value)
    let value = obj[key];
    this.setState({ answers: {...obj, key: value} } );
  }
  answersCreater(count) {
    return (
      <Ul>
        {
          Array.apply(null, Array(this.state.answersNumber)).map((number, index) => { 
            return (
              index === 0
                ?
                  <Li key={`answer${index}`}>
                    <OneAnswer
                      setAnswers={this.setAnswers} 
                      id={`answer${index}`} 
                      color={'#750411'} 
                      text={'Wrong answer'} />
                  </Li>
                : 
                  <Li key={`answer${index}`}>
                    <OneAnswer
                    setAnswers={this.setAnswers}  
                    id={`answer${index}`}
                    color={'green'} 
                    text={'Right answer'} 
                    isRight={'true'}/>
                  </Li>
            );
          })
        }
      </Ul>
    );
  }

  render() {
    let inputsList = this.answersCreater();
    return(
      <>
        <Div>
          <form onSubmit={this.handleSubmit}>
          <Div> 
            <QuestionAnswerTitle 
              requered 
              placeholder='Input title of question'
              value={this.state.formControls.questionTitle}
              onChange={this.questionChangeHandler}
            />
          </Div>
            <Span>Choose count of answers</Span>
            <label>3<Input requered type='radio' name='number' value="3" onChange={this.handleOptionChange} defaultChecked={true}/></label>
            <label>4<Input requered type='radio' name='number' value="4" onChange={this.handleOptionChange} /></label>
            <label>5<Input requered type='radio' name='number' value="5" onChange={this.handleOptionChange}/></label>
            <Input 
              requered
              type='number' min='1'
              placeholder="duration in minutes" 
              value={this.state.formControls.duration}
              onChange={this.timeChangeHandler}
              placemargin={10} 
              width={150} 
            />
            <Input 
              requered
              type='number' min='0'
              placeholder="Score of question" 
              value={this.state.formControls.score}
              onChange={this.scoreChangeHandler}
              placemargin={10} 
              width={150} 
            />
            { inputsList }
            <Button
              onClick={ this.addAnswer }
              width={150} height={50}
            >
              Add answer
            </Button>
            </form>
          </Div>
          
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuestionAnswer: () => dispatch(createQuestionAnswer()),
  }
}

export default connect(null, mapDispatchToProps)(QuestionCreator);
