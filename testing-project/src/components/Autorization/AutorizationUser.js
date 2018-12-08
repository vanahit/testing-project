import React, {Component} from 'react';
import Login from "./login/Login";
import UserRegistration from "./registration/UserRegistration";
import * as firebase from "firebase";
<<<<<<< HEAD
import NavLink from "react-router-dom/es/NavLink";
=======
import styled from 'styled-components';

const MarginDiv = styled.div`
    margin: 30px auto;
`;

>>>>>>> anahit


class AutorizationUser extends Component {

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
            .then(r => {
                localStorage.setItem("current", "user");
                this.props.userLogin('user');
                console.log(r.user.uid)
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
<<<<<<< HEAD
            <div>
                <div className='switch-buttons'>
                    <p>Home/Login Company</p>
                    <NavLink className='tab_button'  to={'/registration/company'}>COMPANY</NavLink>
                    <NavLink className='tab_button' activeClassName={'selected-tab'} to={'/registration/user'}>USER</NavLink>
                </div>
=======
            <MarginDiv>
>>>>>>> anahit
                <div className='container'>
                    <Login
                        login={this.state.pass}
                        email={this.state.email}
                        changeHandler={this.changeHandler}
                        signIn={this.signIn.bind(this)}/>
                    <UserRegistration/>
                </div>

            </MarginDiv>
        );
    }
}

<<<<<<< HEAD
=======

>>>>>>> anahit
export default AutorizationUser;


