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

    registrateCompanie() {

        const db = firebase.database();
        const auth = firebase.auth();
        const singleCompanie = {...this.state};

        db.ref('companies').push(singleCompanie);

        auth.createUserWithEmailAndPassword(singleCompanie.email, singleCompanie.password)
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
        this.registrateCompanie();
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


// createUser() {
//     const user = firebase.auth();
//     user.createUserWithEmailAndPassword(this.state.email, this.state.password)
//         .then(res => {
//             console.log(res)
//             user.currentUser.sendEmailVerification();
//         });
// }


// db.ref(path).once('value')
//     .then(snapshot => {
//         const companies = [];
//         snapshot.forEach(childSnapshot => {
//             companies.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         });
//         console.log(companies)
//     });
//

//
//
//
// db.ref(path).on('value',(snapshot)=>{
//     const companies = [];
//     snapshot.forEach(childSnapshot => {
//         companies.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     });
//     console.log(companies)
// });
