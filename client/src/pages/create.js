import React from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import Layout from '../layout.js';

import axios from 'axios';
import { toast } from "react-toastify";

export default function Create(props) {

    const { register, handleSubmit, errors } = useForm();

    const handleCreate = async data => {
        const { name } = data;
        await axios.post('/folio/create', { name });
        toast.success(name + ' successfully created!');
    };

    const handleCancel = () => {
        props.history.push('/');
    };

    return (
        <div className='Create'>
            <Layout />
            <div className="signUp">
                <form className="box signUp_box" onSubmit={handleSubmit(handleCreate)}>

                    <label className="label"><center><strong><font size="50px">Name your portfolio</font></strong></center></label>

                    <div className="field">
                        <div className="control">
                            <input className={`input ${errors && 'is-danger'}`}
                                type="text"
                                placeholder="My Awesome Portfolio"
                                name='name'
                                ref={register({ required: true })}
                            />
                            {errors && <p className="helper has-text-danger">Name is required.</p>}
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