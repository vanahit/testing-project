import React from 'react';
import {NavLink} from "react-router-dom";
import styled,{css} from 'styled-components';
import * as firebase from "firebase";
import Icon from './AccountSvg';


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
    text-decoration: none;
    cursor: pointer;

    &:link{
        text-decoration: none;
     }

    &:active, &:hover, &:focus {
        color: #FFAD5A;
        text-decoration: underline;
        
    }
`;

const LoginLogout = styled(NavLink)`
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 20px 40px;
    border: 1px solid #FFFFFF;  
    text-decoration: underline;
    cursor: pointer;

    :active, :hover, :focus {
        border-color: #FFAD5A;
        color: #FFAD5A;
       
    }
 
`;

const MyAccount = styled(NavLink)`
    display: inline-block;
    text-decoration: underline;
    fill: white;
    margin-right: 20px;
    color: white; 
    font-size: 20px;
    cursor: pointer;
    text-transform: uppercase;

    :active, :hover, :focus {
        color: #FFAD5A;
        fill: #FFAD5A;
    }
   
 `;
const IconSizes = styled.span`
    display: inline-block;
    margin-left: 10px;
    width: 25px;
    height: 20px;
`;

const Header = (props) => {

    const logOut = () => {
        console.log(props.currentLog)
        firebase.auth().signOut().then(function () {
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };

    return (
        
        <header style={{
            backgroundColor: '#141218',
            width: '100%',
        }}>

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

                {props.user?
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                      
                           
                            <MyAccount to={'/company/profile'}> 
                                {props.user.name}
                                <IconSizes><Icon /></IconSizes>
                            </MyAccount>
                        
                        
                        <LoginLogout to={'/company/profile'} onClick={() => logOut()}>LOG OUT</LoginLogout>
                    </div>

                    : <LoginLogout to={'/authorization'}>
                        LOG IN
                    </LoginLogout>}
            </HeaderWrapper>

        </header>
    )
};

export default Header;
