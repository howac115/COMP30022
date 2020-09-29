import React from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
const JWT = 'user_token_id';

class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        var isAuthenticated = false;
        if (localStorage.getItem(JWT) != null) {
            isAuthenticated =
                this.props.computedMatch.params.id === global.auth.getUser().id;
        }
        if (isAuthenticated !== true) {
            console.log(isAuthenticated);
            message.error("You can not edit others's portfolio!");
        }
        return isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            );
    }
}

export default ProtectedRoute;
