import React, { Component } from 'react';
import src from '../../images/is.jpg';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';

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

	render(){
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { data, search, type, currentPage, dataPerPage, loadMore } = this.state;
		let users = [];
		if (this.state.data) {
			users = this.state.data;
			console.log(this.state.data)
		}
	// 	let filterData = users.filter( item => {
	// 		return item.testTitle.toLowerCase().substr(0,search.length) === search.toLowerCase()
	// 	} )

	// 	if(type !== ""){
	// 		filterData = filterData.filter( item => item.testType === type)
	// 	}

	// const indexOfLastData = currentPage * dataPerPage;
    // const indexOfFirstData = indexOfLastData - dataPerPage;
    // const currentData = filterData.slice(indexOfFirstData, indexOfLastData+loadMore*dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(users.length / dataPerPage); i++) {
			pages.push(i);
		}

		return (
			<div className="container-fluid">
				<Searching 
					{...this.state}
					searching={this.searching.bind(this)}
					currentDataLength={users.length}
					selectSearchData={selectSearchData}
				/>
				<div className="content-grid">
					{ this.state.usersLoaded
					?
						users.map( item => {
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
												<h2>{item.testTitle}</h2>
												<p>
													Lorem Ipsum is simply dummy text of the printing and typesetting industry.
												</p>
												<div className="testsDiv">
													<span>All Tests</span>
												</div>
											</div>
										</div>
									</CSSTransition>
								</TransitionGroup>
							)
						} )
						: "Loader"
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
		users: state.appReducer.users,
		usersLoaded: state.appReducer.usersLoaded,
	}
	
}

export default connect(mapStateToProps, null)(AllUsers)