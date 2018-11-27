import React, {Component} from 'react';

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmedPassword:'',
        }
    }

    changeField(e, field) {
        console.log(field);
        this.setState({ [field]: e.target.value })
    }


    changeCheckboxHandler(e, lang) {
        let languages = this.state.languages;
        if (e.target.checked) {
            languages.push(lang);
        } else {
            languages = languages.filter(item => item !== lang);
        }
        this.setState({ languages });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmedPassword:'',
        })
    }

    render() {

        // const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];

        const {firstName, lastName, email, password,confirmedPassowrd} = this.state;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>

                <div className='registration'>
                    <h5>Register</h5>

                    <input
                        className='info-field'
                        type="text"
                        placeholder='FIRST NAME *'
                        value={firstName}
                        onChange={(e) => this.changeField(e, 'name')}
                    />
                    <input
                        className='info-field'
                        type="text"
                        placeholder='LAST NAME *'
                        value={lastName}
                        onChange={(e) => this.changeField(e, 'name')}
                    />
                    <input
                        className='info-field'
                        type="email"
                        placeholder='EMAIL *'
                        value={email}
                        onChange={(e) => this.changeField(e, 'name')}
                    />
                    <input
                        className='info-field'
                        type="password"
                        placeholder='PASSWORD *'
                        value={password}
                        onChange={(e) => this.changeField(e, 'name')}
                    />
                    <input
                        className='info-field'
                        type="password"
                        placeholder='CONFIRM PASSWORD *'
                        value={confirmedPassowrd}
                        onChange={(e) => this.changeField(e, 'name')}
                    />

                    <input type="submit"/>
                </div>
            </form>

        );
    }

}

export default UserRegistration;