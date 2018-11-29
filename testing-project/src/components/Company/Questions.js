import React, { Component } from 'react';

export default class Question extends Component{
	constructor(props){
		super(props)

		this.state = {
			popup: false
		}

	}

	addPopup () { this.setState({popup: true}) }

	render(){
		return (
			<div>
				<button className="addQuestion" onClick={this.addPopup.bind(this)}>Add Question</button>
				<h1>Questions</h1>
				{this.state.popup && <div className="overlay">
					<div className="content">
						<form>
							<div>
								<textarea placeholder="Write your question"></textarea>
								<div className="addAnswer">
									<input type="text" placeholder="Add Answer" />
									<button>Add</button>
								</div>
							</div>
							<hr />
							<div className="saveContent">
								<input type="submit" value="save" />
								<button>Close</button>
							</div>
						</form>
					</div>
				</div>}
			</div>
		);
	}
} 