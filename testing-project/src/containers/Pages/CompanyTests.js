import React, { Component } from 'react';
import {firebase} from '../../firebase/firebase';
import Searching from './Searching';
import Pagination from './Pagination';

export default class CompanyTests extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: [],
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
			sortType: "testTitle",
			orderAscanding: true
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

	sorting(sortType){
		this.setState({
			orderAscanding: this.state.sortType !== sortType ? true : !this.state.orderAscanding,
			sortType,
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

	deadline (day) {
	    return `${new Date(day).getFullYear()}.${new Date(day).getMonth()}.${new Date(day).getDate()}`
	}

	render(){
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { data, search, type, currentPage, dataPerPage, loadMore, sortType, orderAscanding } = this.state;
		let filterData = data.filter( item => {
			return item.testTitle.toLowerCase().substr(0,search.length) === search.toLowerCase()
		} )

		if(type !== ""){
			filterData = filterData.filter( item => item.testType === type)
		}

		filterData.sort((a, b) => {
			let nameA;
			let nameB
			if(sortType !== "testDeadline"){
				nameA = a[sortType].toUpperCase(); 
			  nameB = b[sortType].toUpperCase();
			} else {
				nameA = new Date(a.testDeadline)
				nameB = new Date(b.testDeadline)
			}
			if(orderAscanding){
		 		if (nameA < nameB) {
			    return -1;
			  }
			  if (nameA > nameB) {
			    return 1;
			  }
		  } else {
		  	if (nameA < nameB) {
			    return 1;
			  }
			  if (nameA > nameB) {
			    return -1;
			  }
		  }
	  	return 0;
		})

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
							<th onClick={this.sorting.bind(this, "testTitle")}>
								{sortType === "testTitle" && orderAscanding && 
									<span className="sortArrowBottom"></span>}
								{sortType === "testTitle" && !orderAscanding && 
									<span className="sortArrowTop"></span>}
								Title
							</th>
							<th onClick={this.sorting.bind(this, "testDeadline")}>
								{sortType === "testDeadline" && orderAscanding && 
									<span className="sortArrowBottom"></span>}
								{sortType === "testDeadline" && !orderAscanding && 
									<span className="sortArrowTop"></span>}
								Deadline
							</th>
							<th onClick={this.sorting.bind(this, "testType")}>
								{sortType === "testType" && orderAscanding && 
									<span className="sortArrowBottom"></span>}
								{sortType === "testType" && !orderAscanding && 
									<span className="sortArrowTop"></span>}
								Type
							</th>
							<th>Edit</th>
							<th>Delete</th>
							<th>Passes</th>
						</tr>
					</thead>
					<tbody>
					{
						currentData.map( item => {
							return (
								<tr key={item.id} >
									<td>{item.testTitle}</td>
									<td>
										{this.deadline(item.testDeadline)}
									</td>
									<td>{item.testType}</td>
									<td>
										<span className="edit">Edit</span>
									</td>
									<td >
										<span>Delete</span>
									</td>
									<td><span className="passer">{item.passers}</span></td>
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