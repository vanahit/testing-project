import React from 'react';
import appStore from '../../images/footerIcons/appst.png'
import googlePlay from '../../images/footerIcons/gog.png'
import callIcon from '../../images/footerIcons/callicon.png'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer_up_wrapper'>
                <div className='footer_up'>
                    <div>SUBSCRIBE & GET <span style={{backgroundColor: '#FFAD5A'}}>NEWS</span></div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type="email" placeholder='EMAIL'/>
                        <button>></button>
                    </div>
                </div>
            </div>


            <div className='footer_middle_wrapper'>
                <div className='footer_middle'>
                    <div className='contact_us'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <div style={{

                                marginRight: '10px',
                                background: `url(${callIcon})`,
                                backgroundPosition: "center",
                                backgroundSize: 'cover',
                                width: '24px',
                                height: '24px',
                                padding: '5px',
                            }}>

                            </div>
                            <div>CONTACT US</div>
                        </div>
                        <div>Erevan, Kilikia, sisvan str. 59</div>
                        <div style={{paddingBottom: '10px'}}>+ 374 (94) 444444</div>
                        <div>info@digilearn.com</div>
                    </div>


                    <div className='support'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <div style={{
                            width:'24px',
                            height:'24px',
                            border: '1px solid black',
                            borderRadius: '50%',
                            padding: '4px',
                            textAlign: 'center',
                            marginRight: '10px',
                        }}>?</div>
                            <div>SUPPORT</div>
                        </div>
                        <div className='services'>
                            <span>Customer Service</span>
                            <span>Privacy Policy</span>
                        </div>
                        <div>Contact Us</div>
                    </div>

                    <div className='about_digi'>
                        <div>
                        <span style={{
                            marginRight: '10px',
                            backgroundColor: '#FF5959',
                            padding: '5px',
                        }}>DL</span>
                            <span>ABOUT DIGILEARN</span>
                        </div>
                        <div className='services'>
                            <span>Company</span>
                            <span>Partners</span>
                        </div>
                        <div className='services'>
                            <span>About us</span>
                            <span>Mobile Apps</span>
                        </div>
                    </div>


                    <div className='down_buttons'>
                        <div style={{
                            backgroundImage: `url(${googlePlay})`,
                            backgroundSize: 'cover',
                            width: '170px',
                            height: '50px',
                            border: '1px solid #00253C',
                            borderRadius: '4px',
                            marginBottom: '26px',
                        }}/>
                        <div style={{
                            backgroundImage: `url(${appStore})`,
                            backgroundSize: 'cover',
                            width: '170px',
                            height: '50px',
                            border: '1px solid #00253C',
                            borderRadius: '4px',
                        }}/>
                    </div>

                </div>
            </div>


            <div className='footer_bottom'>
                <button>iji</button>
                <button>iji</button>
                <button>iji</button>
                <button>iji</button>
                <button>iji</button>
                <button>iji</button>
                <button>iji</button>
                <button>iji</button>
            </div>
        </footer>
    );
};

export default Footer;