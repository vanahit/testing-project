import React from 'react';
import styled from 'styled-components';

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

export default class OneAnswerCreater extends React.Component {
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
  isValid = () => {
  }
 	render() {
    return ( 
            <AnswerInput 
              type="text"
              required 
              placeholder={`Answer ${this.props.count}`}
              id={this.props.id} 
              value={this.state.title} 
              onChange={this.inputChangeHandler} 
          />
         
    )
  }
}
