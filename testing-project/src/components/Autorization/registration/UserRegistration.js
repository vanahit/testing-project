import React, {Component} from 'react';
import * as firebase from "firebase";

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmedPassword: '',
            languages: [],
            skillsContent: false
        }
    }

    changeField(e, field) {
        console.log(field);
        this.setState({[field]: e.target.value})
    }


    changeCheckboxHandler(e, lang) {
        let languages = this.state.languages;
        if (e.target.checked) {
            languages.push(lang);
        } else {
            languages = languages.filter(item => item !== lang);
        }
        this.setState({languages});
        console.log(languages)
    }

    showSkills() {
        this.setState({skillsContent: !this.state.skillsContent})
    }

    signUpUser() {

        if (this.state.password === this.state.confirmedPassword && this.state.password) {

            const user = {...this.state};


            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    firebase.auth().currentUser.sendEmailVerification();
                    user.description = '';
                    user.image = '';
                    user.id = res.uid;
                    user.type='user';
                    localStorage.setItem("current", "user");
                    firebase.database().ref(`user/${res.uid}`).set(user);
                    // firebase.database().ref('user').push(user);
                    console.log(res);
                })
                .catch(e => console.log(e.message));

        } else {
            console.log('not equal');
        }
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmedPassword: '',
            languages: []
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.signUpUser();
    }


    render() {

        const languages = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];

        const {firstName, lastName, email, password, confirmedPassword, skillsContent} = this.state;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>

                <div className='registration'>
                    <div className='Logwrapper'>
                        <h5>Register</h5>

                        <input
                            required
                            className='info-field'
                            type="text"
                            placeholder='FIRST NAME *'
                            value={firstName}
                            onChange={(e) => this.changeField(e, 'firstName')}
                        />
                        <input
                            required
                            className='info-field'
                            type="text"
                            placeholder='LAST NAME *'
                            value={lastName}
                            onChange={(e) => this.changeField(e, 'lastName')}
                        />
                        <input
                            required
                            className='info-field'
                            type="email"
                            placeholder='EMAIL *'
                            value={email}
                            onChange={(e) => this.changeField(e, 'email')}
                        />
                        <input
                            required
                            className='info-field'
                            type="password"
                            placeholder='PASSWORD *'
                            value={password}
                            onChange={(e) => this.changeField(e, 'password')}
                        />
                        <input
                            required
                            className='info-field'
                            type="password"
                            placeholder='CONFIRM PASSWORD *'
                            value={confirmedPassword}
                            onChange={(e) => this.changeField(e, 'confirmedPassword')}
                        />
                        <div className="skills">
                            Skills
                            {skillsContent ?
                                <span
                                    className="sortArrowBottom"
                                >
                            </span> :
                                <span
                                    className="sortArrowTop"
                                    onClick={this.showSkills.bind(this)}>
                            </span>}
                            <div className="absolute" onClick={this.showSkills.bind(this)}/>
                            {<div className={skillsContent ? "skills-content" : "skills-content-none"}>
                                {
                                    languages.map((item, index) => {
                                        return (
                                            <div className="skill" key={index}>

                                                       type="checkbox"
                                                       onChange={e => this.changeCheckboxHandler(e, item)}/>
                                                <span>{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>}
                        </div>
                        <div className="textInformation">
                            By creating an account, you creating to DigiLearn <span>Privacy Policy</span> and <span>Terms of use</span>
                        </div>
                        <input type="submit" className="registr" value="Create Acount"/>
                    </div>

                </div>
            </form>

        );
    }

}

export default UserRegistration;