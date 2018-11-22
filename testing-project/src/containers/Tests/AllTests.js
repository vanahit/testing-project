import React, { Component } from 'react';
import src from '../../images/is.jpg';
import {firebase} from '../../firebase/firebase';
import Pagination from './Pagination';

export default class AllTests extends Component {
	constructor(props){
		super(props);

		this.state = {
			data: [],
			search: "",
			type:"",
			currentPage: 1,
			dataPerPage: 3,
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


	render(){
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


		const languages = ['JavaScript', 'Java', "PHP", 'C#', 'MySQL', 'Python', 'Ruby', 'Swift', 'React', 'Redux'];
		return (
			<div className="container-fluid">
				<div className="searching">
					<select 
						className="searchingSelect" 
						onChange={e => this.searching(e,'type')} value={type} >
						<option className="hidden" value="">All Types</option>
						{languages.map( item => <option key={item} value={item}>{item}</option> )}
					</select>
					<input type="text" 
						className="search" 
						placeholder="Search" 
						value={search} 
						onChange={e => this.searching(e,'search')} 
						/>
					<span>{dataPerPage}/{data.length}</span>
				</div>
				<div className="content-grid">
					{
						currentData.map( item => {
							return (
								<div key={item.id} className="grid">
									<img src={src} alt="Type test" />
									<div  className="grid-info">
										<p className="blue">{item.testTitle}</p>
										<p className="yellow">{item.company}</p>
										<p><span>Passes: </span><span className="blue">0</span></p>
										<p><span>DeadLine: </span><span className="blue">{item.testDeadline}</span></p>
										<button className="addButton"><span >Add</span> <span className='add'>></span></button>
									</div>
								</div>
							)
						} )
					}
					
					
					
					
					{loadMore + currentPage !== pages.length && <button className="viewMore" onClick={this.loadMore.bind(this)}>Load More</button>}
					{pages.length>1 && <div className="pagination">
						<div className="paginationContent">
							{loadMore + currentPage !== 1 && <span> Previous </span>}
							<div className="pages">
								<span>Pages:</span>
								<ul>
								{
									pages.map( page => {
										return (
											<li
												className={`${page == (currentPage+loadMore) ? 'active' : ""}`} 
												key={page} 
												id={page}
												onClick={this.pageClick.bind(this)}>
												{page}
											</li>
										)	
									} )
								}
								</ul>
							</div>
							{loadMore + currentPage !== pages.length && <span> Next </span>}
						</div>
					</div>}

					
				</div>
			</div>
		);
	}
}