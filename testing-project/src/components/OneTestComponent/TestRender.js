import React, { Component } from 'react';
import styled from 'styled-components'
import js_svg from '../../images/typeIcons/js.svg';
import cplus_svg from '../../images/typeIcons/cplus.svg';
import php_svg from '../../images/typeIcons/php.svg';
import react_svg from '../../images/typeIcons/react.svg';
import css_svg from '../../images/typeIcons/css.svg';
import sharp_svg from '../../images/typeIcons/csharp.svg';
import non_svg from '../../images/typeIcons/non-type.svg';
import html_svg from '../../images/typeIcons/html.svg';
import { connect } from 'react-redux';
import PopUpLogin from '../PopUps/PopUpLogin';
import TestDescription from './TestDescription';

const TestBlock = styled.div`
	position: relative;
	width: 100%;
	border: 1px solid rgba(220, 220, 220, 1);
	border-radius: 4px;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
	box-sizing: border-box;
	

`;
const Details = styled.div`
	padding: 16px;
`;
const TestTitle = styled.div`
	font-size: 20px;
	color: #4F9DA6;
	font-weight: bold;
	margin-bottom: 8px;

`;
const Company = styled.div`
	font-size: 16px;
	color: #FFAD5A;
	font-weight: bold;
	margin-bottom: 8px;
`;

const Data = styled.span`
	font-size: 16px;
	color: #4F9DA6;
	margin-bottom: 8px;

`;

const ImgDiv = styled.div`
	width: 100%;
	box-sizing: border-box;
`;

const DataTitle = styled.div`
	font-size: 16px;
	color: black;
	margin-bottom: 8px;
`

const Button = styled.button`
	margin: 0 26px 26px 0;
    width: ${props => props.width || '90px'};  
    height: 44px;
    border: 0;
    border-radius: 4px;
    background-color:rgba(255, 89, 89, 1);
	color: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    font-weight: bold;
    font-size: 20px;
    box-sizing: border-box;
`;
const ButtonDiv = styled.div`
	text-align: right;
`;

const OnMouseOverArea = styled.div`
	position:absolute;
	z-index: 1;
	left: 3;
	width: 94%;
	height: 78%
	top:0;
	left: 0;
	
`;

class TestComponent extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			hover: false,
			balckDivCoords: {},
		}
		
	}

	convertDate = (date) => {
		let today = new Date(date);
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if(dd < 10) {
			dd = '0' + dd
		} 

		if (mm < 10) {
			mm = '0' + mm
		} 
		return	today = dd + '/' + mm + '/' + yyyy ;
	}

	chooseImg = () => {
		switch (this.props.test.testType) {
			case 'JavaScript' :
				return js_svg;
			case 'PHP' :
				return php_svg;
			case 'C#' :
				return sharp_svg;
			case 'React' :
				return react_svg;
			case 'HTML' :
				return html_svg;
			case 'CSS' :
				return css_svg;
			case 'C++' :
				return cplus_svg;
			default:
				return non_svg;
		}
	}

	add = () => {
		if (this.props.userLogin) {

		} else {
			this.props.testAddClicked();
		}
	}

	render() {
		let test = this.props.test;
		return(
			<>
			<TestBlock onMouseOver={this.props.onOver} onMouseOut={this.props.onOut}>
				
				<OnMouseOverArea   >
				</OnMouseOverArea>
					
					<ImgDiv>
						<object type="image/svg+xml" name="myicon" 
							data={this.chooseImg()}
							width="100%" height="100%" >
							Please upate your brouser
						</object>
						
					</ImgDiv>
					<Details>
						<TestTitle>
							{test.testTitle} 
						</TestTitle>
						<Company>
							{test.company} 
						</Company>	
						<DataTitle>
							Passes: {' '} 
							<Data>
								{test.passes ? test.passes : 0}
							</Data>
						</DataTitle>
						<DataTitle>
							Deadline:{' '} 
							<Data>
								{this.convertDate(test.testDeadline)}
							</Data>
						</DataTitle>
					</Details>
			
				<ButtonDiv>
					{
						!this.props.companyLogin 
						? <Button onClick={this.add}>Add ></Button>
						: ""
					}
				
				</ButtonDiv>
			</TestBlock>
		</>
		);
	}
}

function mapStateToProps(state) {
	return {
        userLogin: state.appReducer.userLogin,
		companyLogin: state.appReducer.companyLogin,
		
	}
}

export default connect(mapStateToProps, null)(TestComponent)
