import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Layout from '../layout.js';
import Draggable from 'react-draggable';
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import 'antd/dist/antd.css';
import { ShareAltOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const { Title } = Typography;
const { Meta } = Card;

export default function Template(props) {

    let history = useHistory();
    const { handleSubmit } = useForm();
    const [folios, setFolios] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        document.title = 'ExPortfolio | Template';
        axios.get('/folio/templates').then(response => {
            if (response.data.success) {
                console.log(response.data.folios);
                setFolios(response.data.folios);
            } else {
                toast.error('Couldnt get folio`s lists');
            }
        });
    }, []);

    const handleCreate = async prop => {
        const user = global.auth.getUser().id;
        console.log(prop)
        await axios.post('/folio/clone', {
            user: user,
            name: name,
            content: prop.content
        });
        toast.success(prop + ' succeccful cloned');
        history.push('/folios');
    };

    const handleChange = e => {
        setName({ name: e.target.value });
    }

    const askCreate = prop => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="container">
                    <form onSubmit={handleSubmit(handleCreate.bind(this, prop))}>
            <div>
                <h1>Add template to folios</h1>
                <br></br>
                </div>
                <input
                type="text"
                placeholder="My Awesome Portfolio"
                name="clonedName"
                onChange={handleChange}
                />
                <br></br><br></br>
                <div className="field is-grouped">
                    <div className="control">
                    <button
                className="button is-info"
                    >
                    OK
                    </button>
                    </div>
                    <div className="control">
                    <button
                className="button is-light"
                onClick={onClose}
                    >
                    Cancel
                    </button>
                    </div>
                    </div>
                    </form>
                    </div>
            );
            },
        });
    };

    function renderOptions(folio) {
        if (global.auth.getUser().id !== folio.user) {
            return [
                <button className="button is-light">
                <a href={'/' + folio.user + '/' + folio.name}>
                {' '}
                <EyeOutlined />
                </a>
                </button>,
                <button
            className="button is-light"
            onClick={handleShare.bind(this, folio)}
                >
                <ShareAltOutlined />
                </button>, <button
            className="button is-light"
            onClick={askCreate.bind(this, folio)}
                >
                <PlusOutlined />
                </button>]
        } else {
            return [<button className="button is-light">
                <a href={'/' + folio.user + '/' + folio.name}>
                {' '}
                <EyeOutlined />
                </a>
                </button>,
                <button
            className="button is-light"
            onClick={handleShare.bind(this, folio)}
                >
                <ShareAltOutlined />
                </button>]
        }
    }

    const handleShare = prop => {
        navigator.clipboard.writeText(
            'https://exportfolio.herokuapp.com/' + prop.user + '/' + prop.name
        );
        toast.success(prop.name + ' is succeccful copied to clipboard');
    };

    const renderCards = folios.map((folio, index) => {
        return (
            <Col key={index} lg={8} md={12} xs={24}>
            <Draggable>
            <Card
        hoverable
        style={{ width: 300, marginTop: 16 }}
        actions={renderOptions(folio)}
            >
            <Meta
        title={folio.name}
        description="This is the description"
            />
            <div
        style={{
            height: 150,
                overflowY: 'scroll',
                marginTop: 10,
        }}
    >
    <div
        dangerouslySetInnerHTML={{
            __html: folio.content,
        }}
        />
        </div>
        </Card>
        </Draggable>
        </Col>
    );
    });

    return (
        <div>
        <Layout />
        <div style={{ width: '85%', margin: '3rem auto' }}>
<Title level={2}> Templates </Title>
        <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
    </div>
);
}
