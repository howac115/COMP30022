import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layout.js';

class User extends React.Component {
    componentDidMount() {
        document.title = 'ExPortfolio | User';
    }
    render() {
        return (
            <div className="User">
                <Layout />
            </div>
        );
    }
}

export default User;
