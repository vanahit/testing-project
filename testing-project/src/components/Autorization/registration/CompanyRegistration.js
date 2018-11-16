import React, {Component} from 'react';
import ImgComponent from "./ImgComponent";
import InfoComponent from "./InfoComponent";

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
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
        this.setState({
            [field]: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const obj = {...this.state};
        delete obj.data;

        this.setState({ data:[...this.state.data,obj] });
        this.setState({
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            image: '',
        })
    }


    render() {
        const {name, surname, email, phone, password, img} = this.state;


        return (
            <form  onSubmit={this.handleSubmit.bind(this)}>

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