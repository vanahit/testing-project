import React, {Component} from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import  styled  from 'styled-components';
import { NavLink} from "react-router-dom";
import { addTest } from '../../store/actions/testPasser';
import {firebase} from '../../firebase/firebase';
import Loader from '../../components/Loader';

const NoTests = styled.div`
	font-size: 28px;
	margin: 100px 0;
	color: #141218;
`;

const LoaderDiv = styled.div`
	margin: auto;
`;

const TestsLink = styled(NavLink) `
	display: inline-block;
	text-decoration: none;
	paddin-bottom: 5px;
	border-bottom: 1px solid black;
	color: black;
	:hover {
		cursor: pointer;
	}

`;
class UserTests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: this.props.user.tests,
            search: "",
            type: "",
            currentPage: 1,
            dataPerPage: 4,
            loadMore: 0,
            sortType: "testTitle",
            orderAscanding: true
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
        this.setState({loadMore: this.state.loadMore + 1})
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

	deadline  = (date) => {
		let today = new Date(date);
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if(dd < 10) {
			dd = '0' + dd
		} 

		if (mm < 10) {
			mm = '0' + mm
		} 
		return	today = dd + '/' + mm + '/' + yyyy ;
	}

	componentDidUpdate(prevProps, prevState) {

    }

    deleteTest(testId) {
        let db = firebase.database();
        let deletedTest = db.ref(`user/${this.props.user.id}/tests/${testId}`);
        firebase.database().ref(`tests/${testId}`).child(`added`).set(false);
	    deletedTest.remove();
        
    }

    render() {
        console.log(this.props.user, this.props.user.tests)
        let tests = [];
		if (this.state.tests) {
            tests = this.state.tests.filter(test => {
                return test.userScore < 0
            });
        }
        
        
        const selectSearchData = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];
        const { search, type, currentPage, dataPerPage, loadMore, sortType, orderAscanding} = this.state;
        let filterData = tests.filter(item => {
            return item.testTitle.toLowerCase().substr(0, search.length) === search.toLowerCase()
        })

        if (type !== "") {
            filterData = filterData.filter(item => item.testType === type)
        }

        filterData.sort((a, b) => {
            let nameA;
            let nameB
            if (sortType !== "testDeadline") {
                nameA = a[sortType].toUpperCase();
                nameB = b[sortType].toUpperCase();
            } else {
                nameA = new Date(a.testDeadline)
                nameB = new Date(b.testDeadline)
            }
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
        })

        const indexOfLastData = currentPage * dataPerPage;
        const indexOfFirstData = indexOfLastData - dataPerPage;
        const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

        const pages = [];
        for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
            pages.push(i);
        }

        return (
            currentData.length ?
            <div className="container-table">
                <Searching
                    {...this.state}
                    data={tests}
                    searching={this.searching.bind(this)}
                    currentDataLength={currentData.length}
                    selectSearchData={selectSearchData}
                />
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
                        <th onClick={this.sorting.bind(this, "testDeadline")}>
                            {sortType === "testDeadline" && orderAscanding &&
                            <span className="sortArrowBottom"></span>}
                            {sortType === "testDeadline" && !orderAscanding &&
                            <span className="sortArrowTop"></span>}
                            Deadline
                        </th>
                        <th>Delete</th>
                        <th>Enrole Tests</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.tests  ?
                        currentData.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.testTitle}</td>
                                    <td>{item.testType}</td>
                                    <td>{item.company}</td>
                                    <td>
                                        {this.deadline(item.testDeadline)}
                                    </td>
                                    <td>
                                        <span onClick ={() => this.deleteTest(item.id)}>Delete</span>
                                    </td>
                                    <td>
                                        <NavLink to={`/${this.props.user.firstName}${this.props.user.lastName}/start-test`}>
                                            <button onClick={() => this.props.addTest(item) }>Start</button>
                                        </NavLink>
                                    </td>
                                </tr>
                            )
                        })
                     : <LoaderDiv> <Loader /> </LoaderDiv>
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
            </div>
            :   <NoTests> There is no tests yet {' '} 
                   <TestsLink  to={`/tests`} >  add test </TestsLink>
                </NoTests>
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
		addTest: test => dispatch(addTest(test)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTests)
