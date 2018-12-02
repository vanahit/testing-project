import React, {Component} from 'react';


class CompanyProfile extends Component {




    render() {
        return (

            <div>
                <div>
                    <div className='company-profile'>
                        <div className='profile-logo'/>
                        <div className='profile-synopsis'>
                            <div className='profile-synopsis-name'>Company name</div>
                            <div className='quote'>The <span>software agency</span> that doesnt work for you</div>
                            <div>juierfhreuifheruifheruifheriufweruifhreiwfhruiehf
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                efierwhfiefhrirhewuifhreifherwifuheruifwhrifweh
                            </div>
                        </div>
                    </div>
                    <div className='profile-find-employee'>
                        <div className='profile-create-test'>
                            <div>
                                <div className='checked-icon'>
                                    <img src={require('../../images/checkbox.png')}/>
                                    <span>You can find employe.</span>
                                </div>
                                <div className='checked-icon'>
                                    <img src={require('../../images/checkbox.png')}/>
                                    <span>You can add your own test.</span>
                                </div>
                            </div>
                            <div className='profile-buttons'>
                                <button>FIND EMPLOYEE</button>
                                <button>CREATE TEST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyProfile;