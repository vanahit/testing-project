import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import TestComponent from '../../components/OneTestComponent/TestRender';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';

class AllTests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.tests,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
			unMounted: false,
		}
	}
	searching(e, searchProp) {
		this.setState({
			[searchProp]: e.target.value,
			currentPage: 1
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

	deadline(day) {
		return `${new Date(day).getFullYear()}.${new Date(day).getMonth()}.${new Date(day).getDate()}`
	}

	getTodayDate = () => {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}
		return today = yyyy + '-' + mm + '-' + dd;
	}

	compareDates = (stringDate) => {
		let today = new Date();
		today = this.getTodayDate(today);
		return Date.parse(stringDate) >= Date.parse(today);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.testsLoaded !== prevProps.testsLoaded) {
			this.setState({ data: this.props.tests });
		}

	}
	checkIfAdded = (testId) => {
		if (this.props.user && this.props.user.tests) {
			for (let i = 0; i < this.props.user.tests.length; i++) {
				if (testId ===  this.props.user.tests[i].id) {
					return true;
				}
			}
			return false;
		}
	}
	render() {
		let fillteredTests = [];
		let tests = [];
		if (this.state.data) {
			tests = this.state.data;
			fillteredTests = tests.filter(item => this.compareDates(item.testDeadline));
		}

		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { search, type, currentPage, dataPerPage, loadMore } = this.state;
		let filterData = fillteredTests.filter(item => {
			return item.testTitle.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.testType === type)
		}

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
			pages.push(i);
		}

		return (
			<div className="container-fluid">
				<Searching
					{...this.state}
					searching={this.searching.bind(this)}
					currentDataLength={currentData.length}
					selectSearchData={selectSearchData}
				/>
				<div className="content-grid">
					{
						currentData.map(item => {
							return (
								<TransitionGroup className="grid" key={item.id}>
									<CSSTransition
										in={this.state.unMounted ? false : true}
										appear={this.state.unMounted ? false : true}
										timeout={450}
										classNames="slide"
									>
										<TestComponent
											added={this.checkIfAdded(item.id)}
											test={item}
											user={this.props.user}
											testAddClicked={this.props.testAddClicked}
											userTestAdded={this.props.userTestAdded}
										/>
										</CSSTransition>
									</TransitionGroup>
								)
							})
					}

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

export default connect(mapStateToProps, null)(AllTests)