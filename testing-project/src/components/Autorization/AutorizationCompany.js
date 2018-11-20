import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";
import {connect} from 'react-redux';
import * as firebase from "firebase";
import CompanyPage from "../CompanyPage";

class AutorizationCompany extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            pass: '',
            email: '',
            currentCompany: null,
        }
    }

    componentDidMount() {
        firebase.auth().signOut().then(function () {
        }, function (error) {
            console.error('Sign Out Error', error);
        });
        firebase.auth().onAuthStateChanged((currentCompany) => {
            if (currentCompany) {
                console.log('log in');
                this.setState({currentCompany})
            } else {
                console.log('log out');
                this.setState({currentCompany: null})
            }
        });
    }


    changeHandler(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }


    signUpCompany(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(r => console.log(r))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <div>
                {this.state.currentCompany ?
                    <div>
                        <CompanyPage/>
                    </div> :
                    <div className='container'>
                        <CompanyRegistration/>
                        <Login
                            login={this.state.pass}
                            email={this.state.email}
                            changeHandler={this.changeHandler}
                            signUpCompany={this.signUpCompany.bind(this)}/>
                    </div>}
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects,
    }
};

export default connect(mapStateToProps)(AutorizationCompany);