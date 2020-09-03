import React, { useMemo } from 'react';
import Header from './components/header.js';

const Layout = props => {
    const user = useMemo(() => {
        const user = global.auth.getUser() || {};
        console.log(user)
        return user;
    }, []);

    return (
        <div className="main">
            <Header user={user} />
        </div>
    );
};

export default Layout;