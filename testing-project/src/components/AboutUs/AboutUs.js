import React from 'react';
import styled from 'styled-components';
import img from '../../images/Photos/photo-1520492943297-59dc5f2d0fe6.jpg';

import davit from '../../images/ourImages/davit.jpg';
import mkrtich from '../../images/ourImages/mkrtich.jpg';
import hayk from '../../images/ourImages/hayk.jpg';
import anahit from '../../images/ourImages/anahit.jpg';


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

const Box = ({boxItem, count}) => (
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
            {count}
        </div>
        <div style={{
            color: 'white',
            fontSize: '34px',
            marginTop: '15px',
        }}>
            {boxItem}
        </div>
    </BoxStyle>
);


const TeamMemberImage = styled.div`
    width:282px;
    height:282px;
    border: 1px solid black;
    background-position: center center;
`;

const MemberBox = ({image, name, profession}) => (
    <div>
        <TeamMemberImage style={{
            background: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: ' center center',
            backgroundSize: 'cover',
        }}/>
        <div style={{
            textAlign: 'center',
            margin: '16px 0 30px',
        }}>
            <div style={{fontSize: '24px', color: '#100529', fontWeight: 'bold', marginBottom: '8px'}}>{name}</div>
            <div style={{fontSize: '20px', color: '#FFAD5A'}}>{profession}</div>
        </div>
    </div>

);

const
    AboutUs = () => {
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
                            important for us to create reliable collaboration. The best achievement will be for our
                            users ,
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
                            <Box count={345} boxItem={'TESTS'}/>
                            <Box count={34534} boxItem={'COMPANIES'}/>
                            <Box count={653} boxItem={'USERS'}/>

                        </div>
                    </Wrapper>
                </Main>

                <div style={{
                    width: '1200px',
                    color: '#4F9DA6',
                    fontSize: "34px",
                    margin: '60px auto 30px',
                    borderBottom: '2px solid #E7E7E7',
                }}>OUR TEAM
                </div>


                <div style={{
                    display: 'flex',
                    width: '1200px',
                    margin: '0 auto',
                    justifyContent: 'space-between'

                }}>
                    <MemberBox name={'Davit'} image={davit} profession={'UI/UX Designer'}/>
                    <MemberBox name={'Hayk'} image={hayk} profession={'JavaScript Developer'}/>
                    <MemberBox name={'Mkrtich'} image={mkrtich} profession={'JavaScript Developer'}/>
                    <MemberBox name={'Anahit'} image={anahit} profession={'JavaScript Developer'}/>

                </div>

                <div style={{width: '1200px', margin: '0 auto 76px'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>

            </div>

        );
    };

export default AboutUs;