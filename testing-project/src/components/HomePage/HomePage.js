import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import mainBackground from '../../images/home-page-bg.jpg';
import BecomeCompany from './components/BecomeCompany';
import BecomeUser from './components/BecomeUser';
import ForOurUser from './components/ForOurUser'
import ForOurCompany from './components/ForOurCompany'
import TestSlider from './components/TestsSlider';
import { Link } from 'react-router-dom';

const Main = styled.div`
	margin: auto;
	max-width: 100%;
    font-size: 24px;
    position:relative;
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
const AllTestsDiv = styled.div`
    width: 100%;
    text-align: right;
    margin-top: 16px;
    margin-right: 16px;
    margin-bottom: 76px;
`;
const AllTestsSpan = styled.span`
    color: #0286CD;
    font-size: 20px;
    text-decoration: underline;
    
`;
const Body = styled.div`
    max-width: 1200px;
    margin: auto;
   
`;

class HomePage extends Component {
	constructor(props) {
		super(props);
        this.state ={
            testsLoaded: this.props.testsLoaded,
        };
        
    }
 
    componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded === true && this.props.testsLoaded !== prevProps.testsLoaded) {
            this.setState({testsLoaded: this.props.testsLoaded});
        }
     }
	render() {
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
                <Body>
                    <FlexRow>
                        <Title>
                            YOUR FIRST DESTINATION 
                        </Title>

                        <BecomeCompany />
                        <BecomeUser />
                        <ForOurUser />
                        <ForOurCompany />

                        <Title>
                            MOST POPULAR TESTS
                        </Title>

                    </FlexRow>

                    <FlexRow>
                        {
                            this.state.testsLoaded 
                            ? <TestSlider 
                                user={this.props.user}
                                testAddClicked={this.props.testAddClicked}
                                userTestAdded={this.props.userTestAdded}
                            />
                            : 'loading'
                        }
                    </FlexRow>
                    <AllTestsDiv>
                        <Link to='/tests'> <AllTestsSpan>View All Tests</AllTestsSpan> </Link>
                    </AllTestsDiv>
                </Body>   
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

