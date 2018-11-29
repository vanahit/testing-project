import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import { connect } from 'react-redux';
import InvalidScoreFlag from '../../../components/QuizCreator/InvalidScoreFlag';

const FlexChild = styled.div`
	position: relative;
	box-sizing: border-box;
	width: ${props => props.width || ''};   
	@media screen and (max-width: 1190px) {
		margin: 20px 5px;
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

class TestPassScore extends Component {
	constructor(props) {
		super(props);
	}
	
	handleChange = (e) => {
        this.props.getInputValue(e, 'passScore');
    }
    
    isFilled = (inputValue) => {
        return !inputValue && this.props.submitted ? true : false;
    }
    
	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.value !== this.props.value || nextProps.submitted !== this.props.submitted;
	}

	render() {
		return (
            <>
               {this.props.value > this.props.totalScore && <InvalidScoreFlag />}
                <FlexChild width={'300px'}>
                    <TestDetails
                        type='number'
                        value={this.props.value}
                        placeholder={'Passing Score'}
                        onChange={this.handleChange}
                        invalid = {this.isFilled(this.props.value)}  
                    />
                </FlexChild >
            </>					
		);
	}
}


function mapStateToProps(state) {
	return {
        submitted: state.testCreator.submitted,
    }
}

export default connect(mapStateToProps, null)(TestPassScore)