import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Header extends React.Component {

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
        const username = this.props.user.id;
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
        // if (this.props.user.id && this.props.match.path.replace("/:id", "") !== "/create") {
        //     const loggedUserId = global.auth.getUserId().id;
        //     const createLink = "/" + loggedUserId + "/folios"
        //     if (loggedUserId === this.props.match.params.id) {
        //         return (
        //             <React.Fragment>
        //                 <Link className="navbar-item" to={createLink}>Folios</Link>
        //             </React.Fragment>
        //         );
        //     }
        // }
        if (this.props.user.id) {
            const loggedUserId = global.auth.getUserId().id;
            const createLink = "/" + loggedUserId + "/folios"
            return (
                <React.Fragment>
                    <Link className="navbar-item" to={createLink}>Folios</Link>
                </React.Fragment>
            );
        }
    }

    renderCreate() {
        // var pathArray = this.props.history.location.pathname.split('/')
        // if (this.props.user.id && !pathArray.includes("create")) {
        //     const loggedUserId = global.auth.getUser().id;
        //     const createLink = "/" + loggedUserId + "/create"
        //     if (loggedUserId === pathArray[1]) {
        //         return (
        //             <React.Fragment>
        //                 <Link className="navbar-item" to={createLink}>Create</Link>
        //             </React.Fragment>
        //         );
        //     }
        // }
        if (this.props.user.id) {
            const loggedUserId = global.auth.getUser().id;
            const createLink = "/" + loggedUserId + "/create"
            return (
                <React.Fragment>
                    <Link className="navbar-item" to={createLink}>Create</Link>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <Navbar className="border-bottom" bg="transparent" expand="lg">                
                 <Link className="navbar-item" to="/">
                    <Navbar.Brand>EXPORTFOLIO</Navbar.Brand>
                </Link>
                <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
                <Navbar.Collapse id="navbar-toggle">
                    <Nav className="ml-auto">
                        <div className="navbar-end">
                            <Link className="navbar-item" to="/">Home</Link>
                            <Link className="navbar-item" to="https://www.eng.unimelb.edu.au/">Template</Link>
                            {this.renderFolios()}
                            {this.renderCreate()}
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
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Header);
