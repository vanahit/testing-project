import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import CompanyTests from './CompanyTests';
import InvitedUsers from "./InvitedUsers";
import {Redirect} from "react-router";
import CompanyProfile from "./CompanyProfile";
import {firebase} from '../../firebase/firebase';

export default class Company extends Component {
    // constructor(props) {
    //     super(props)


    //     this.state = {
    //         name: ""
    //     }
    // }

    // componentDidMount() {
        
            
    //        this.props.currentCompany && firebase.database().ref(`companies/${this.props.currentCompany.uid}`).on('value',(snapshot)=>{
    //              console.log(snapshot.val().name)
    //             let name = snapshot.val().name 
    //            this.setState({name: snapshot.val().name})
    //            console.log(this.state.name)
    //         });
      
      
    // }

    // componentDidMount() {
    //     firebase.database().ref('companies/qnUuRBUn2LeTx083lturGIqB6nj1').on('value',(snapshot)=>{
    //         this.setState({name: snapshot.val().name})
    //     });
    // }

    render() {

        return (
            (this.props.user && this.props.user.type === "company") ?
                <div className="containerUser">
                    <nav className="tabBar">
                        <NavLink exact activeClassName="active" to={`/${this.props.user.name}/profile`}>Profile</NavLink>
                        <NavLink activeClassName="active" to={`/${this.props.user.name}/Tests`}>Tests</NavLink>
                        <NavLink activeClassName="active" to={`/${this.props.user.name}/InvitedUsers`}>Invited Users</NavLink>
                    </nav>
                    <Route path="/:company/profile" component={() => <CompanyProfile user={this.props.user} />}/>
                    <Route path="/:company/tests" component={() => <CompanyTests user={this.props.user} />}/>
                    <Route path="/:company/invitedUsers" component={() => <InvitedUsers user={this.props.user} />}/>
                </div> :
                <Redirect to='/authorization'/>
        );
    }
}