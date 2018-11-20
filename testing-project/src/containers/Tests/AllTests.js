import React, { Component } from 'react';
import src from '../../images/is.jpg';
import {firebase} from '../../firebase/firebase';

export default class AllTests extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: [],
			search: "",
		}
	}

	componentDidMount() {
		firebase.database().ref('tests').on('value',(snapshot)=>{
        const tests = [];
        snapshot.forEach(childSnapshot => {
            tests.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        });
        this.setState({data: tests})
        console.log(tests)
    });
	}


	render(){
		const filterData = this.state.data.filter( item => {
			return item.testTitle.toLowerCase().substr(0,this.state.search.length) === this.state.search.toLowerCase()
		} )


		const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<div className="container-fluid">
				<div className="searching">
					<select className="searchingSelect">
						<option className="hidden" value="">All Types</option>
						{languages.map( item => <option key={item} value={item}>{item}</option> )}
					</select>
					<input type="text" 
						className="search" 
						placeholder="Search" 
						value={this.state.search} 
						onChange={ e => this.setState({ search: e.target.value })} 
						/>
					<span>8/200</span>
				</div>
				<div className="content-grid">
					{
						filterData.map( item => {
							return (
								<div key={item.id} className="grid">
									<img src={src} alt="Type test" />
									<div  className="grid-info">
										<p className="blue">{item.testTitle}</p>
										<p className="yellow">{item.company}</p>
										<p><span>Passes: </span><span className="blue">0</span></p>
										<p><span>DeadLine: </span><span className="blue">{item.testDeadline}</span></p>
										<button className="addButton"><span >Add</span> <span className='add'>></span></button>
									</div>
								</div>
							)
						} )
					}
					
					
					
					
					<button className="viewMore">View More</button>
					<div className="pagination">
						<div className="paginationContent">
							<span> Previous </span>
							<div className="pages">
								<span>Pages:</span>
								<ul>
									<li>1</li>
									<li>2</li>
									<li>3</li>
									<li>...</li>
									<li>4</li>
									<li>5</li>
								</ul>
							</div>
							<span> Next </span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}