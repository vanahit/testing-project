import React from 'react';
import Header from "../components/Header_footer/Header";
import Footer from "../components/Header_footer/Footer";
import styled from 'styled-components';
const Main = styled.div`
    min-height: 930px;
`;

const Layout = (props) => {
    return (
        <div>
            <Header currentLog={props.currentLog} user={props.user}/>
             <Main>
                {props.children}
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;