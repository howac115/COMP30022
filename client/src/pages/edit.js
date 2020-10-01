import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../layout.js';
import SunEditor from '../components/SunEditor';
import { Button, Form, Typography } from 'antd';
import axios from 'axios';
import { message } from 'antd';

const { Title } = Typography;

function Edit(props) {
    let history = useHistory();
    var pathArray = history.location.pathname.split('/');

    useEffect(() => {
        document.title = 'ExPortfolio | Edit';
    }, []);

    const [value, setValue] = useState('');

    const onEditorChange = content => {
        setValue(content);
    };

    const variables = {
        user: global.auth.getUser().id,
        name: pathArray[2],
        content: value,
    };

    const onSubmit = event => {
        event.preventDefault();

        axios
            .post('/folio/' + variables.user + '/edit', variables)
            .then(response => {
                if (response) {
                    message.success(variables.name + ' updated!');
                    setTimeout(() => {
                        history.push('/' + variables.user);
                    }, 2000);
                }
            });
    };

    return (
        <div className="Edit">
            <Layout />
            <div style={{ maxWidth: '90%', margin: '2rem auto' }}>
                <div style={{ maxWidth: '20%', margin: '2rem auto' }}>
                    <Title> {pathArray[2]}</Title>
                </div>
                <div style={{ textAlign: 'center' }}></div>
                <SunEditor
                    user={pathArray[1]}
                    name={pathArray[2]}
                    disable={false}
                    onEditorChange={onEditorChange}
                />
                <Form onClick={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem' }}>
                        <Button size="large" htmlType="submit" className="">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Edit;
