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
        console.log(typeof field);
        this.setState({
            [field]: e.target.value,
        })
    }

    makeRequeststoFirebase(obj) {
        firebase.database().ref('companies/' + obj.name).set(obj);

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
        const obj = {...this.state};
        this.makeRequeststoFirebase(obj);

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