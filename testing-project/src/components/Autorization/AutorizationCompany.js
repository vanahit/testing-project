import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";
import  {connect} from 'react-redux';

class AutorizationCompany extends Component {

    render() {
        console.log(this.props);
        return (
            <div className='container'>
                <CompanyRegistration/>
                <Login/>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        projects:state.project.projects,
    }
};

export default connect(mapStateToProps)(AutorizationCompany);