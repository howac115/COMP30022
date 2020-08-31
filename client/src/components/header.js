import React from 'react'
//import UserProfile from './userProfile.js'
//import Panel from './panel.js';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    // toProfile =() =>{
    //     Panel.open({
    //         component: UserProfile
    //     })
    // };
     
    renderUsernameLink(){
        const username = this.props.user; //this.props.user.username;
        if (username){
            return (
                <button className="button is-light" >
                    <span className='username'>
                        <i className="fa fa-user-circle fa-lg" aria-hidden="true"></i>&nbsp;
                        {username}
                    </span>
                </button>
            );
        }
        else{
            return(
                <React.Fragment>
                    <Link className="button is-dark" to="/register">
                        <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="/login">Log in</Link>
                </React.Fragment>
            );
        }
    }
    
    render(){
        return(
            <div className='homeHeader'>
                <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <div className='logo-text'>EXPORTFOLIO</div>
                        </Link>
                        <Link role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" to="/">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </Link>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/">Home</Link>
                            <Link className="navbar-item" to="/">Template</Link>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <Link className="navbar-link" to="/">More</Link>
                                <div className="navbar-dropdown">
                                    <Link className="navbar-item" to="/">About</Link>
                                    <Link className="navbar-item" to="/"> Contact</Link>
                                    <hr className="navbar-divider"/>
                                    <Link className="navbar-item" to="/">Report an issue</Link>
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
