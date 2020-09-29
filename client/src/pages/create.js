import React from 'react';
import {useForm} from 'react-hook-form';
import Layout from '../layout.js';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    select: {
      minWidth: "100%",
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: "100%",
      },
  }));



export default function Create(props) {
    const classes = useStyles();
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const [type, setType] = React.useState('');

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

    const handleChange = (event) => {
        setType(event.target.value);
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
                                <p className="helper has-text-danger">
                                    Name is required.
                                </p>
                            )}
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="create-type-select"
                                value={type}
                                label="Type"
                                className={classes.select}
                                onChange={handleChange}
                            >
                                <MenuItem value={"Folios"}>Folios</MenuItem>
                                <MenuItem value={"Template"}>Template</MenuItem>
                            </Select>
                            </FormControl>
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
