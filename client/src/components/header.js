import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {message} from 'antd';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component {
    logout = () => {
        global.auth.logout();
        this.props.history.push('/');
        message.success('You have successfully log out');
    };

    toHome = () => {
        const loggedUserId = global.auth.getUser().id;
        this.props.history.push('/' + loggedUserId);
    };
    renderUsernameLink() {
        const username = global.auth.getUser();
        if (username) {
            return (
                <React.Fragment>
                    <button className="button is-light" onClick={this.toHome}>
                        <span className="username">
                            <i
                                className="fa fa-user-circle fa-lg"
                                aria-hidden="true"
                            ></i>
                            &nbsp;
                            {global.auth.getUserName()}
                        </span>
                    </button>
                    <button className="button is-dark" onClick={this.logout}>
                        Logout
                    </button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Link className="button is-dark" to="/register">
                        <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="/login">
                        Log in
                    </Link>
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
                <Navbar.Toggle
                    className="border-0"
                    aria-controls="navbar-toggle"
                />
                <Navbar.Collapse id="navbar-toggle">
                    <Nav className="ml-auto">
                        <div className="navbar-end">
                            <Link className="navbar-item" to="/">
                                Home
                            </Link>
                            <Link className="navbar-item" to="/template">
                                Template
                            </Link>
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
