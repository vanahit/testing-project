import React, {Component} from 'react';
import Login from "./login/Login";
import UserRegistration from "./registration/UserRegistration";

class AutorizationUser extends Component {

    render() {
        return (
            <div className='container'>
                <UserRegistration />
                <Login/>
            </div>
        );
    }
}

export default AutorizationUser