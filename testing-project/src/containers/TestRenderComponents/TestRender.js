import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import js_svg from './icons/js.svg';
//import cplus_svg from './img/Cplus.svg';
import php_svg from './icons/php.svg';
import react_svg from './icons/react.svg';
//import css_svg from './img/C++.svg';
import sharp_svg from './icons/csharp.svg';
import non_svg from './icons/nonType.svg';


const TestBlock = styled.div`
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

export default class TestComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			test: this.props.test,
			img: '',
		}
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
			default:
				return non_svg;
		}
	}

	render() {
	    return(
			<TestBlock>
				<ImgDiv>
				   
					<object type="image/svg+xml" name="myicon" 
						data={this.chooseImg()}
						width="100%" height="100%" >
						Please upate your brouser
					</object>
					
				</ImgDiv>
				<Details>
					<TestTitle>
						{this.props.test.testTitle} 
					</TestTitle>
					<Company>
						{this.props.test.company} 
					</Company>	
					<DataTitle>
						Passes: {' '} 
						<Data>
							{this.props.test.passes ? this.props.test.passes : 0}
						</Data>
					</DataTitle>
					<DataTitle>
						Deadline:{' '} 
						<Data>
							{this.props.test.testDeadline}
						</Data>
					</DataTitle>
				</Details>
				<ButtonDiv>
					<Button >Add ></Button>
				</ButtonDiv>
			</TestBlock>
        );
    
	}
}

