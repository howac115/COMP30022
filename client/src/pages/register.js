import React, {useRef} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';

export default function SignUp(props) {
    const {register, handleSubmit, errors, watch} = useForm();
    const password = useRef({});
    password.current = watch('password', '');

    const handleSignUp = async data => {
        try {
            console.log('here');
            const {firstName, lastName, email, password, password2} = data;
            await axios.post('/auth/register', {
                firstName,
                lastName,
                email,
                password,
                password2,
            });
            toast.success('Sign Up Success');
            const res = await axios.post('/auth/login', {email, password});
            const token = res.data.token;
            global.auth.setUserToken(token);
            const _res = await axios.get('/user/' + global.auth.getUser().id);
            const userName = _res.data.firstName;
            global.auth.setUserName(userName);
            props.history.push('/' + res.data.user.id);
            toast.success('Welcome ' + userName);
        } catch (error) {
            const errorMessage = error.response.data.error;
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        props.history.push('/');
    };

    return (
        <div className="signUp">
            <form
                className="box signUp_box"
                onSubmit={handleSubmit(handleSignUp)}
            >
                <label className="label">
                    <center>
                        <strong>
                            <font size="50px">SIGN UP</font>
                        </strong>
                    </center>
                </label>
                <div>
                    Already a Member?{' '}
                    <Link to="../Login">
                        <i>Log In</i>
                    </Link>
                </div>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input
                            className={`input ${errors.firstName &&
                                'is-danger'}`}
                            type="text"
                            placeholder="Enter Your First Name"
                            name="firstName"
                            ref={register({required: true})}
                        />
                        {errors.firstName && (
                            <i className="helper has-text-danger">
                                First Name is required
                            </i>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input
                            className={`input ${errors.lastName &&
                                'is-danger'}`}
                            type="text"
                            placeholder="Enter Your Last Name"
                            name="lastName"
                            ref={register({required: true})}
                        />
                        {errors.lastName && (
                            <i className="helper has-text-danger">
                                Last Name is required
                            </i>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className={`input ${errors.email && 'is-danger'}`}
                            type="email"
                            placeholder="123@abc.com"
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
                    <label className="label">Set password</label>
                    <div className="control">
                        <input
                            className={`input ${errors.password &&
                                'is-danger'}`}
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            ref={register({
                                required: 'Password is required',
                                minLength: 6,
                            })}
                        />
                        {errors.password && (
                            <i className="helper has-text-danger">
                                Need to longer than 6 characters
                            </i>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input
                            className={`input ${errors.password2 &&
                                'is-danger'}`}
                            type="password"
                            placeholder="Re-enter your password"
                            name="password2"
                            ref={register({
                                validate: value => value === password.current,
                            })}
                        />
                        {errors.password2 && (
                            <i className="helper has-text-danger">
                                Not same as before
                            </i>
                        )}
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="checkbox"
                                ref={register({required: true})}
                                value={true}
                            />{' '}
                            &nbsp; I agree to the{' '}
                            <i href="https://www.google.com">
                                terms and conditions
                            </i>
                        </label>
                        {errors.checkbox && (
                            <i className="helper has-text-danger">
                                Please agree the terms and conditions
                            </i>
                        )}
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-dark">Sign Up</button>
                    </div>

                    <div className="control">
                        <button
                            className="button is-light"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
