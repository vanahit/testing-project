import React, {Component} from 'react';
import * as firebase from "firebase";
import styled from 'styled-components';

const LoginDiv = styled.div`
    font-size: 34px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
`;

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
            validErrors: {name: true, email: true, password: true, confirmedPassword: true}
        }
        this.changeField = this.changeField.bind(this);
    }

    changeField(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }

    signUpCompany() {

        if (this.state.password === this.state.confirmedPassword && this.state.password  && this.state.name && this.state.email) {

            const company = {...this.state};

            firebase.auth()
                .createUserWithEmailAndPassword(company.email, company.password)
                .then(res => {
                    company.description = '';
                    company.image = '';
                    company.test = {};
                    company.id = res.uid;
                    company.type='company';
                    localStorage.setItem("current", "company");
                    firebase.database().ref(`companies/${res.uid}`).set(company);


                    firebase.auth().currentUser.sendEmailVerification();
                })
                .catch(e => console.log(e.message))


        } else {
             const obj = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmedPassword: this.state.confirmedPassword,
            }
            const objErrors = this.state.validErrors;
            for(let key in obj){
                if(obj[key] === ""){
                    objErrors[key] = false
                }
            }
            console.log('not equal');
        }
        this.setState({
            ...this.state
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.signUpCompany();
    }


    render() {
        const {name, email, password, confirmedPassword, validErrors} = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='registration'>
                    <div className='Logwrapper'>
                        <LoginDiv>Register</LoginDiv>
                        {validErrors.name === false && name==="" ? 
                            <input
                                className='info-field eror'
                                placeholder='Write Your Name *'
                                type="text"
                                value={name}
                                onChange={(e) => this.changeField(e, 'name')}
                            /> : 
                            <input
                                className='info-field'
                                placeholder='Name *'
                                type="text"
                                value={name}
                                onChange={(e) => this.changeField(e, 'name')}
                            /> }
                        {validErrors.email === false && email==="" ? 
                            <input
                                className='info-field eror'
                                placeholder='Write Your Email *'
                                type="text"
                                value={email}
                                onChange={(e) => this.changeField(e, 'email')}
                            /> : 
                            <input
                                className='info-field'
                                placeholder='Email *'
                                type="text"
                                value={email}
                                onChange={(e) => this.changeField(e, 'email')}
                            /> }
                        {validErrors.password === false && password==="" ? 
                            <input
                                className='info-field eror'
                                placeholder='Write Your Password *'
                                type="password"
                                value={password}
                                onChange={(e) => this.changeField(e, 'password')}
                            /> : 
                            <input
                                className='info-field'
                                placeholder='Password *'
                                type="password"
                                value={password}
                                onChange={(e) => this.changeField(e, 'password')}
                            /> }
                        {validErrors.confirmedPassword === false && confirmedPassword==="" ? 
                            <input
                                className='info-field eror'
                                placeholder='Write Your Password *'
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => this.changeField(e, 'confirmedPassword')}
                            /> : 
                            <input
                                className='info-field'
                                placeholder='Confirm Password *'
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => this.changeField(e, 'confirmedPassword')}
                            /> }

                        <p>By creating an account,you agree to
                            DigiLearn <span style={{color: '#FFAD5A'}}>Privacy Policy</span> and <br/><span
                                style={{color: '#FFAD5A', marginBottom: '15px'}}>Terms of use</span>.</p>
                            <input className='submit' type="submit" value="CREATE ACCOUNT" />
                    </div>
                </div>
            </form>
           
        );
    }
}

export default CompanyRegistration;
