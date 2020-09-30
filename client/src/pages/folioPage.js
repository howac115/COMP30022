import React, { useEffect, useState } from 'react';
import Layout from '../layout.js';
import axios from 'axios';
import { Typography } from 'antd';
import { useHistory } from 'react-router-dom';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

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
                        setContents={content}
                        showToolbar={false}
                        enable={false}
                        setOptions={{
                            height: '100%',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default FolioPage;
