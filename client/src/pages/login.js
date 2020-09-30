import React, {useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {message} from 'antd';

export default function Login(props) {
    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        document.title = 'ExPortfolio | Login';
    }, []);

    const handleLogin = async data => {
        try {
            const {email, password} = data;
            const res = await axios.post('/auth/login', {email, password});
            const token = res.data.token;
            global.auth.setUserToken(token);
            const _res = await axios.get('/user/' + global.auth.getUser().id);
            const userName = _res.data.firstName;
            global.auth.setUserName(userName);
            message.success('Welcome ' + userName);
            props.history.push('/' + global.auth.getUser().id);
        } catch (error) {
            const errorMessage = error.response.data.error;
            message.error(errorMessage);
        }
    };
    const handleBack = () => {
        props.history.push('/');
    };

    return (
        <div className="login">
            <form
                className="box login_box"
                onSubmit={handleSubmit(handleLogin)}
            >
                <label className="label">
                    <center>
                        <strong>
                            <font size="50px">LOGIN</font>
                        </strong>
                    </center>
                </label>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control ">
                        <input
                            className={`input ${errors.email && 'is-danger'}`}
                            type="email"
                            placeholder="Email"
                            name="email"
                            ref={register({required: true})}
                        />
                        {errors.email && (
                            <i className="helper has-text-danger">
                                Email is required
                            </i>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className={`input ${errors.password &&
                                'is-danger'}`}
                            type="password"
                            placeholder="Password"
                            name="password"
                            ref={register({required: true})}
                        />
                        {errors.password && (
                            <i className="helper has-text-danger">
                                Password is required
                            </i>
                        )}
                    </div>
                </div>
                <div>
                    Not a member?{' '}
                    <Link to="../Register">
                        <i>Sign Up</i>
                    </Link>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-dark">Login</button>
                    </div>
                    <div className="control">
                        <button
                            className="button is-light"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
