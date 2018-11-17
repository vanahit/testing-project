import React, {Component} from 'react';
import ImgComponent from "./ImgComponent";
import InfoComponent from "./InfoComponent";

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            languages: [],
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            image: '',
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
        const obj = {...this.state};
        delete obj.data;

        this.setState({ data:[...this.state.data,obj] })
        this.setState({
            languages: [],
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            image: '',
        })
    }

    render() {

        const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];

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


                    <div className='skills'>
                        <h4>Skills</h4>
                        {languages.map((item,index) => (
                            <div key={item} className='language'>
                                <input type="checkbox"
                                       checked={this.state.languages.includes(item)}
                                       onChange={(e) => this.changeCheckboxHandler(e, item)}/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <input type="submit"/>
                </div>
            </form>

        );
    }

}

export default UserRegistration;