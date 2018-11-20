import React, {Component} from 'react';
import ImgComponent from "./ImgComponent";
import InfoComponent from "./InfoComponent";
import * as firebase from "firebase";

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            image: '',
        }
    }

    changeField(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }

    signUpCompanie() {

        const companie = {...this.state};

        firebase.database().ref('companies').push(companie);

        firebase.auth().createUserWithEmailAndPassword(companie.email, companie.password)
            .then(res => {
                firebase.auth().currentUser.sendEmailVerification();
                console.log(res);
            })
            .catch(e => console.log(e.message));


        this.setState({
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            image: '',
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.signUpCompanie();
    }


    render() {
        const {name, surname, email, phone, password, img} = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>

                <div className='registration'>
                    <h2>Registration</h2>
                    <ImgComponent/>
                    <InfoComponent
                        changeField={this.changeField.bind(this)}
                        arr={[name, surname, email, phone, password]}
                    />
                    <input type="submit"/>
                </div>

            </form>

        );
    }

}

export default CompanyRegistration;
