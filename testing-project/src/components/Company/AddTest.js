import React, { Component } from 'react';
import Question from './Questions';

export default class AddTest extends Component{
	constructor(props){
		super(props);

		
	}

	render(){
		return (
			<div>
				<div className="content">
					<form>
						<h1>Test Information</h1>
						<div className="formContent">
							<input type="text" placeholder="Company Name" />
							<input type="text" placeholder="Text Name" />
							<select>
								<option value="Javascript">Javascript</option>
								<option value="PHP">PHP</option>
								<option value="MySQL">MySQL</option>
								<option value="Wordpress">Wordpress</option>
								<option value="Laravel">Laravel</option>
								<option value="Java">Java</option>
								<option value="Android">Android</option>
								<option value="React">React</option>
							</select>
							<input type="date" placeholder="Date" />
							<input type="time" placeholder="Time" />
						</div>
						<Question />
					</form>
				</div>
			</div>
		);
	}
}