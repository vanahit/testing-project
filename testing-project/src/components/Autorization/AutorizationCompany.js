import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";

class AutorizationCompany extends Component {

    render() {
        return (
            <div className='container'>
                <CompanyRegistration/>
                <Login/>
            </div>
        );
    }
}

export default AutorizationCompany;