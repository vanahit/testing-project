import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import { connect } from 'react-redux';
import mainBackground from './img/main.jpg';
import BecomeCompany from './BecomeCompany';
import BecomeUser from './BecomeUser';
import Video from '../../components/HomePage/Video';
import TestSlider from './TestsSlider';


const Main = styled.div`
	margin: auto;
	max-width: 1920px;
	font-size: 24px;
    overflow: auto;
`; 

const Header = styled.div`
    position: relative;
    width: 100%;   
    height: 600px;		
    background-image: url(${mainBackground});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    box-sizing: border-box;
`;

const GetStartedDiv = styled.div`
    position: absolute;
    bottom:0;
    color: white;
    width: 100%;   
    min-height: ${props => props.height || '100px'};  
    z-index: 1;
    background-color: rgba(20, 18, 24, 0.75);
    font-size: 24px;
    box-sizing: border-box;	
`;

const FlexRow = styled.div`
    display: flex;
    margin: 19px auto;
    max-width: 1200px;
    flex-direction: row;
    justify-content: ${props => props.content || 'space-between'};  ;
	flex-wrap: wrap;
    box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
        min-width: 100%;
    }
`;

const FlexChild = styled.div`
	position: relative;
    width: ${props => props.width || ''};
    height: ${props => props.height || ''};    
    box-sizing: border-box; 
    
	@media screen and (max-width: 1190px) {
		margin: 20px 5px;
        max-width: 98%;
        min-width: 98%
	}
`;

const GetsStartedText = styled.span`
    font-size: 24px;
`;

const Button = styled.button`
    margin: 0 16px;
    width: ${props => props.width || ''};  
    height: 60px;
    border: 0;
    border-radius: 4px;
    padding: 16px;
    background-color:rgba(255, 89, 89, 1);
    color: white;
    font-weight: bold;
    font-size: 18px;
    box-sizing: border-box;
`;
const Title = styled.div`
    width: 100%;
    margin-top: 76px;
    margin-bottom: 30px;
    font-size: ${props => props.size || '34px'};  
    font-weight: bold;
    color:rgba(79, 157, 166, 1);
    border-bottom: 1px solid rgba(220, 220, 220, 1);
`;
const Description = styled.div`
    font-size: 20px;
    color: #100529;
`;

class HomePage extends Component {
	constructor(props) {
		super(props);
        this.state ={testsLoaded: this.props.testsLoaded};
        
    }
 
    componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded === true && this.props.testsLoaded !== prevProps.testsLoaded) {
            this.setState({testsLoaded: this.props.testsLoaded});
        }
     }

	render() {
        console.log(this.state.testsLoaded)
       	return (
			<Main>
                <Header>
                    <GetStartedDiv>
                        <FlexRow>
                            <FlexChild width={'1018px'}>
                                <GetsStartedText>
                                    DigiLearn is an all-in-one platform that makes it easy to create online tests, launch programming 
                                    companies, build landing pages, and design the perfect website.
                                </GetsStartedText>
                            </FlexChild>
                            <FlexChild>
                                <Button widht={'155px'}>
                                    GET STARTED
                                </Button>
                            </FlexChild>
                        </FlexRow>
                    </GetStartedDiv>
                </Header>
                <FlexRow>
                    <Title>
                         YOUR FIRST DESTINATION 
                    </Title>
                    <BecomeCompany />
                    <BecomeUser />
                </FlexRow>
                <FlexRow>
                    <Title>
                        WHAT WE DO?
                    </Title>
                <FlexChild width={'520px'}>
                    <Description>
                        Our main goal is cooperation, which we founded between our users and companies .We give opportunity to our 
                        users to make achievements by completing tests which created by our companies . It is important for us to 
                        create reliable collaboration. The best achievement will be for our users , to receive invitation from leading companies. 
                        For our companies the best achievement will be invitation the best users to their company.<br /> 
                        <b>DESTINATION WAS ACHIEVES.</b>
                    </Description>
                </FlexChild>
                <FlexChild width={'640px'}>
                   <Video />
                </FlexChild>      
                </FlexRow> 
                <FlexRow>
                    <Title>
                        MOST POPULAR TESTS
                    </Title>
                </FlexRow>
                <FlexRow>
                    {
                        this.state.testsLoaded 
                        ? <TestSlider />
                        : 'loading'
                    }
                </FlexRow>
                   
                      
            
            </Main>
		);
	}
}

function mapStateToProps(state) {
	return {
        tests: state.appReducer.test,
        testsLoaded: state.appReducer.testsLoaded
	}
}

export default connect(mapStateToProps, null)(HomePage)
