import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { editingTest, deleteTest } from '../../store/actions/testCreator';


class CompanyTests extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: this.props.tests,
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
			sortType: "testTitle",
			orderAscanding: true
		}
	}

	componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded !== prevProps.testsLoaded) {
			this.setState({data: this.props.tests});
			console.log(this.state.data)
        }
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

	deadline  = (date) => {
		let today = new Date(date);
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if(dd < 10) {
			dd = '0' + dd
		} 

		if (mm < 10) {
			mm = '0' + mm
		} 
		return	today = dd + '/' + mm + '/' + yyyy ;
	}

	deleteTest = (itemId) => {
		this.props.testDeletedClicked();
		this.props.deleteTest(itemId);
	}

	render(){
		let tests = [];
		if (this.state.data) {
			tests = this.state.data.filter(test => {
				return test.companyId === this.props.user.id;
			})
			console.log(tests);
		}
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { data, search, type, currentPage, dataPerPage, loadMore, sortType, orderAscanding } = this.state;
		let filterData = tests.filter( item => {
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
						this.state.data?
						currentData.map( item => {
							return (
								<tr key={item.id} >
									<td>{item.testTitle}</td>
									<td>
										{this.deadline(item.testDeadline)}
									</td>
									<td>{item.testType}</td>
									<td>
										<NavLink to={`/${this.props.user.name}/edit-test`}>
										<span className="edit" onClick={() => this.props.editingTest(item)}>Edit</span></NavLink>
									</td>
									<td >
										<span onClick={() => this.deleteTest(item.id)}>Delete</span>
									</td>
									<td><span className="passer">{item.passers}</span></td>
								</tr>
							)
						} )
						: "LOADER"
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

function mapStateToProps(state) {
	return {
		tests: state.appReducer.tests,
		testsLoaded: state.appReducer.testsLoaded,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		editingTest: (test) => dispatch(editingTest(test)),
		deleteTest: (testId) => dispatch(deleteTest(testId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTests)