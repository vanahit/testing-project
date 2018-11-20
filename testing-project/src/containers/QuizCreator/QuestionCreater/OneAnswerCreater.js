import React from 'react';
import styled from 'styled-components'

const AnswersField = styled.textarea`
  width: 100%;
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
    prevProps.isRight !== this.props.isRight && this.props.getInputValue(this.state.title, this.props.id,this.props.isRight);
  }
 	render() {
    return ( 
      <AnswersField 
        required
        id={this.props.id} 
        value={this.state.title} 
        onChange={this.inputChangeHandler}
        rows='2'
       
      />
    )
  }
}
