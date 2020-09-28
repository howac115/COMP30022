import React, {useEffect, useState, useRef} from 'react';
import Layout from '../layout.js';
import axios from 'axios';
import {Typography} from 'antd';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

function FolioPage(props) {
    let history = useHistory();
    var pathArray = history.location.pathname.split('/');
    const [folio, setFolio] = useState([]);

    useEffect(() => {
        const variable = {user: pathArray[1], name: pathArray[2]};
        axios
            .post('/folio/' + variable.user + '/one', variable)
            .then(response => {
                if (response.data.content && response.data.visiable === true) {
                    setFolio(response.data);
                } else if (
                    response.data.content &&
                    global.auth.getUser() !== null
                ) {
                    if (global.auth.getUser().id === response.data.user) {
                        setFolio(response.data);
                    }
                }
            });
    }, []);

    if (folio.content) {
        return (
            <div>
                <Layout />
                <div
                    className="folioPage"
                    style={{width: '80%', margin: '3rem auto'}}
                >
                    <Title level={2}>{pathArray[2]}</Title>
                    <br />
                    <div dangerouslySetInnerHTML={{__html: folio.content}} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Layout />
                <div style={{width: '85%', margin: '3rem auto'}}>
                    <Title level={2}>{pathArray[2]}</Title>
                    <p>This Folio is currently empty</p>
                </div>
            </div>
        );
    }
}

export default FolioPage;
