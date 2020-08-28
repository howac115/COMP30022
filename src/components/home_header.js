import React from 'react'




class HomeHeader extends React.Component{
    state ={

    } //状态
    componentDidMount(){

    }//生命周期函数
    renderUsernameLink(){
        const username = this.props.username;
        if (username){
            return (
                <a class="button is-light" href="/">
                    <span className='username'>
                        <i class="fa fa-user-circle fa-lg" aria-hidden="true"></i>&nbsp;
                        {this.props.username}
                    </span>
                </a>
            );
        }
        else{
            return(
                <React.Fragment>
                    <a class="button is-dark" href="/">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light" href="/">Log in</a>
                </React.Fragment>
            );
        }
    }
    
    render(){
        return(
            <div className='homeHeader'>
                <nav class="navbar is-light" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                            <p>EXPORTFOLIO</p>
                        </a>
                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="/">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/">Home</a>
                            <a class="navbar-item" href="/">Template</a>
                            <div class="navbar-item has-dropdown is-hoverable">
                                <a class="navbar-link">More</a>
                                <div class="navbar-dropdown">
                                    <a class="navbar-item" href="/">About</a>
                                    <a class="navbar-item" href="/"> Contact</a>
                                    <hr class="navbar-divider"/>
                                    <a class="navbar-item" href="/">Report an issue</a>
                                </div>
                            </div>
                        </div>

                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
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

export default HomeHeader;
