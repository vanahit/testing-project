import React, {Component} from 'react';
import AutorizationUser from "./AutorizationUser";
import AutorizationCompany from "./AutorizationCompany";
import '../../App.css';
import {Redirect} from "react-router";
import {firebase} from '../../firebase/firebase';


class Authorization extends Component {


    state = {
        selectedTab: 'company',
        name:"uiscdbsacd"
       
    };

    componentDidMount() {
        this.mounted = true;
        firebase.database().ref('companies/qnUuRBUn2LeTx083lturGIqB6nj1').on('value',(snapshot)=>{
            if (this.mounted) {
                this.setState({name: snapshot.val().name})
            }
            
        });
    }
    componentWillUnmount () {
        this.mounted = false;
    }
    changeTab(tab) {
        this.setState({
            selectedTab: tab
        })
    }

    render() {
        return (
            <div>
                {this.props.user ? <Redirect to={`/${this.props.user.name}/profile`}/>
                    :
                    <div className='switch-buttons'>
                        <p>Home/Login Company</p>
                        <button className={this.state.selectedTab === 'company' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('company')}>COMPANY
                        </button>
                        <button className={this.state.selectedTab === 'user' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('user')}>USER
                        </button>
                        {this.state.selectedTab === 'company' ?
                            <AutorizationCompany /> :
                            <AutorizationUser/>}
                    </div>}
                }

            </div>
        );
    }
}


export default Authorization;
