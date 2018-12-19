import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import CompanySvg from '../../containers/Pages/CompanyInfoPage/CompanySvg';
import * as firebase from "firebase";
import { storage } from '../../firebase/firebase'
import styled from 'styled-components';
import bgImg from '../../images/Photos/companyProfileImage.jpg';

const WhiteBackgroundDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    height: 360px;
    width: 1200px;
    margin: 76px auto;
    max-width: 100%;
`;
const EmployiesDiv = styled.div`
    align-items: center;
    background-image: url(${bgImg});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    max-width: 100%;


`;
class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: this.props.user.image,
            progress: 0
        }

    }

    chooseImg(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image })
        }
    }

    handleUpload() {

        const { image } = this.state;
        if (image) {
            const uploadImage = storage.ref(`images/${this.props.user.id}/${image.name}`).put(image);


            uploadImage.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress })
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref(`images/${this.props.user.id}`).child(image.name).getDownloadURL().then(url => {
                        console.log(url)
                        this.setState({ url })
                    })
                })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            firebase.database().ref(`companies/${this.props.user.id}`).child('image').set(this.state.url);
            console.log("update data");
        }
    }

    render() {
        console.log(this.state.url)
        return (
            <div>
                <div>
                    <div className='company-profile'>
                        <div className='profile-logo' >
                            <div className="image-content image-contentCompany">
                                {this.state.url ? <img src={this.state.url} alt="Upload" /> : <CompanySvg />}
                                {this.state.url && <div className='uploadOverlay'></div>}
                                {!this.state.image ? <button onClick={this.handleUpload.bind(this)} className="uploadImage" disabled={true}>Upload</button> : <button onClick={this.handleUpload.bind(this)} className="uploadImage" >Upload</button>}
                            </div>
                            {this.state.progress !== 0 && <progress value={this.state.progress} className="progress red upload-progress" max="100" ></progress>}
                            <input type="file" name="file" id="file" className="upload" onChange={this.chooseImg.bind(this)} />


                        </div>
                        <div className='profile-synopsis'>
                            <div className='profile-synopsis-name'>{this.props.user.name}</div>
                            <div className='quote'>The <span>software agency</span> that doesnt work for you</div>
                            <div>{this.props.user.description}</div>
                        </div>
                    </div>
                    <EmployiesDiv>
                        <WhiteBackgroundDiv >
                            <div className='profile-create-test'>
                                <div>
                                    <div className='checked-icon'>
                                        <img src={require('../../images/checkbox.png')} alt='checkbox' />
                                        <span>You can find employee.</span>
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
                        </WhiteBackgroundDiv>
                    </EmployiesDiv>
                </div>
            </div>
        );
    }
}

export default CompanyProfile;