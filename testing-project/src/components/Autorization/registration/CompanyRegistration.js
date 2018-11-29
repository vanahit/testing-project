import React, {Component} from 'react';
import * as firebase from "firebase";

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);

        this.changeField = this.changeField.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
        }


    }

    changeField(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }

    signUpCompany() {

        if (this.state.password === this.state.confirmedPassword && this.state.password) {

            const companie = {...this.state};

            firebase.database().ref('companies').push(companie);

            firebase.auth()
                .createUserWithEmailAndPassword(
                    companie.email,
                    companie.password)
                .then(res => {
                    firebase.auth().currentUser.sendEmailVerification();
                    console.log(res);
                })
                .catch(e => console.log(e.message));

        } else {
            console.log('not equal');
        }
        this.setState({
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.signUpCompany();
    }


    render() {
        const {name, email, password, confirmedPassword} = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>

                <div className='registration'>
                    <h5>Register</h5>

                    <input
                        className='info-field'
                        type="text"
                        placeholder='COMPANY NAME *'
                        value={name}
                        onChange={(e) => this.changeField(e, 'name')}
                    />

                    <input
                        className='info-field'
                        type="email"
                        placeholder='EMAIL *'
                        value={email}
                        onChange={(e) => this.changeField(e, 'email')}
                    />

                    <input
                        className='info-field'
                        type="password"
                        placeholder='PASSWORD *'
                        value={password}
                        onChange={(e) => this.changeField(e, 'password')}
                    />

                    <input
                        className='info-field'
                        type="password"
                        placeholder='CONFIRM PASSWORD *'
                        value={confirmedPassword}
                        onChange={(e) => this.changeField(e, 'confirmedPassword')}
                    />

                    <p>By creating an account,you agree to
                        DigiLearn <span style={{color: '#FFAD5A'}}>Privacy Policy</span> and <br/><span
                            style={{color: '#FFAD5A', marginBottom: '15px'}}>Terms of use</span>.</p>

                    <input className='submit' type="submit"/>
                </div>

            </form>

        );
    }

}

export default CompanyRegistration;
