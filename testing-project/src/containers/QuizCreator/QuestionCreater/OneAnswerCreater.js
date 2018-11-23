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
  transition: font-size 0.5s ease-in-out;
    @media screen and (max-width: 580px) {
		font-size: 12px;
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
      this.isAnswerValid();
      this.props.getInputValue(title, this.props.id, this.props.isRight);
    }) 
  }
  isAnswerValid =() => {
    (this.props.submitted && this.state.title) ? this.props.isAnswerValid(true) : this.props.isAnswerValid(false)
  }
  clearWordFromSpaces = (word) => {
    return  word && word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
  }
   checkInputValidation = (inputName) => {
   	return (this.props.submitted && !this.state.questionTitle) 
			? `Fill Answer ${this.props.count}` 
			: `Answer ${this.props.count}`;
	}
	isFilled = () => {
		return this.props.submitted && !this.state.title ? true : false;
  }
  componentDidUpdate(prevProps) {
    prevProps.isRight !== this.props.isRight && this.props.getInputValue(this.state.title, this.props.id, this.props.isRight);
    prevProps.submitted !== this.props.submitted && this.isAnswerValid();
  }
 	render() {
    return ( 
            <AnswerInput 
              type="text"
              placeholder={this.checkInputValidation()}
              invalid = {this.isFilled()}
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