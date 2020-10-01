import React, {useEffect, useState} from 'react';
import Layout from '../layout.js';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import {Typography} from 'antd';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

function FolioPage(props) {
    let history = useHistory();
    const [content, setContent] = useState('');
    const [contentState, setContentState] = useState(false);
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
                        setContentState(true);
                        setContent(response.data.content);
                    } else {
                        setContent('This portfolio is currently empty.');
                    }
                } else {
                    setContent(
                        'This portfolio has been set private by the portfolio owner.'
                    );
                }
            });
    }, [history.location.pathname]);

    const RenderContent = () => {
        if (contentState) {
            return (
                <SunEditor
                    height="100%"
                    setContents={content}
                    disable={true}
                    showToolbar={false}
                />
            );
        } else return content;
    };
    return (
        <div>
            <Layout />
            <div
                className="folioPage"
                style={{width: '90%', margin: '3rem auto'}}
            >
                <Title level={2}>
                    {history.location.pathname.split('/')[2]}
                </Title>
                <div style={{maxWidth: '100%', margin: '2rem auto'}}>
                    <div style={{textAlign: 'center'}}></div>
                    <RenderContent />
                </div>
            </div>
        </div>
    );
}

export default FolioPage;
