import React, {useEffect, useState} from 'react';
import Layout from '../layout.js';
import axios from 'axios';
import {Typography} from 'antd';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

function FolioPage(props) {
    let history = useHistory();
    const [folio, setFolio] = useState([]);

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
                        setFolio(response.data);
                    } else {
                        setFolio({
                            content:
                                '<p>This portfolio is currently empty.</p>',
                        });
                    }
                } else {
                    setFolio({
                        content:
                            '<p>This portfolio has been set private by the portfolio owner.</p>',
                    });
                }
            });
    }, [history.location.pathname]);

    return (
        <div>
            <Layout />
            <div
                className="folioPage"
                style={{width: '80%', margin: '3rem auto'}}
            >
                <Title level={2}>
                    {history.location.pathname.split('/')[2]}
                </Title>
                <br />
                <div dangerouslySetInnerHTML={{__html: folio.content}} />
            </div>
        </div>
    );
}

export default FolioPage;
