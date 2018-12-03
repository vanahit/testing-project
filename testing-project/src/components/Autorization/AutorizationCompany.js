import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";
import {connect} from 'react-redux';
import * as firebase from "firebase";

export default class AutorizationCompany extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            pass: '',
            email: '',
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
            .then(r => console.log(r.user))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <Login
                        login={this.state.pass}
                        email={this.state.email}
                        changeHandler={this.changeHandler}
                        signIn={this.signIn.bind(this)}/>
                    <CompanyRegistration />
                </div>

            </div>
        );
    }
}
<<<<<<< HEAD

export default AutorizationCompany;
=======
>>>>>>> df36eb501de26c75c6ffc44d7f763de0bcd6a532
