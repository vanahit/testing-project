import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class CompanyProfile extends Component {
    render() {
        return (

            <div>
                <div>
                    <div className='company-profile'>
                        <div className='profile-logo'/>
                        <div className='profile-synopsis'>
                            <div className='profile-synopsis-name'>{this.props.user.name}</div>
                            <div className='quote'>The <span>software agency</span> that doesnt work for you</div>
                            <div>{this.props.user.description}</div>
                        </div>
                    </div>
                    <div className='profile-find-employee'>
                        <div className='profile-create-test'>
                            <div>
                                <div className='checked-icon'>
                                    <img src={require('../../images/checkbox.png')}/>
                                    <span>You can find employe.</span>
                                </div>
                                <div className='checked-icon'>
                                    <img src={require('../../images/checkbox.png')}/>
                                    <span>You can add your own test.</span>
                                </div>
                            </div>
                            <div className='profile-buttons'>
                                <NavLink to={`/users` }>
                                    <button>FIND EMPLOYEE</button>
                                </NavLink>
                                <NavLink to={`/${this.props.user.name}/add-test` }>
                                    <button>CREATE TEST</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyProfile;