import React, { Component } from 'react';
import styled from 'styled-components'
// Define our button, but with the use of props.theme this time
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  background: papayawhip;
`;

class QuizCreater extends Component {
	constructor(props) {
		super(props);
		this.state = {
			testTilte:'',
			testDeadline: null,

		}
	}
	render()
		{
			return(
			  <Wrapper>
			    <Title>
			      Hello World!
			    </Title>
			  </Wrapper>
			)
		}
}
export default QuizCreater;