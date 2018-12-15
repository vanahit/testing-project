import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import CompanySvg from '../../containers/Pages/CompanyInfoPage/CompanySvg';
import * as firebase from "firebase";
import {storage} from '../../firebase/firebase'

class CompanyProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            url: ''
        }
    }

    chooseImg (e) {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState({image})
        }
    }

    handleUpload () {
        const { image } = this.state;
        const uploadImage = storage.ref(`images/${this.props.user.id}/${image.name}`).put(image);
        uploadImage.on('state_changed',
        (snapshot) => {

        },
        (error) => {

        },
        () => {
            storage.ref(`images/${this.props.user.id}`).child(image.name).getDownloadURL().then(url => {
                console.log(url)
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div className='company-profile'>
                        <div className='profile-logo' > 
                            <CompanySvg /> 
                            <input type="file" name="file" id="file" className="upload" onChange={this.chooseImg.bind(this)}  />
                            <button onClick={this.handleUpload.bind(this)}>Upload</button>
                        </div>
                        <div className='profile-synopsis'>
                            <div className='profile-synopsis-name'>{this.props.user.name}</div>
                            <div className='quote'>The <span>software agency</span> that doesnt work for you</div>
                            <div>{this.props.user.description}</div>
                        </div>
                    </div>
                    <div className='profile-find-employee'>
                        <div className='profile-create-test'>
                            <div>
                                <div className='checked-icon'>
                                    <img src={require('../../images/checkbox.png')} alt='checkbox' />
                                    <span>You can find employe.</span>
                                </div>
                                <div className='checked-icon'>
                                    <img src={require('../../images/checkbox.png')} alt='checkbox' />
                                    <span>You can add your own test.</span>
                                </div>
                            </div>
                            <div className='profile-buttons'>
                                <NavLink to={`/users`}>
                                    <button>FIND EMPLOYEE</button>
                                </NavLink>
                                <NavLink to={`/${this.props.user.name}/add-test`}>
                                    <button>CREATE TEST</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyProfile;