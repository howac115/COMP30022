import React from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from "react-toastify";
const JWT = "user_token_id";

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        var isAuthenticated = false;
        if (localStorage.getItem(JWT) != null) {
            isAuthenticated = (this.props.computedMatch.params.id === global.auth.getUserId().id);
        }
        if (isAuthenticated !== true) {
            toast.error("You could not edit others's portfolio!");
        }
        return isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            );
    }
}

export default ProtectedRoute;