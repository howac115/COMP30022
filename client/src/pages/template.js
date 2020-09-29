import React, { useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Layout from '../layout.js';
import Draggable from 'react-draggable';
import axios from 'axios';
import { Card, Col, Input, Modal, message, Row, Typography } from 'antd';
import 'antd/dist/antd.css';
import { ShareAltOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;
const { Meta } = Card;

export default function Template(props) {
    let history = useHistory();
    const [folios, setFolios] = useState([]);
    const [visible, setVisible] = useState();
    const [name, setName] = useState('');
    const [clonedFolio, setClonedFolio] = useState();

    useEffect(() => {
        document.title = 'ExPortfolio | Template';
        axios.get('/folio/templates').then(response => {
            if (response.data.success) {
                console.log(response.data.folios);
                setFolios(response.data.folios);
            } else {
                message.error('Couldnt get folio`s lists');
            }
        });
    }, []);

    const handleCreate = async () => {
        const user = global.auth.getUser().id;
        try {
            await axios.post('/folio/clone', {
                user: user,
                name: name,
                content: clonedFolio.content,
            });
            message.success(name + 'successfully cloned!');
            history.push(user);
        } catch (error) {
            message.error('You already have that name');
        }
    };

    const onChange = (event) => {
        setName(event.target.value);
    }

    const showModal = (folio) => {
        setClonedFolio(folio);
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    function renderOptions(folio) {
        if (
            global.auth.getUser() !== null &&
            global.auth.getUser().id !== folio.user
        ) {
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
                </button>,
                <button className="button is-light"
                    onClick={showModal.bind(this, folio)}>
                    <PlusOutlined />
                </button>
            ];
        } else {
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
                </button>,
            ];
        }
    }

    const handleShare = prop => {
        navigator.clipboard.writeText(
            'https://exportfolio.herokuapp.com/' + prop.user + '/' + prop.name
        );
        message.success(prop.name + ' is succeccful copied to clipboard');
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
            <Modal
                title="Clone to folios"
                visible={visible}
                closable={false}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Input addonAfter="Enter"
                    placeholder="My Awesome Folio"
                    allowClear={true}
                    onChange={onChange}
                    onPressEnter={handleCreate}></Input>
            </Modal>
        </div>
    );
}
