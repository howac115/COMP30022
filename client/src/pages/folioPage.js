import React, { useEffect, useState } from 'react';
import Layout from '../layout.js';
import SunEditor from '../components/SunEditor';
import axios from 'axios';
import { Typography } from 'antd';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

function FolioPage(props) {
    let history = useHistory();
    const [content, setContent] = useState('');

    useEffect(() => {
        document.title = 'ExPortfolio | View';
        const variable = {
            user: history.location.pathname.split('/')[1],
            name: history.location.pathname.split('/')[2],
        };
        axios
            .post('/folio/' + variable.user + '/one', variable)
            .then(response => {
                if (
                    response.data.visible === true ||
                    (global.auth.getUser() !== null &&
                        global.auth.getUser().id === response.data.user)
                ) {
                    if (response.data.content) {
                        setContent(response.data.content);
                        console.log(content)
                    } else {
                        setContent('<p>This portfolio is currently empty.</p>')
                    }
                } else {
                    setContent('<p>This portfolio has been set private by the portfolio owner.</p>')

                }
            });
    }, [history.location.pathname]);

    const [value, setValue] = useState('');
    const onEditorChange = content => {
        setValue(content);
    };

    return (
        <div>
            <Layout />
            <div
                className="folioPage"
                style={{ width: '90%', margin: '3rem auto' }}
            >
                <Title level={2}>
                    {history.location.pathname.split('/')[2]}
                </Title>
                <div style={{ maxWidth: '100%', margin: '2rem auto' }}>
                    <div style={{ textAlign: 'center' }}></div>
                    <SunEditor
                        user={history.location.pathname.split('/')[1]}
                        name={history.location.pathname.split('/')[2]}
                        disable={true}
                        onEditorChange={onEditorChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default FolioPage;
