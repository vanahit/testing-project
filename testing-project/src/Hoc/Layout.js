import React from 'react';
import Header from "../components/Header_footer/Header";
import Footer from "../components/Header_footer/Footer";

const Layout = (props) => {
    return (
        <div>
            <Header currentLog={props.currentLog}/>
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;