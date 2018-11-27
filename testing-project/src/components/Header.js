import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className='header'>
            <NavLink to={'/'}><div className='logo'>LOGO</div></NavLink>

            <div className='navigation'>
                <NavLink to={'/tests'}>TESTS</NavLink>
                <NavLink to={'/companies'}>COMPANIES</NavLink>
                <NavLink to={'/users'}>USERS</NavLink>
                <NavLink to={'/AboutUs'}>ABOUT US</NavLink>
            </div>

            <NavLink to={'/authorization'}><div className='header-log-in'>LOG IN</div></NavLink>
        </header>
    )
};

export default Header;