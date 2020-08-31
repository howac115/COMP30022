import React from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


<<<<<<< HEAD
export default function Login(props){
    const {register, handleSubmit, errors} = useForm();
    
    const handleLogin = async data => {
        try{
            toast.success('Login Success');
            const {email, password} = data;
            const res = await axios.post('/home/login',{email, password});
=======
export default function Login(props) {
    const { register, handleSubmit, errors } = useForm();

    const handleLogin = async data => {
        try {
            const { email, password } = data;
            const res = await axios.post('/api/auth/login', { email, password });
>>>>>>> master
            const token = res.data;
            global.auth.setUserToken(token);
            toast.success('Login Success');
            props.history.push('/');
<<<<<<< HEAD
        }catch(error){
=======
        } catch (error) {
>>>>>>> master
            const errorMessage = error.response.data.error;
            toast.error(errorMessage);
        }

    };
    const handleBack = () => {
        props.history.push('/');
    };

    return (
        <div className="login">
            <form className="box login_box" onSubmit={handleSubmit(handleLogin)}>
                <label className="label"><center><strong><font size="50px">LOGIN</font></strong></center></label>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control ">
<<<<<<< HEAD
                        <input className={`input ${errors.email && 'is-danger'}`} 
                            type="email"
                            placeholder="Email"
                            name='email'  
                            ref={register({required:true})}
                        />
                        {errors.email && <p className="helper has-text-danger">Email is required.</p> }
=======
                        <input className={`input ${errors.email && 'is-danger'}`}
                            type="email"
                            placeholder="Email"
                            name='email'
                            ref={register({ required: true })}
                        />
                        {errors.email && <p className="helper has-text-danger">Email is required.</p>}
>>>>>>> master
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
<<<<<<< HEAD
                        <input className={`input ${errors.password && 'is-danger'}`} 
                            type="password"
                            placeholder="Password"
                            name='password' 
                            ref={register({required:true})}
=======
                        <input className={`input ${errors.password && 'is-danger'}`}
                            type="password"
                            placeholder="Password"
                            name='password'
                            ref={register({ required: true })}
>>>>>>> master
                        />
                        {errors.password && <p className="helper has-text-danger">Password is required.</p>}
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-dark">Login</button>
                    </div>
                    <div className="control">
                        <button className="button is-light" onClick={handleBack}>Back</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

