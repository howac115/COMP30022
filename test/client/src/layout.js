import React from 'react';
import Header from './components/header.js';
import HelperBot from './components/ChatBot.js';

const Layout = props => {
    return (
        <div>
            <Header />
            <HelperBot />
        </div>
    );
};

export default Layout;
