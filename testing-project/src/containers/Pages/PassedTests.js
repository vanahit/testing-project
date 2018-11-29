import React, { Component } from 'react';
import src from '../../images/is.jpg';
import {firebase} from '../../firebase/firebase';
import Searching from './Searching';
import Pagination from './Pagination';

export default class PassedTests extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: [],
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
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

	searching (e, searchProp) {
		this.setState({ 
			[searchProp]: e.target.value,
			currentPage: 1 
		})
	}

	pageClick (e) {
		this.setState({ 
			currentPage: Number(e.target.id),
			loadMore: 0 
		})
	}

	loadMore (e) {
		this.setState({ loadMore: this.state.loadMore+1 })
	}

	prev () { 
		this.setState({ 
			currentPage: this.state.currentPage + this.state.loadMore - 1,
			loadMore: 0  
		}) 
	}

	next () { 
		this.setState({ 
			currentPage: this.state.currentPage + this.state.loadMore + 1,
			loadMore: 0  
		}) 
	}

	render(){
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { data, search, type, currentPage, dataPerPage, loadMore } = this.state;
		let filterData = data.filter( item => {
			return item.testTitle.toLowerCase().substr(0,search.length) === search.toLowerCase()
		} )

		if(type !== ""){
			filterData = filterData.filter( item => item.testType === type)
		}

		const indexOfLastData = currentPage * dataPerPage;
	    const indexOfFirstData = indexOfLastData - dataPerPage;
	    const currentData = filterData.slice(indexOfFirstData, indexOfLastData+loadMore*dataPerPage);

	    const pages = [];
	    for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
	      pages.push(i);
	    }

		return (
			<div className="container-table">
				<Searching 
					{...this.state}
					searching={this.searching.bind(this)}
					currentDataLength={currentData.length}
					selectSearchData={selectSearchData}
				/>
				<table className="dataTable">
					<thead>
						<tr>
							<th>Title</th>
							<th>Type</th>
							<th>Company</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
					{
						currentData.map( item => {
							return (
								<tr key={item.id} >
									<td>{item.testTitle}</td>
									<td>{item.testType}</td>
									<td>{item.company}</td>
									<td>{item.passScore}/{item.totalScore}</td>
								</tr>
							)
						} )
					}
					</tbody>
					
				</table>
				<Pagination 
						load_More={loadMore}
						loadMore={this.loadMore.bind(this)}
						currentPage={currentPage}
						prev={this.prev.bind(this)}
						pageClick={this.pageClick.bind(this)}
						next={this.next.bind(this)}
						pages={pages}
					/>					
			</div>
		);
	}
}