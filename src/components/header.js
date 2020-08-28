import React from 'react'

class Header extends React.Component{

    renderUsernameLink(){
        const username = this.props.username;
        if (username){
            return (
                <a className="button is-light" href="/">
                    <span className='username'>
                        <i className="fa fa-user-circle fa-lg" aria-hidden="true"></i>&nbsp;
                        {this.props.username}
                    </span>
                </a>
            );
        }
        else{
            return(
                <React.Fragment>
                    <a className="button is-dark" href="/register">
                        <strong>Sign up</strong>
                    </a>
                    <a className="button is-light" href="/login">Log in</a>
                </React.Fragment>
            );
        }
    }
    
    render(){
        return(
            <div className='homeHeader'>
                <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <div className='logo-text'>EXPORTFOLIO</div>
                        </a>
                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="/">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item" href="/">Home</a>
                            <a className="navbar-item" href="/">Template</a>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link" href="/">More</a>
                                <div className="navbar-dropdown">
                                    <a className="navbar-item" href="/">About</a>
                                    <a className="navbar-item" href="/"> Contact</a>
                                    <hr className="navbar-divider"/>
                                    <a className="navbar-item" href="/">Report an issue</a>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    {this.renderUsernameLink()}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
