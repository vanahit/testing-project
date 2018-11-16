import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit() {

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