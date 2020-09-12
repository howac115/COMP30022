import React from 'react'
//import UserProfile from './userProfile.js'
//import Panel from './panel.js';
import { Link, withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class Header extends React.Component {
    // toProfile =() =>{
    //     Panel.open({
    //         component: UserProfile
    //     })
    // };
    logout = () => {
        global.auth.logout();
        this.props.history.push('/');
        toast.success("You have successfully log out")
    };

    toHome = () => {
        const loggedUserId = global.auth.getUserId().id;
        this.props.history.push('/' + loggedUserId);
    };
    renderUsernameLink() {
        const username = this.props.user.id; //this.props.user.username;
        if (username) {
            return (
                <React.Fragment>
                    <button className="button is-light" onClick={this.toHome} >
                        <span className='username'>
                            <i className="fa fa-user-circle fa-lg" aria-hidden="true"></i>&nbsp;
                            {username}
                        </span>
                    </button>
                    <button className="button is-dark" onClick={this.logout}>Logout</button>
                </React.Fragment>

            );
        }
        else {
            return (
                <React.Fragment>
                    <Link className="button is-dark" to="/register">
                        <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="/login">Log in</Link>
                </React.Fragment>
            );
        }
    }

    renderFolios() {

        var pathArray = this.props.history.location.pathname.split('/')
        console.log(pathArray)
        if (this.props.user.id && this.props.match.path.replace("/:id", "") !== "/create") {
            const loggedUserId = global.auth.getUserId().id;
            const createLink = "/" + loggedUserId + "/folios"
            if (loggedUserId === this.props.match.params.id) {
                return (
                    <React.Fragment>
                        <Link className="navbar-item" to={createLink}>Folios</Link>
                    </React.Fragment>
                );
            }
        }
    }

    renderCreate() {
        if (this.props.user.id && this.props.match.path.replace("/:id", "") !== "/create") {
            const loggedUserId = global.auth.getUserId().id;
            const createLink = "/" + loggedUserId + "/create"
            if (loggedUserId === this.props.match.params.id) {
                return (
                    <React.Fragment>
                        <Link className="navbar-item" to={createLink}>Create</Link>
                    </React.Fragment>
                );
            }
        }
    }

    render() {
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <div className='logo-text'>EXPORTFOLIO</div>
                    </Link>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/">Template</Link>
                        {this.renderFolios()}
                        {this.renderCreate()}
                    </div>
                </div>
                <div className="navbar-menu is-active">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {this.renderUsernameLink()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Header);
