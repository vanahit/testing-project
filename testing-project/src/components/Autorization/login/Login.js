import React from 'react';
import {firebase} from '../../../firebase/firebase';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.logIn();
    }

    logIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(console.log('signed'))
            .catch(function (error) {
                console.log(error);
            });

        setTimeout(() => {
            firebase.auth().signOut().then(function () {
                console.log('signed out')
            }).catch(function (error) {
                console.log(error);
            });
        }, 3000)
    }


    render() {
        return (
            <div className='login'>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        placeholder='email'
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder='password'
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Login;