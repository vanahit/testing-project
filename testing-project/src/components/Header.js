import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import * as firebase from "firebase";
import AboutUs from "./AboutUs/AboutUs";
import CompanyPage from "./Autorization/CompanyPage";


const Header = (props) => {

    const logOut = () => {
        firebase.auth().signOut().then(function () {
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };

    return (
        <header className='header'>
            <NavLink to={'/'}>
                <div className='logo'>LOGO</div>
            </NavLink>

            <div className='navigation'>
                <NavLink to={'/tests'}>TESTS</NavLink>
                <NavLink to={'/companies'}>COMPANIES</NavLink>
                <NavLink to={'/users'}>USERS</NavLink>
                <NavLink to={'/AboutUs'}>ABOUT US</NavLink>
            </div>

            {props.isLogged ?
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <NavLink to={''}>MY ACCOUNT</NavLink>
                    <div className='header-log-in' onClick={() => logOut()}>LOG OUT</div>
                </div>

                : <NavLink to={'/authorization'}>
                    <div className='header-log-in'>LOG IN</div>
                </NavLink>}
        </header>
    )
};

export default Header;
