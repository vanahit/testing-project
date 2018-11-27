import React, { Component } from 'react';
import AddTest from  '../../components/Company/AddTest';

export default class CompanyProfile extends Component{
	constructor(props){
		super(props);

		this.state={
			tests: []
		}
	}

	render(){
		return (
			<div>
				<AddTest />
			</div>
		);
	}
}