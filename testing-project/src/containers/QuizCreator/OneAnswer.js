import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {createQuestionAnswer, activeAnswer} from '../../store/actions/createAnswer';

const ErrorDiv = styled.div`
  color:red;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-style: bold;
  font-size: 18px;
  flex-wrap: wrap;
`;
const TextArea = styled.textarea`
  min-width: ${props => props.width + 'em' || '50px'};
  min-height:${props => props.height + 'em' || '50px'};
  border: solid 2px ${props => props.borderColor  || '#eee'};
  color: ${props => props.color || 'black'}; 
  padding: 5px 5px;
  font-size: 18px;
  box-sizing: border-box;

`;
const Label = styled.label`
  text-align: center;
  margin: 0 5px;
  padding: 0 5px;
  min-height:${props => props.height + 'em' || '50px'};
  border: solid 2px ${props => props.borderColor  || '#eee'};
  line-height: ${props => props.height + 'em' || '48px'};
  color: ${props => props.color || 'black'}; 
  min-width: 8em;
  box-sizing: border-box;
`;

class OneAnswer extends Component {
  constructor(props) {
    super(props)
    this.state = {title: '', isRight: false}
    this.answerChangeHandler = this.answerChangeHandler.bind(this);
    this.addOneAnswer = this.addOneAnswer.bind(this);
  }
  answerChangeHandler(e) {
        this.props.isRight 
      ? this.setState({title: e.target.value, isRight: true})
      : this.setState({title: e.target.value, isRight: false})

      this.props.setAnswers(this.state.title, this.props.id);

  }
  componentDidUpdate(props) {

  }
  addOneAnswer() {
       
  }
  render() {
    return(
      <>
        <FlexContainer>
          { !this.state.title ? <ErrorDiv> You must input answer </ErrorDiv> : '' }
          </FlexContainer>

          <FlexContainer>
            <TextArea width={30} height={3} borderColor={this.props.color} 
            placeholder='Input answer'
            value={this.state.title}
            onChange={this.answerChangeHandler} required=''/>
          
            <Label height={3} borderColor={this.props.color} color={this.props.color}>
              {this.props.text}
            </Label>
        </FlexContainer>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    answers: state.quiz.answers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuestionAnswer: () => dispatch(createQuestionAnswer()),
    activeAnswer: answer => dispatch(activeAnswer(answer))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OneAnswer)