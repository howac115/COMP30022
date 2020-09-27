import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Layout from '../layout.js';
import SunEditor from '../components/SunEditor';
import {Button, Form} from 'antd';
import axios from 'axios';
import {toast} from 'react-toastify';

function Edit(props) {
    let history = useHistory();
    var pathArray = history.location.pathname.split('/');

    const [value, setValue] = useState('');

    const onEditorChange = content => {
        setValue(content);
        console.log(value);
    };

    const variables = {
        user: global.auth.getUser().id,
        name: pathArray[2],
        content: value,
    };
    const onSubmit = event => {
        event.preventDefault();
        console.log('submit');
        console.log(variables);

        axios
            .post('/folio/' + variables.user + '/edit', variables)
            .then(response => {
                if (response) {
                    toast.success('Post Created!');
                    setTimeout(() => {
                        history.push('/' + variables.user + '/folios');
                    }, 2000);
                }
            });
    };

    return (
        <div className="Edit">
            <Layout />
            <div style={{maxWidth: '90%', margin: '2rem auto'}}>
                <div style={{textAlign: 'center'}}></div>
                <SunEditor
                    user={pathArray[1]}
                    name={pathArray[2]}
                    onEditorChange={onEditorChange}
                />
                <Form onClick={onSubmit}>
                    <div style={{textAlign: 'center', margin: '2rem'}}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Edit;
