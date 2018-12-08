import React, { Component } from 'react';
import Searching from '../Searching';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import  styled  from 'styled-components';
import { NavLink} from "react-router-dom";

const NoTests = styled.div`
	font-size: 28px;
	margin: 40px 0;

`;
const TestsLink = styled(NavLink) `
	display: inline-block;
	text-decoration: none;
	paddin-bottom: 5px;
	border-bottom: 1px solid black;
	color: black;
	:hover {
		cursor: pointer;
	}

`;
const Button = styled.button`
	font-size: 20px;
	font-weight: bold;
	padding: 10px 30px;
	border-radius: 4px;
	border: 1px solid #FF5959;
	: hover {
		cursor: pointer;
		background-color: #FF5959;
	}
`;

class CompanyTests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.tests,
			company: this.props.item,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
			sortType: "testTitle",
			orderAscanding: true
		}
	}
	searching(e, searchProp) {
		this.setState({
			[searchProp]: e.target.value,
			currentPage: 1
		})
	}

	sorting(sortType) {
		this.setState({
			orderAscanding: this.state.sortType !== sortType ? true : !this.state.orderAscanding,
			sortType,
		})
	}

	pageClick(e) {
		this.setState({
			currentPage: Number(e.target.id),
			loadMore: 0
		})
	}

	loadMore(e) {
		this.setState({ loadMore: this.state.loadMore + 1 })
	}

	prev() {
		this.setState({
			currentPage: this.state.currentPage + this.state.loadMore - 1,
			loadMore: 0
		})
	}

	next() {
		this.setState({
			currentPage: this.state.currentPage + this.state.loadMore + 1,
			loadMore: 0
		})
	}

	deadline = (date) => {
		let today = new Date(date);
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}
		return today = dd + '/' + mm + '/' + yyyy;
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.testsLoaded !== prevProps.testsLoaded) {
			this.setState({ data: this.props.tests });
		}
	}
	render() {
		console.log(this.props.item)
		let tests = [];
		if (this.state.tests) {
			tests = this.state.tests.filter(test => test.id === this.state.company.id);
			console.log(tests);
        }
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { search, type, currentPage, dataPerPage, loadMore, sortType, orderAscanding } = this.state;
		let filterData = tests.filter(item => {
			return item.testTitle.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.testType === type)
		}

		filterData.sort((a, b) => {
			let nameA = a[sortType].toUpperCase();
			let nameB = b[sortType].toUpperCase();
			if (orderAscanding) {
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
		});

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
			pages.push(i);
		}
		return (
			<div className="container-table">
				<Searching
					{...this.state}
					data={tests}
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
							<th onClick={this.sorting.bind(this, "testType")}>
								{sortType === "testType" && orderAscanding &&
									<span className="sortArrowBottom"></span>}
								{sortType === "testType" && !orderAscanding &&
									<span className="sortArrowTop"></span>}
								Type
							</th>
							<th onClick={this.sorting.bind(this, "company")}>
								{sortType === "company" && orderAscanding &&
									<span className="sortArrowBottom"></span>}
								{sortType === "company" && !orderAscanding &&
									<span className="sortArrowTop"></span>}
								Company
							</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{ this.state.data ?
							currentData.map((item, index) => {
								return (
									<tr key={item.id} >
										<td>{item.testTitle}</td>
										<td>{item.testType}</td>
										<td>{item.testDeadline}</td>
										<td><Button>ADD</Button></td>
									</tr>
								)
							})
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

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTests)