import React, {Component} from 'react';
import * as firebase from "firebase";


class CompanyPage extends Component {

    signOut(){
        firebase.auth().signOut().then(function () {
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    render() {
        return (
            <div>
                <h1>home</h1>
                <button onClick={this.signOut.bind(this)}>Log out</button>
            </div>
        );
    }
}


export default CompanyPage;
