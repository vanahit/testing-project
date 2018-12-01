import React from 'react';
import styled from 'styled-components';
import img from '../../images/Photos/photo-1520492943297-59dc5f2d0fe6.jpg';


const Main = styled.div`
	width:100%;
	background-image: url(${img});
	background-position:center;
	background-size: cover;
	
`;

const Members = styled.div`
    
`;

const Wrapper = styled.div`
        padding:160px 380px;
`;


const Description = styled.div`
      max-width:1150px;
      font-size:24px;
      margin:30px 0 100px;
      color:white;
`;

const BoxStyle = styled.div`
    width:368px;
    height:294px;
    background-color:#FF5959;
    opacity:0.7;
    display:flex;
    flex-direction:column;
    align-items:center;   
`;

const Box = () => (
    <BoxStyle>
        <div style={{width: '48px', height: '48px', backgroundColor: 'black', margin: '32px 0'}}/>
        <div style={{
            borderBottom: '1px solid black',
            width: '270px',
            textAlign: 'center',
            fontSize: '60px',
            paddingBottom: '40px',
            borderColor: 'white',
            color: 'white',
        }}>
            6786
        </div>
        <div style={{
            color: 'white',
            fontSize: '34px',
            marginTop: '15px',
        }}>
            Tests
        </div>
    </BoxStyle>
);


const AboutUs = () => {
    return (
        <div>

            <Main>
                <Wrapper>
                    <div style={{
                        color: 'white',
                        fontSize: '60px',

                    }}>ABOUT DIGILEARN
                    </div>

                    <Description>
                        Our main goal is cooperation, which we founded between our users and companies .We give
                        opportunity
                        to our users to make achievements by completing tests which created by our companies . It is
                        important for us to create reliable collaboration. The best achievement will be for our users ,
                        to
                        receive invitation from leading companies. For our companies the best achievement will be
                        invitation
                        the best users to their company. <span
                        style={{color: '#FFAD5A'}}>DESTINATION WAS ACHIEVES.</span>
                    </Description>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Box/>
                        <Box/>
                        <Box/>

                    </div>
                </Wrapper>
            </Main>

            <div style={{
                width:'1200px',
                color:'#4F9DA6',
                fontSize:"34px",
                margin:'60px auto 30px',
                borderBottom:'2px solid #E7E7E7',
            }}>OUR TEAM</div>

        </div>


    );
};

export default AboutUs;