import React, { Component } from 'react';
import src from '../../images/is.jpg';
import {firebase} from '../../firebase/firebase';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default class AllCompanies extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: [],
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
		}
	}

	componentDidMount() {
		firebase.database().ref('tests').on('value',(snapshot)=>{
        const tests = [];
        snapshot.forEach(childSnapshot => {
            tests.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        });
        this.setState({data: tests})
        console.log(tests)
    });
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
		const selectSearchData = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		const { data, search, type, currentPage, dataPerPage, loadMore } = this.state;
		let filterData = data.filter( item => {
			return item.testTitle.toLowerCase().substr(0,search.length) === search.toLowerCase()
		} )

		if(type !== ""){
			filterData = filterData.filter( item => item.testType === type)
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
						currentData.map( item => {
							return (
								<TransitionGroup className="grid">
									<CSSTransition 
										key={item.id}
										in={true}
										appear={true}
										timeout={450}
										classNames="slide"
									>
										<div key={item.id} >
											<img src={src} alt="Type test" />
											<div  className="grid-info">
												<p className="blue">{item.testTitle}</p>
												<p className="yellow">{item.company}</p>
												<p><span>Passes: </span><span className="blue">0</span></p>
												<p><span>DeadLine: </span><span className="blue">{item.testDeadline}</span></p>
												<button className="addButton"><span >Add</span> <span className='add'>></span></button>
											</div>
										</div>
									</CSSTransition>
								</TransitionGroup>
							)
						} )
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