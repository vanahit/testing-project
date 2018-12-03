import React, { Component } from 'react';
import src from '../../images/is.jpg';
import {firebase} from '../../firebase/firebase';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';

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

	// componentDidMount() {
	// 	firebase.database().ref('companies').on('value',(snapshot)=>{
    //   const companies = [];
    //   snapshot.forEach(childSnapshot => {
    //       companies.push({
    //           id: childSnapshot.key,
    //           ...childSnapshot.val()
    //       })
    //   });
    //   this.setState({data: companies})
    //   console.log(companies)
    // });
	// }

	componentDidUpdate(prevProps, prevState) {
        if (this.props.companies === true && this.props.companies.companiesLoaded !== prevProps.companies.companiesLoaded) {
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
		// const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		let selectSearchData = [];
		let filterData = [];
		let data = [];
		const {search, type, currentPage, dataPerPage, loadMore } = this.state;

		if (this.state.data) {
			data = this.state.data;
		}
		
		if (this.state.data) {
				console.log(this.state.data + 'this is companies');
			data.reduce( (acc,item) => {
				acc.push(item.name);
				return acc
			}, selectSearchData )
	
			filterData = data.filter( item => {
				return item.name.toLowerCase().substr(0,search.length) === search.toLowerCase()
			} )
		}
		

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
			<div className="container-fluid">
				<Searching 
					{...this.state}
					searching={this.searching.bind(this)}
					currentDataLength={currentData.length}
					selectSearchData={selectSearchData}
				/>
				<div className="content-grid">
					{ 
						this.state.data 
						?
						currentData.map( item => {
							return (
								<TransitionGroup className="grid" key={item.id}>
									<CSSTransition 
										in={true}
										appear={true}
										timeout={450}
										classNames="slide"
									>
										<div key={item.id} className="companyUser">
											<img src={src} alt="Company Logo" className="logoCompany" />
											<div  className="grid-info">
												<h2>{item.name}</h2>
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

						: 'Loader'
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
		companies: state.appReducer.companies,
		companiesLoaded: state.appReducer.companiesLoaded,
	}
	
}

export default connect(mapStateToProps, null)(AllCompanies)