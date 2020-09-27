import React, { useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Layout from '../layout.js';
import Draggable from 'react-draggable';
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import 'antd/dist/antd.css';
import {
    ShareAltOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;
const { Meta } = Card;

export default function Template(props) {
    const [folios, setFolios] = useState([]);

    useEffect(() => {
        axios.get('/folio/templates').then(response => {
            if (response.data.success) {
                console.log(response.data.folios)
                setFolios(response.data.folios);
            } else {
                toast.error('Couldnt get folio`s lists');
            }
        });
    }, []);

    const handleShare = prop => {
        const user = global.auth.getUser().id;
        navigator.clipboard.writeText(
            'https://exportfolio.herokuapp.com/' + user + '/' + prop
        );
        toast.success(prop + ' is succeccful copied to clipboard');
    };

    const renderCards = folios.map((folio, index) => {
        return (
            <Col key={index} lg={8} md={12} xs={24}>
                <Draggable>
                    <Card
                        hoverable
                        style={{ width: 300, marginTop: 16 }}
                        actions={[
                            <button className="button is-light">
                                <a href={folio.name}>
                                    {' '}
                                    <EyeOutlined />
                                </a>
                            </button>,
                            <button
                                className="button is-light"
                                onClick={handleShare.bind(this, folio.name)}
                            >
                                <ShareAltOutlined />
                            </button>,
                        ]}
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
