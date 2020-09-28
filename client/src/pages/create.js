import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Layout from '../layout.js';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

export default function Create(props) {
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    useEffect(() => {
        document.title = 'ExPortfolio | Create';
    }, []);

    const handleCreate = async data => {
        try {
            const {name} = data;
            const user = global.auth.getUser().id;
            await axios.post('/folio/create', {name, user});
            toast.success(name + ' successfully created!');
            history.push('/' + global.auth.getUser().id + '/folios');
        } catch (error) {
            const errorMessage = error.response.data.error;
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        console.log(history);
        history.push('/' + global.auth.getUser().id);
    };

    return (
        <div className="Create">
            <Layout />
            <div className="signUp">
                <form
                    className="box signUp_box"
                    onSubmit={handleSubmit(handleCreate)}
                >
                    <label className="label">
                        <center>
                            <strong>
                                <font size="50px">Name your portfolio</font>
                            </strong>
                        </center>
                    </label>

                    <div className="field">
                        <div className="control">
                            <input
                                className={`input ${errors.name &&
                                    'is-danger'}`}
                                type="text"
                                placeholder="My Awesome Portfolio"
                                name="name"
                                ref={register({required: true})}
                            />
                            {errors.name && (
                                <i className="helper has-text-danger">
                                    Name is required
                                </i>
                            )}
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-dark">Create</button>
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
        </div>
    );
}
