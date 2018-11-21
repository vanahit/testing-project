import React from 'react';
import styled, {css} from 'styled-components'
import {connect} from 'react-redux';

const AnswerInput = styled.input`
  margin-bottom: 30px;
  width: calc(100% - 96px);
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

  ${props => props.invalid && css`
    color: rgba(185, 4, 46, 0.5);
    border-bottom: 1px solid rgba(185, 4, 46, 1);
    ::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
    ::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
    :-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
    :-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
`}
`;

const Radio = styled.input`
  max-width: 24px;
  max-height: 24px;
  border: 1px solid #4F9DA6;
  background: #4F9DA6;
`;
const DeleteAnswer = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid rgba(231, 231, 231, 1);
  color:rgba(230, 36, 22, 1);
  font-size: 24px;

`;

class OneAnswerCreater extends React.Component {
  constructor(props){
     super(props);
     this.state = {title: ''}
  }
  inputChangeHandler = (e) => {
    return new Promise((resolve, reject) => {
      this.setState({title: e.target.value});
      resolve(this.state.title);
    }) 
    .then(title => {
      this.props.getInputValue(title, this.props.id, this.props.isRight);
    }) 
  }
  clearWordFromSpaces = (word) => {
    return  word && word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
  }
  componentDidUpdate(prevProps) {
    prevProps.isRight !== this.props.isRight && this.props.getInputValue(this.state.title, this.props.id, this.props.isRight);
  }
  checkValidation = (inputName) => {
    let placeholderText ='';
		return placeholderText = (this.props.submitted && !this.state.questionTitle) 
			? `Fill Answer ${this.props.count}` 
			: `Answer ${this.props.count}`;
	}
	isValid = () => {
		return this.props.submitted && !this.state.title ? true : false;
	}
 	render() {
    return ( 
            <AnswerInput 
              type="text"
              placeholder={this.checkValidation()}
              invalid = {this.isValid()}
              id={this.props.id} 
              value={this.state.title} 
              onChange={this.inputChangeHandler} 
          />
    )
   }
  }
function mapStateToProps(state) {
  return {
	 submitted: state.test.submitted,
  }
}
function mapDispatchToProps(dispatch) {
  return {
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(OneAnswerCreater)