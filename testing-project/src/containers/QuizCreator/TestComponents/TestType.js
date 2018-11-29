import React, { Component } from 'react';
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

const Select = styled.select`
	width: 292px;
	height: 60px;
	font-size: 24px;
	padding-left: 16px;
	color: #4F9DA6;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	transition: font-size 0.5s ease-in-out;

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
		transition: font-size 1s ease-in-out;
		color: rgba(185, 4, 46, 0.5);
		border-bottom: 1px solid rgba(185, 4, 46, 1);
		::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
		::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
		:-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
		:-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
	`}
`;


class TestType extends Component {
	handleChange = (e) => {
        this.props.getInputValue(e, 'testType');
	}
	
	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.value !== this.props.value || nextProps.submitted !== this.props.submitted;
			
	}

	render() {
		const languages = ['Choose Type', 'JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<FlexChild>
				<Select
					value={this.props.value}
					invalid = {this.props.isFilled(this.props.value)}
					onChange={this.handleChange}
				>
					{
						languages.map((option, index) => (
							<option 
								key={index + 1}
								disabled = {index === 0 && this.props.value ? true : false}
							> 
								{option} 
							</option>
						))}
				</Select>
			</FlexChild>
		);
	}
}


function mapStateToProps(state) {
	return {
		submitted: state.testCreator.addQuestionSubmitted,
	}
}

export default connect(mapStateToProps, null)(TestType)