import React from 'react';
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import * as firebase from "firebase";

const HeaderC = styled.div`
    background-color: #141218;
    width: 100%;
    
    @media only screen and (max-width: 600px) {
            background-color:red;
    }
`;

const HeaderWrapper = styled.div`
       margin: 0 auto;
       width: 1200px;
       height: 100px;
       display: flex;
       justify-content: space-between;
       align-items: center;
`;

const Logo = styled.div`
    width: 195px;
    height: 60px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    background-color: #FF5959;
`;

const HeaderNavigation = styled.div`
    display: flex;
    width: 430px;
    justify-content: space-between;
`;

const StyledLink = styled(NavLink)`
    color: white;
    font-size: 20px;
    font-weight: bold;
    // text-decoration: none;
    cursor: pointer;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const Header = (props) => {

    const logOut = () => {

        firebase.auth().signOut().then(function () {
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };

    return (

      <HeaderC>
            <HeaderWrapper>
                <NavLink to={'/'}>
                    <Logo>LOGO</Logo>
                </NavLink>

                <HeaderNavigation>
                    <StyledLink to={'/tests'}>TESTS</StyledLink>
                    <StyledLink to={'/companies'}>COMPANIES</StyledLink>
                    <StyledLink to={'/users'}>USERS</StyledLink>
                    <StyledLink to={'/AboutUs'}>ABOUT US</StyledLink>
                </HeaderNavigation>

                {props.currentLog ?
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <NavLink
                            style={{color: 'white', marginRight: '10px', border: '1px solid black', padding: '10px'}}
                            to={'/company/profile'}>MY ACCOUNT</NavLink>
                        <div className='header-log-in' onClick={() => logOut()}>LOG OUT</div>
                    </div>

                    : <NavLink to={'/authorization'}>
                        <div className='header-log-in'>LOG IN</div>
                    </NavLink>}
            </HeaderWrapper>

      </HeaderC>
    )
};

export default Header;
