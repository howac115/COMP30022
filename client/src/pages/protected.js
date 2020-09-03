import React from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from "react-toastify";

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = (this.props.computedMatch.params.id === global.auth.getUserId().id);
        if (isAuthenticated != true) {
            toast.error("You must not edit other's page!")
        }
        return isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            );
    }
}

export default ProtectedRoute;