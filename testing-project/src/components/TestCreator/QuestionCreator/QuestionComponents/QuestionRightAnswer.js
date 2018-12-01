import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';

const Radio = styled.input`
	margin: 16px 5px;
	width: 22px;
	height: 22px;

	:before {
		width: 21px;
		height: 21px;
		border-radius: 15px;
		top: -1px;
		left: -1px;
		position: relative;
		background-color: white;
		content: '';
		display: inline-block;
		visibility: visible;
		border: 1px solid rgba(79, 157, 166, 1);
	}
	:checked:after {
		width: 11px;
		height: 11px;
		border-radius: 15px;
		top: -22px;
		left: 4px;
		position: relative;
		background-color: rgba(79, 157, 166, 1);
		content: '';
		display: inline-block;
		visibility: visible;
		border: 1px solid rgba(79, 157, 166, 1);
	}
`;

class QuestionRightAnswer extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: ''}
    }
  
    handleChange = (e) => {
        this.props.getInputValue(e, 'isRight');
    }

    render() {
      return ( 
        <>
          <Radio
            type='radio'
            name={this.props.name} 
            value={this.props.id} 
            onClick={this.handleChange}
          />
        </>
      );
    }
  }

function mapStateToProps(state) {
  return {
	 submitted: state.testCreator.submitted,
  }
}

export default connect(mapStateToProps, null)(QuestionRightAnswer)