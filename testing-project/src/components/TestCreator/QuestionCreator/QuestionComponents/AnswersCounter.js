import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';

const FlexChild = styled.div`
	position: relative;
	box-sizing: border-box;
	width: ${props => props.width || ''};   
	@media screen and (max-width: 1190px) {
		margin: 10px 5px;
		min-width: 98%;
	}
`;
const AddAnswerDiv = styled.div`
	font-size: 14px;
	color: #4F9DA6;
`;
const ButtonsDiv = styled.div`
	display: flex;
	width: 132px;
`;
const ButtonsFlexChild = styled.div`
	flex:44px; 
	height: 44px; 
	line-height: 44px; 
	text-align: center; 
	border: 1px solid #4F9DA6;
	: hover 
`;
const CountFlexChild = styled.div`
	flex:44px; 
	height: 44px; 
	line-height: 44px; 
	text-align: center; 
	border: 1px solid #4F9DA6;
	border-right: 0;
	border-left: 0;
`;

class AnswersCounter extends Component {

    shouldComponentUpdate (nextProps, nextState) {
		return nextProps.answersCount !== this.props.answersCount 
	}

	render() {
		return (
            <FlexChild width={'140px'} verAlign={'top'} >
                <AddAnswerDiv>Add more answers</AddAnswerDiv>
                    <ButtonsDiv>
                        <ButtonsFlexChild 
                            type='button'
                            onClick={() => this.props.answersCountHandler('minus')}>
                                -
                        </ButtonsFlexChild>							
                        <CountFlexChild>{this.props.answersCount}</CountFlexChild>
                        <ButtonsFlexChild 
                            type='button'
                            onClick={() => this.props.answersCountHandler('plus')}>
                                +
                        </ButtonsFlexChild>
                    </ButtonsDiv>
            </FlexChild>
        );
	}
}


function mapStateToProps(state) {
	return {
		submitted: state.testCreator.addQuestionSubmitted,
	}
}

export default connect(mapStateToProps, null)(AnswersCounter)