import React from 'react';
import { useForm } from "react-hook-form";
import Layout from '../layout.js';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

export default function Create(props) {
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm();

    const handleCreate = async data => {
        const { name } = data;
        await axios.post('/folio/create', { name });
        toast.success(name + ' successfully created!');
        console.log(props);
        history.push('/'+ global.auth.getUser().id);
    };

    const handleCancel = () => {
        history.push('/');
    };

    return (
        <div className='Create'>
            <Layout />
            <div className="signUp">
                <form className="box signUp_box" onSubmit={handleSubmit(handleCreate)}>

                    <label className="label"><center><strong><font size="50px">Name your portfolio</font></strong></center></label>

                    <div className="field">
                        <div className="control">
                            <input className={`input ${errors.name && 'is-danger'}`}
                                type="text"
                                placeholder="My Awesome Portfolio"
                                name='name'
                                ref={register({ required: true })}
                            />
                            {errors.name && <p className="helper has-text-danger">Name is required.</p>}
                        </div>
                    </div>

                    <div className="field is-grouped">

                        <div className="control">
                            <button className="button is-dark">Create</button>
                        </div>

                        <div className="control">
                            <button className="button is-light" onClick={handleCancel}>Cancel</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}