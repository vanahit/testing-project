import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";
import {connect} from 'react-redux';
import * as firebase from "firebase";

class AutorizationCompany extends Component {

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


    signInCompany(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(r => console.log(r.user.uid))
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
                        signInCompany={this.signInCompany.bind(this)}/>
                    <CompanyRegistration/>
                </div>

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