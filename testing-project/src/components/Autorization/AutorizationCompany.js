import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import NavLink from "react-router-dom/es/NavLink";


class AutorizationCompany extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            pass: '',
            email: '',

            showError: false,
        }
    }


    changeHandler(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }


    signIn(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(r => {
                localStorage.setItem("current", "company");
                this.props.userLogin('company');
                console.log(r.user)
            })
            .catch(err => console.log(err));
    }

    render() {

        return (
            <div>
                <div className='switch-buttons'>
                    <p>Home/Login Company</p>
                    <NavLink className='tab_button' activeClassName={'selected-tab'}
                             to={'/registration/company'}>COMPANY</NavLink>
                    <NavLink className='tab_button' to={'/registration/user'}>USER</NavLink>
                </div>
                <div className='container'>
                    <Login
                        login={this.state.pass}
                        email={this.state.email}
                        changeHandler={this.changeHandler}
                        signIn={this.signIn.bind(this)}/>
                    <CompanyRegistration/>
                </div>

            </div>
        );
    }
}

export default AutorizationCompany;

