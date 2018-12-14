import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled  from 'styled-components';
import Loader from '../../components/Loader';
import CompanySvg from '../../containers/Pages/CompanyInfoPage/CompanySvg';

const CompanySvgDiv = styled.div`
	margin: 0 auto;
	width: 100px;
	fill: rgba(16, 5, 41, 1);
	:hover {
		fill: #FF5959;
	}
`;

const NoTests = styled.div`
	font-size: 28px;
	margin: 100px 0;
	color: #141218;
`;

const LoaderDiv = styled.div`
	text-align: center;
	margin: 200px 0;
`;
const NavLinkDiv = styled(NavLink)`
	color: #100529;
	text-decoration: none;
`;
const CompanyName = styled.span`
	text-transform: uppercase;
`;
const TestsCount = styled.span`
	text-decoration: underline;
	color: #100529;
	font-size: 24px;
`;

class AllCompanies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.companies,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.companiesLoaded !== prevProps.companiesLoaded) {
			this.setState({ data: this.props.companies });
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
	getTests = (companyId) => {
		if (this.props.tests) {
			let tests = this.props.tests.filter(test => test.companyId === companyId);
			return tests.length;
		}
	}

	render() {
		let selectSearchData = [];
		let filterData = [];
		let companies = [];

		const { search, type, currentPage, dataPerPage, loadMore } = this.state;

		if (this.state.data) {
			companies = this.state.data;
		}

		companies.reduce((acc, item) => {
			acc.push(item.name);
			return acc
		}, selectSearchData)

		filterData = companies.filter(item => {
			return item.name.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.name === type)
		}

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
			pages.push(i);

		}
		return (
			this.state.data ?
				<div className="container-fluid">
					<Searching
						{...this.state}
						data={companies}
						searching={this.searching.bind(this)}
						currentDataLength={currentData.length}
						selectSearchData={selectSearchData}
					/>
					{this.state.data.length ?
						filterData.length ?
							<div className="content-grid">
								{currentData.map(item => {
									return (
										<TransitionGroup className="grid" key={item.id}>
									<CSSTransition
										in={true}
										appear={true}
										timeout={450}
										classNames="slide"
									>
										<div className="companyUser" onClick={() => this.props.addCurrentItem(item)} >
											<CompanySvgDiv> <CompanySvg /></CompanySvgDiv>
											<div className="grid-info">
												<h2><CompanyName>{item.name}</CompanyName></h2>
												<p>
													Lorem Ipsum is simply dummy text of the printing and typesetting industry.
													</p>
												<div className="testsDiv">
													<NavLinkDiv to={{
														pathname: `/company-info-page/${item.name}`,

													}}  >
														<TestsCount>{this.getTests(item.id)} Tests</TestsCount>
													</NavLinkDiv >
												</div>
											</div>
										</div>

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
							: <NoTests>Sorry, nothing was found!</NoTests>
						: <LoaderDiv><Loader /></LoaderDiv>
					}
				</div>
				: <NoTests>THERE IS NO COMPANIES YET</NoTests>
		);
	}
}

function mapStateToProps(state) {
	return {
		companies: state.appReducer.companies,
		companiesLoaded: state.appReducer.companiesLoaded,
		tests: state.appReducer.tests,
	}

}

export default connect(mapStateToProps, null)(AllCompanies)