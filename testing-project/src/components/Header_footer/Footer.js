import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_up'>
                <div>SUBSCRIBE & GET <span style={{backgroundColor: '#FFAD5A'}}>NEWS</span></div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input type="email" placeholder='EMAIL'/>
                    <button>></button>
                </div>
            </div>


            <div className='footer_middle'>

                <div className='contact_us'>
                    <div>
                        <span style={{backgroundColor: 'red', marginRight: '10px', padding: '5px',}}>F</span>
                        CONTACT US
                    </div>
                    <div>Erevan, Kilikia, sisvan str. 59</div>
                    <div style={{paddingBottom: '10px'}}>+ 374 (94) 444444</div>
                    <div>info@digilearn.com</div>
                </div>


                <div className='support'>
                    <div>
                        <span style={{
                            border: '1px solid black',
                            borderRadius: '50%',
                            padding: '5px',
                            marginRight: '10px',
                        }}>?</span>
                        <span>SUPPORT</span>
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
                    <button>google</button>
                    <button>appstore</button>
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
        </div>
    );
};

export default Footer;