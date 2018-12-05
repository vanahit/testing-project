import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import img from '../../images/Photos/photo-1520492943297-59dc5f2d0fe6.jpg';

import davit from '../../images/ourImages/davit.jpg';
import mkrtich from '../../images/ourImages/mkr.png';
import hayk from '../../images/ourImages/hayk.jpg';
import anahit from '../../images/ourImages/anahit.jpg';

import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';

import Loader from '../Loader';
import Animate from 'react-move/Animate';
import {easePolyOut} from 'd3-ease';


const Main = styled.div`
	width:100%;
	background-image: url(${img});
	background-position:center;
	background-size: cover;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:160px 380px;
`;

const ABOUT_DIGILEARN = styled.div`
    color: white;
    font-size: 60px;
`;

const Description = styled.div`
      max-width:1150px;
      font-size:24px;
      margin:30px 0 100px;
      color:white;
`;

const BoxWrapper = styled.div`
      width: 1200px;
      display: flex;
      justify-content: space-between;
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

const OurTeam = styled.div`
      display :flex;
      justify-content:space-between;
      width: 1200px;
      color: #4F9DA6;
      font-size: 34px;
      margin: 60px auto 30px;
      border-bottom: 1px solid #E7E7E7;
`;


const MemberBoxWrapper = styled.div`
       display: flex;
       width: 1200px;
       margin: 0 auto;
       justify-content: space-between;
}
`;


const TeamMemberImage = styled.div`
    width:282px;
    height:282px;
    background-position: center center;
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
            {count ? count : <Loader/>}
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

class AboutUs extends React.Component {

    state = {
        show: false,
        members: [
            {
                name: 'Anahit',
                image: anahit,
                profession: 'JavaScript Developer',

                start: -500,
                delay: 2000,
            },
            {
                name: 'Davit',
                image: davit,
                profession: 'UI/UX Designer',

                start: -500,
                delay: 1400,
            },
            {
                name: 'Hayk',
                image: hayk,
                profession: 'JavaScript Developer',

                start: -500,
                delay: 800,
            },
            {
                name: 'Mkrtich',
                image: mkrtich,
                profession: 'JavaScript Developer',

                start: -500,
                delay: 200,
            },
        ]
    };


    showMembers = () => (
        this.state.members.map((member, i) => (
            <Animate
                key={i}
                show={this.state.show}

                start={{
                    opacity: 0,
                    left: member.start,
                    rotate: 0,
                }}
                enter={{
                    opacity: [1],
                    left: [0],
                    rotate: [360],
                    timing: {delay: member.delay, duration: 1000, ease: easePolyOut}
                }}
            >
                {({left, rotate, opacity}) => {
                    return (
                        <div style={{
                            opacity,
                            transform: `rotateY(${rotate}deg) translate(${left}px`
                        }}>
                            <MemberBox
                                key={i}
                                name={member.name}
                                profession={member.profession}
                                image={member.image}

                            />
                        </div>

                    )
                }}

            </Animate>

        ))
    );

    render() {
        return (
            <div>
                <Main>
                    <Wrapper>
                        <ABOUT_DIGILEARN>ABOUT DIGILEARN</ABOUT_DIGILEARN>

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

                        <Zoom>
                            <BoxWrapper>
                                <Box count={this.props.tests} boxItem={'TESTS'}/>
                                <Box count={this.props.companies} boxItem={'COMPANIES'}/>
                                <Box count={this.props.users} boxItem={'USERS'}/>
                            </BoxWrapper>
                        </Zoom>

                    </Wrapper>
                </Main>

                <OurTeam>
                    <span>OUR TEAM</span>
                </OurTeam>


                <Reveal
                    fraction={1}
                    onReveal={() => {
                        this.setState({show: true})
                    }}
                >
                    <MemberBoxWrapper>
                        {this.showMembers()}
                    </MemberBoxWrapper>
                </Reveal>


                <div style={{width: '1200px', margin: '0 auto 76px', color: '#100529'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>

            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        tests: state.appReducer.tests.length,
        companies: state.appReducer.companies.length,
        users: state.appReducer.users.length,
    }

}

export default connect(mapStateToProps, null)(AboutUs)