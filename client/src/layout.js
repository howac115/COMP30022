import React, { useMemo } from 'react';
import Header from './components/header.js';
import HelperBot from './components/ChatBot.js';

const Layout = props => {
    const user = useMemo(() => {
        if (global.auth.getUser()) {
            return { id: global.auth.getUserName() };
        }
        return {};
    }, []);

    return (
        <div>
            <Header user={user} />
            <HelperBot />
        </div>
    );
};

export default Layout;
