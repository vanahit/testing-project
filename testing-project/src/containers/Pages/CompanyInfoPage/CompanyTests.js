import React, { Component } from 'react';
import Searching from '../Searching';
import Pagination from '../Pagination';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from '../../../components/Loader';
import firebase from 'firebase';
import { addUserTest } from '../../../store/actions/appAction';

const LoaderDiv = styled.div`
	margin: auto;
`;

const NoTests = styled.div`
	font-size: 28px;
	margin: 100px 0;
	color: #141218;
`;

const Button = styled.button`
	margin: 0 26px 26px 0;
    width: ${props => props.width || '90px'};  
    height: 44px;
    border: 0;
    border-radius: 4px;
    background-color: ${props => props.disabled ?  '#4F9DA6' : 'rgba(255, 89, 89, 1)'};
	color: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    font-weight: bold;
    font-size: 20px;
	box-sizing: border-box;
	: hover {
		cursor: ${props => props.disabled === true ? '' : 'pointer'}
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
			orderAscanding: true,
			added: false,
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

	componentDidUpdate(prevProps) {
		if (this.props.testsLoaded !== prevProps.testsLoaded) {
			this.setState({ data: this.props.tests });
		}
	}
	checkIfAdded = (testId) => {
		if (this.props.user && this.props.user.tests) {
			for (let i = 0; i < this.props.user.tests.length; i++) {
				if (testId === this.props.user.tests[i].id) {
					return true;
				}
			}
			return false;
		}
	}
	add = (test) => {
		if (this.props.user && this.props.user.type === 'user') {
			let userUrl = this.props.user.id;
			firebase.database().ref(`user/${this.props.user.id}/tests`).once('value', (snapshot) => {
				if (snapshot.hasChild(`${test.id}`)) {

				} else {
					this.props.userTestAdded();
					this.props.addUserTest(test);
					let userRef = firebase.database().ref(`user/${userUrl}`);
					userRef.child('tests').child(`${test.id}`).set({ ...test, userScore: -1 });
				}
			});
		} else {
			this.props.testAddClicked();
		}
	}
	render() {
		let tests;
		if (this.state.data) {
			tests = this.state.data.filter(test => test.companyId === this.state.company.id && !test.deleted);
		}
		const selectSearchData = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];
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
			tests.length ?
				<div className="container-table">
					<Searching
						{...this.state}
						data={tests}
						searching={this.searching.bind(this)}
						currentDataLength={currentData.length}
						selectSearchData={selectSearchData}
					/>
					{tests ?
						filterData.length ?
							<>
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

										{currentData.map(item => {
											return (
												<tr key={item.id} >
													<td>{item.testTitle}</td>
													<td>{item.testType}</td>
													<td>{item.testDeadline}</td>
													<td>
													{
														(this.props.user && this.props.user.type !== 'company') || !this.props.user
															? <Button
																onClick={() => this.add(item)}
																disabled={this.checkIfAdded(item.id)}
															>
																{this.checkIfAdded (item.id) === true ? 'Added' : 'Add'}
															</Button>
															: ""
													}</td>
												</tr>
											)
										})
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
							</>
							: <NoTests>Sorry, nothing was found!</NoTests>

						: <LoaderDiv><Loader /></LoaderDiv>

					}

				</div>
				: <NoTests> There is no tests yet. </NoTests>

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
		addUserTest: test => dispatch(addUserTest(test)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTests)