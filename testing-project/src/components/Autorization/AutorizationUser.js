import React, {Component} from 'react';
import Login from "./login/Login";
import UserRegistration from "./registration/UserRegistration";
import * as firebase from "firebase";
import styled from 'styled-components';
import {Redirect} from "react-router";

const MarginDiv = styled.div`
    margin: 30px auto;
`;
class AutorizationUser extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            pass: '',
            email: '',
            errorMessage: ''
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
                localStorage.setItem("current", "user");
                this.props.userLogin('user');
                console.log(r.user.uid)
            })
            .catch(err => {
                this.setState({errorMessage: err.message})
                console.log(err)
            });
    }

    render() {
        return (
            <MarginDiv>
                {(this.props.user && localStorage.getItem("current") === "user") ?
                    <Redirect to={`/${this.props.user.firstName}${this.props.user.lastName}/profile`}/> :
                <div className='container'>
                    <Login
                        login={this.state.pass}
                        email={this.state.email}
                        changeHandler={this.changeHandler}
                        signIn={this.signIn.bind(this)}
                        errorMessage={this.state.errorMessage} />
                    <UserRegistration/>
                </div>
                }
            </MarginDiv>
        );
    }
}

export default AutorizationUser;


