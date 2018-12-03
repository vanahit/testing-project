import React  from 'react';
import styled, {css} from 'styled-components'
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

const TestDeadline = props => {
	
	const handleChange = (e) => {
		props.getInputValue(e, 'testDeadline');
	}

    const getTodayDate = () => {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if(dd < 10) {
			dd = '0' + dd
		} 

		if (mm < 10) {
			mm = '0' + mm
		} 
		return	today = yyyy + '-' + mm + '-' + dd;
	}

	return (
		<FlexChild width={'292px'}>
			<TestDetails
				type='text'
				min={getTodayDate()}
				placeholder='Test Deadline'
				value={props.value}
				onFocus={(e) => e.target.type = 'date'}
				onBlur={(e) => {e.target.type = !props.value ? 'text' : 'date'}}
				onChange={handleChange}
				invalid={props.isFilled(props.value)}
			/>
		</FlexChild>							
	)
}

function mapStateToProps(state) {
	return {
		submitted: state.testCreator.addQuestionSubmitted,
	}
}

export default connect(mapStateToProps, null)(TestDeadline)