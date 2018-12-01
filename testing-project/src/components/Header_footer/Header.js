import React from 'react';
import {NavLink} from "react-router-dom";
import * as firebase from "firebase";


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

            <nav className='navigation'>
                <NavLink to={'/tests/'}>TESTS</NavLink>
                <NavLink to={'/companies'}>COMPANIES</NavLink>
                <NavLink to={'/users'}>USERS</NavLink>
                <NavLink to={'/AboutUs'}>ABOUT US</NavLink>
            </nav>

            {props.isLogged ?
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <NavLink
                        style={{color: 'white', marginRight: '10px', border: '1px solid black', padding: '10px'}}
                        to={'/companyPage'}>MY ACCOUNT</NavLink>
                    <div className='header-log-in' onClick={() => logOut()}>LOG OUT</div>
                </div>

                : <NavLink to={'/authorization'}>
                    <div className='header-log-in' onClick={() => logOut()}>LOG IN</div>
                </NavLink>}
        </header>
    )
};

export default Header;
