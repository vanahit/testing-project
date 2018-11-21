import React, { Component } from 'react';
import src from '../../images/is.jpg';
import {firebase} from '../../firebase/firebase';

export default class AllTests extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: [],
			search: "",
			currentPage: 1,
			dataPerPage: 2,
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

	pageClick (e) {
		this.setState({ currentPage: Number(e.target.id) })
	}


	render(){
		const { data, search, currentPage, dataPerPage } = this.state;
		const filterData = data.filter( item => {
			return item.testTitle.toLowerCase().substr(0,search.length) === search.toLowerCase()
		} )

		const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filterData.slice(indexOfFirstData, indexOfLastData);

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
      pages.push(i);
    }


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
						value={search} 
						onChange={ e => this.setState({ search: e.target.value })} 
						/>
					<span>8/200</span>
				</div>
				<div className="content-grid">
					{
						currentData.map( item => {
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
								{
									pages.map( page => {
										return (
											<li 
												key={page} 
												id={page}
												onClick={this.pageClick.bind(this)}>
												{page}
											</li>
										)	
									} )
								}
								</ul>
							</div>
							<span> Next </span>
						</div>
					</div>

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