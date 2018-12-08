import React, { Component } from 'react';
import src from '../../images/is.jpg';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/Loader';


const LoaderDiv = styled.div`
	margin: auto;
`;
const NavLinkDiv = styled(NavLink)`
	color: #100529;
	text-decoration: none;
`;
class AllCompanies extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: this.props.companies,
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
		}
	}

	componentDidUpdate(prevProps, prevState) {
        if (this.props.companiesLoaded !== prevProps.companiesLoaded) {
			this.setState({data: this.props.companies});
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

	render(){
		let selectSearchData = [];
		let filterData = [];
		let companies = [];
		const {search, type, currentPage, dataPerPage, loadMore } = this.state;

		if (this.state.data) {
			companies = this.state.data;
		}
			
			companies.reduce( (acc,item) => {
				acc.push(item.name);
				return acc
			}, selectSearchData )
	
			filterData = companies.filter( item => {
				return item.name.toLowerCase().substr(0,search.length) === search.toLowerCase()
			} )
		
		if(type !== ""){
			filterData = filterData.filter( item => item.name === type)
		}

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData+loadMore*dataPerPage);

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
				<div className="content-grid">
					{ 
						
						currentData.length ?
						currentData.map( item => {
							return (
								<TransitionGroup className="grid">
									<CSSTransition 
										in={true}
										appear={true}
										timeout={450}
										classNames="slide"
									>   
										
											<div className="companyUser" onClick={() => this.props.addCurrentItem(item)} key={item.id}>
												<img src={src} alt="Company Logo" className="logoCompany" />
												<div  className="grid-info">
													<h2>{item.name}</h2>
													<p>
														Lorem Ipsum is simply dummy text of the printing and typesetting industry.
													</p>
													<div className="testsDiv">
														<NavLinkDiv to={`/company-info-page/${item.name}`} >
															<span>All Tests</span>
														</NavLinkDiv >
													</div>
												</div>
											</div>
										
									</CSSTransition>
								</TransitionGroup>
							)
						} )

						:  <LoaderDiv><Loader/></LoaderDiv>
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
			: 'THERE IS NO COMPANIES YET'
		);
	}
}

function mapStateToProps(state) {
	return {
		companies: state.appReducer.companies,
		companiesLoaded: state.appReducer.companiesLoaded,
	}
	
}

export default connect(mapStateToProps, null)(AllCompanies)