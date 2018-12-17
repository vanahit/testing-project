import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import Loader from '../../components/Loader';
import UserSvg from './UserSvg';

const Main = styled.div`
	max-width: 1200px;
	margin: auto;
`;
const UserSvgDiv = styled.div`
	margin: 8px auto;
	width: 150px;
	height: 150px;
	fill: rgba(16, 5, 41, 1);
	:hover {
		fill: #FF5959;
	}
`;
const UserImg = styled.img`
	height: 110px;
`;
const LoaderDiv = styled.div`
	text-align: center;
	margin: 200px 0;
`;

const NoTests = styled.div`
	font-size: 28px;
	margin: 100px 0;
	color: #141218;
`;

class AllUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.users,
			passers: this.props.passers,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
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

	componentDidUpdate(prevProps) {
		if (this.props.usersLoaded !== prevProps.usersLoaded) {
			this.setState({ data: this.props.users });
		}
	}

	skills(arr) {
		return arr.join(', ')
	}

	render() {
		const selectSearchData = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];
		const { search, type, currentPage, dataPerPage, loadMore } = this.state;
		let users = [];
		if (this.props.passers) {
			users = this.props.passers !== 'no' ?	users = this.state.passers : [];
		} else if (this.state.data) {
			users = this.state.data;
		}

		let filterData = users.filter(item => {
			return item.firstName.toLowerCase().substr(0, search.length) === search.toLowerCase() ||
				item.lastName.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.languages.includes(type))
		}

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(users.length / dataPerPage); i++) {
			pages.push(i);
		}
		return (
			<Main>
			{users.length ?
				<div className="container-fluid">
					<Searching
						{...this.state}
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
												<div className="">
													<UserSvgDiv className="image-content">
														{item.image ? <UserImg src={item.image} alt="User"  /> : <UserSvg />}
													</UserSvgDiv>
													<div className="grid-info">
														<h2>{item.firstName} {item.lastName}</h2>
														<div className="skillsDiv">
															<span className="gray">Skills: </span>
															<span className="orange"> {this.skills(item.languages)} </span>
														</div>
														<p>
															Lorem Ipsum is simply dummy text of the printing and typesetting industry.
												</p>
														<div className="testsDiv usersDiv">
															<NavLink to={`/user-info-page/${item.firstName}${item.lastName}`} >
																<span>View Profile</span>
															</NavLink>
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
				: <NoTests> {this.props.passers ? 'There is no passers yet' : 'There is no users yet' } </NoTests>
			}
			</Main>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.appReducer.users,
		usersLoaded: state.appReducer.usersLoaded,
	}

}

export default connect(mapStateToProps, null)(AllUsers)