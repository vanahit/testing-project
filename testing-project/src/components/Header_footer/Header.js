import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {firebase} from '../../firebase/firebase';


class Header extends Component {
    constructor(props){
        super(props)

        // this.state = {
        //     name: ""
        // }
    }
    logOut () {

            firebase.auth().signOut().then(function () {
            }, function (error) {
                console.error('Sign Out Error', error);
            });
        };

    // componentDidUpdate(prevProps, prevState) {
    //     // `companies/${this.props.currentLog.uid}`

    //     if( prevState.name === "" && this.props.currentLog){
    //         firebase.database().ref(`companies/${this.props.currentLog.uid}`).once('value',(snapshot)=>{
    //             this.setState({name: snapshot.val().name})
    //         });
    //     }
        
    //     console.log(this.props.currentLog)
    // }

    render(){
        
        console.log(this.props.currentLog)
        return (

            <header style={{
                backgroundColor:'#141218',
                width:'100%',
            }}>

                <div className='header_wrapper'>
                    <NavLink to={'/'}>
                        <div className='logo'>LOGO</div>
                    </NavLink>

                    <div className='navigation'>
                        <NavLink to={'/tests'}>TESTS</NavLink>
                        <NavLink to={'/companies'}>COMPANIES</NavLink>
                        <NavLink to={'/users'}>USERS</NavLink>
                        <NavLink to={'/AboutUs'}>ABOUT US</NavLink>
                    </div>

                    {this.props.user ?
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <NavLink
                                style={{color: 'white', marginRight: '10px', border: '1px solid black', padding: '10px'}}
                                to={`/${this.props.user.name}/profile`}>{this.props.user.name}</NavLink>
                            <div className='header-log-in' onClick={() => this.logOut()}>LOG OUT</div>
                        </div>

                        : <NavLink to={'/authorization'}>
                            <div className='header-log-in'>LOG IN</div>
                        </NavLink>}
                </div>

            </header>
        )
    }
    
};

export default Header;
