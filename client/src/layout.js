import React, {useMemo} from 'react';
import Header from './components/header.js';

const Layout = props => {
    const user  = useMemo(()=> {
        if (global.auth.getUser()){
            return  {id: global.auth.getUserName()};
        }
        return {};
    },[]);
    
    return(
        <div className="main">
            <Header user={user}/>
        </div>
    );
};

export default Layout;