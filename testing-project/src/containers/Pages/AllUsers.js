import React, { Component } from 'react';
import src from '../../images/generic-avatar.png';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import {NavLink, Route} from "react-router-dom";
import styled from 'styled-components';
import Loader from '../../components/Loader';

const LoaderDiv = styled.div`
	margin: auto;
`;


class AllUsers extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: this.props.users,
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
		}
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

	componentDidUpdate(prevProps, prevState) {
        if (this.props.usersLoaded !== prevProps.usersLoaded) {
			this.setState({data: this.props.users});
		}
	}

	skills(arr){
		return arr.join(', ')
	}

	render(){
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux', "HTML"];
		const { data, search, type, currentPage, dataPerPage, loadMore } = this.state;
		let users = [];
		if (this.state.data) {
			users = this.state.data;
			console.log(this.state.data)
		}
		let filterData = users.filter( item => {
			return item.firstName.toLowerCase().substr(0,search.length) === search.toLowerCase() || 
					item.lastName.toLowerCase().substr(0,search.length) === search.toLowerCase()
		} )

		if(type !== ""){
			filterData = filterData.filter( item => item.languages.includes(type))
		}

		const indexOfLastData = currentPage * dataPerPage;
	    const indexOfFirstData = indexOfLastData - dataPerPage;
	    const currentData = filterData.slice(indexOfFirstData, indexOfLastData+loadMore*dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(users.length / dataPerPage); i++) {
			pages.push(i);
		}

		console.log(currentData);

		return (
			this.state.data ?
			<div className="container-fluid">
				<Searching 
					{...this.state}
					searching={this.searching.bind(this)}
					currentDataLength={currentData.length}
					selectSearchData={selectSearchData}
				/>
				<div className="content-grid">
					{this.state.data ?
						currentData.map( item => {
							return (
								<TransitionGroup className="grid" key={item.id}>
									<CSSTransition 
										in={true}
										appear={true}
										timeout={450}
										classNames="slide"
									>
										<div className="companyUser">
											<img src={src} alt="User Image" className="imgUser" />
											<div  className="grid-info">
												<h2>{item.firstName} {item.lastName}</h2>
												<div className="skillsDiv">
													<span className="gray">Skills: </span>
													<span className="orange"> {this.skills(item.languages)} </span>
												</div>
												<p>
													Lorem Ipsum is simply dummy text of the printing and typesetting industry.
												</p>
												<div className="testsDiv usersDiv">
													<NavLink to={{
														pathname:`/user-info-page/${item.firstName}${item.lastName}`,
														state: { 
															userInfo:item 
														}
													}} >
														<span>View Profile</span>
													</NavLink>
												</div>
											</div>
										</div>
									</CSSTransition>
								</TransitionGroup>
							)
						} )
						: <LoaderDiv><Loader/></LoaderDiv>
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
			: 'THERE IS NO USERS YET'
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