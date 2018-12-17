import React, {Component} from 'react';
import CompanyTests from './CompanyTests';
import styled from 'styled-components';
import CompanySvg from './CompanySvg';
import PopUpLogin from '../../../components/PopUps/PopUpLogin';

const CompanySvgDiv = styled.div`
	width: 200px;
	margin: auto;
	:hover {
		fill: #FF5959;
	}
`;


export default class CompaniesInUser extends Component {
	constructor(props){
		super(props)
		this.state={
			testAddClicked: false
		}
	}
	testAddClicked = () => {
        this.setState({ testAddClicked: !this.state.testAddClicked });
    };
	render(){
		return(
			<div>
			{this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked} />}
			this.props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
					<div className="imgDiv">
						< CompanySvgDiv> <CompanySvg /> </ CompanySvgDiv>
					</div>
					<div className="infoUser">
						<h2>{this.props.item.name}</h2>
						<div className="desc">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
						</div>
					</div>
				</div>
				<div className="labelHeader">Company Tests</div>
				 <CompanyTests 
					 testAddClicked={this.testAddClicked}
					 userTestAdded={this.props.userTestAdded}
					 user={this.props.user} 
					 item={this.props.item}
					/> 
			</div>
			</div>
		);	
	}
}