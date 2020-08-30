import React from "react";
import axios from 'axios';
//React.fragement 可用于两个并列的component 
/**
 * 1.命名和绑定
 * events
 * this
 * 传递参数
 */


class SignUp extends React.Component {

    handleSignUp = event => {
        event.preventDefault();
        const signUpDetail = { ...this.state };
        axios.post('/api/auth/register', signUpDetail).then(res => {
            alert('Sign Up Success');
            this.props.history.push('/login');
        });

    };

    handleCancel = event => {
        event.preventDefault();
        this.props.history.push('/');
    };

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    };

    render() {
        return (
            <div className="signUp">
                <form className="box signUp_box" onSubmit={this.handleSignUp}>
                    <label className="label"><center><strong><font size="50px">SIGN UP</font></strong></center></label>

                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="input" type="text"
                                placeholder="Enter Your First Name"
                                value={this.state.firstName}
                                name='firstName'
                                onChange={this.handleInput} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="input" type="text"
                                placeholder="Enter Your Last Name"
                                value={this.state.lastName}
                                name='lastName'
                                onChange={this.handleInput} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input"
                                type="email"
                                placeholder="123@abc.com"
                                value={this.state.email}
                                name='email'
                                onChange={this.handleInput} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Set password</label>
                        <div className="control">
                            <input className="input" type="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                name='password'
                                onChange={this.handleInput} />

                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Confirm password</label>
                        <div className="control">
                            <input className="input" type="password"
                                placeholder="Re-enter your password"
                                value={this.state.password2}
                                name='password2'
                                onChange={this.handleInput} />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" />&nbsp;
                                I agree to the <a href="https://www.google.com">terms and conditions</a>
                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-dark">Sign Up</button>
                        </div>
                        <div className="control">
                            <button className="button is-light" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default SignUp;