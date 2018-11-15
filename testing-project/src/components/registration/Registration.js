import React, {Component} from 'react';
import './Registration.css';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <div>
                <p>Register new user</p>
                <form className="myForm" action="">
                    <input type="text" placeholder='name'/>
                    <input type="text" placeholder='surname'/>
                    <input type="text" placeholder='phone number'/>
                    <input type="text" placeholder='email'/>
                    <select name="" id="">

                    </select>
                    <input type="text" placeholder='password'/>
                    <input type="text" placeholder='confirm password'/>
                </form>
            </div>
        );
    }

}

export default Registration;