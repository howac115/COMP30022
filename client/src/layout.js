import React, {useMemo} from 'react';
import Header from './components/header.js';

const Layout = props => {
    const user  = useMemo(()=> {
        return (global.auth.getUser() || {});
    },[]);
    
    return(
        <div className="main">
            <Header user={user}/>
        </div>
    );
};

export default Layout;