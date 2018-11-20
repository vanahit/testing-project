import React from 'react';
import {firebase} from '../../../firebase/firebase';
//
// class Login extends React.Component {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             email: '',
//             password: '',
//         };
//
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleSubmit(e) {
//         e.preventDefault();
//
//         this.logIn(e);
//
//     }
//
//     logIn(e) {
//         const db = firebase.database();
//
//         firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
//             .then(console.log(e.message))
//             .catch(e => console.log(e.message));
//
//
//     }
//
//
//     render() {
//         return (
//             <div className='login'>
//                 <h1>Login</h1>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder='email'
//                         value={this.state.email}
//                         onChange={(e) => this.setState({email: e.target.value})}
//                     />
//                     <input
//                         type="password"
//                         placeholder='password'
//                         value={this.state.password}
//                         onChange={(e) => this.setState({password: e.target.value})}
//                     />
//                     <input type="submit" value="Submit"/>
//                 </form>
//             </div>
//         )
//     }
// }

const Login = ({email, pass,signInCompany,changeHandler}) => {

    return (
        <div>
            <div className='login'>
                <h1>Login</h1>
                <form onSubmit={signInCompany}>
                    <input
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange={(e)=>changeHandler(e,'email')}
                    />
                    <input
                        type="password"
                        placeholder='password'
                        value={pass}
                        onChange={(e)=>changeHandler(e,'pass')}
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    );
};


export default Login;
