import React, {Component} from 'react';
import PassedTests from './PassedTests';
import UserSvg from './UserSvg';
import * as firebase from "firebase";
import {storage} from '../../firebase/firebase'
import styled from 'styled-components';

const CompanySvgDiv = styled.div`
	margin: 0 auto;
	width: 100px;
	fill: rgba(16, 5, 41, 1);
	:hover {
		fill: #FF5959;
	}
`;

export default class UserProfile extends Component {
	constructor(props){
		super(props)

		this.state = {
            image: null,
            url: this.props.user.image,
            progress: 0
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
        if(image){
        const uploadImage = storage.ref(`images/${this.props.user.id}/${image.name}`).put(image);

        
            uploadImage.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress})
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref(`images/${this.props.user.id}`).child(image.name).getDownloadURL().then(url => {
                    console.log(url)
                    this.setState({url})
                })
            })
        }

    }

    componentDidUpdate (prevProps, prevState) {
        if(prevState.url !== this.state.url){
            firebase.database().ref(`user/${this.props.user.id}`).child('image').set(this.state.url);
            console.log("update data");
        }
    }

	render(){
		return (
			<div>
				<div className="userContent company-profile">
					<div className='profile-logo' > 
                        <div className="image-content">
                            {this.state.url ? <img src={this.state.url} alt="Upload" /> : <UserSvg /> }
                            {this.state.url && <div className='uploadOverlay'></div>}
                            { !this.state.image ? <button onClick={this.handleUpload.bind(this)} className="uploadImage" disabled={true}>Upload</button> : <button onClick={this.handleUpload.bind(this)} className="uploadImage" >Upload</button>}
                        </div>
                        {this.state.progress !== 0 && <progress value={this.state.progress} className="progress red upload-progress" max="100" ></progress>}
                        <input type="file" name="file" id="file" className="upload" onChange={this.chooseImg.bind(this)}  />
                        
                        
                    </div>
					<div className="infoUser">
						<h2>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h2>
						<div style={{padding: "20px"}}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</div>
					</div>
				</div>
				<div className="settings">
					<span>Edit</span>{` / `}<span>Profie Settings</span>
				</div>
				<div className="labelHeader">Passed Tests</div>
				<PassedTests user={this.props.user} />
			</div>
		);
	}

}