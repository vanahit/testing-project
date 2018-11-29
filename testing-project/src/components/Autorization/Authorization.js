import React, {Component} from 'react';
import AutorizationUser from "./AutorizationUser";
import AutorizationCompany from "./AutorizationCompany";

import '../../App.css';
import {Redirect} from "react-router";


class Authorization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'company'
        }
    }

    changeTab(tab) {
        this.setState({
            selectedTab: tab
        })
    }

    render() {
        return (
            <div>
                {this.props.currentCompany ? <Redirect to='/companyPage'/>
                    : <div className='switch-buttons'>
                        <p>Home/Login Company</p>
                        <button className={this.state.selectedTab === 'company' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('company')}>COMPANY
                        </button>
                        <button className={this.state.selectedTab === 'user' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('user')}>USER
                        </button>
                        {this.state.selectedTab === 'company' ?
                            <AutorizationCompany/> :
                            <AutorizationUser/>}
                    </div>}
                }

            </div>
        );
    }
}


export default Authorization;
