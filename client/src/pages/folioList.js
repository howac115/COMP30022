import React, {useEffect, useState} from 'react';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Layout from '../layout.js';
import Draggable from 'react-draggable';
import axios from 'axios';
import {Card, Col, Dropdown, Menu, Typography, Row} from 'antd';
import 'antd/dist/antd.css';
import {
    ShareAltOutlined,
    EditOutlined,
    EyeOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;
const {Meta} = Card;

export default function FolioList(props) {
    let history = useHistory();
    const [folios, setFolios] = useState([]);

    useEffect(() => {
        document.title = 'ExPortfolio | My Portfolios';
        let mounted = true;
        if (mounted) {
            const user = global.auth.getUser().id;
            axios.post('/folio/all', {user}).then(response => {
                if (response.data.success) {
                    setFolios(response.data.folios);
                } else {
                    toast.error('Couldnt get folio`s lists');
                }
            });
        }
        return () => (mounted = false);
    }, []);

    async function handleVisible(folio) {
        console.log(folio);
        if (folio.visible === false) {
            await axios.post('/folio/' + folio.user + '/visible', {
                user: folio.user,
                name: folio.name,
                visible: true,
                shareAsTemplate: folio.shareAsTemplate,
            });
        } else {
            await axios.post('/folio/' + folio.user + '/visible', {
                user: folio.user,
                name: folio.name,
                visible: false,
                shareAsTemplate: false,
            });
        }
        if (folio.visible) {
            toast.success(folio.name + ' successfully set private');
            history.go(0);
        } else {
            toast.success(folio.name + ' successfully set public');
            history.go(0);
        }
    }

    async function handleTemplate(folio) {
        console.log(folio);
        if (folio.shareAsTemplate === false) {
            await axios.post('/folio/' + folio.user + '/visible', {
                user: folio.user,
                name: folio.name,
                visible: true,
                shareAsTemplate: true,
            });
        } else {
            await axios.post('/folio/' + folio.user + '/visible', {
                user: folio.user,
                name: folio.name,
                visible: folio.visible,
                shareAsTemplate: false,
            });
        }
        if (!folio.shareAsTemplate) {
            toast.success(folio.name + ' successfully share as template');
        } else {
            toast.success(folio.name + ' successfully stop sharing');
        }
        setTimeout(history.go(0), 4000);
    }

    const handleDelete = async prop => {
        const user = global.auth.getUser().id;
        await axios.post('/folio/' + user + '/delete', {
            user: user,
            name: prop,
        });
        toast.success(prop + ' succeccful delete');
        history.go(0);
    };

    const askDelete = prop => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="container">
                        <div>
                            <h1>Do you want to delete this portfolio?</h1>
                            <br></br>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    className="button is-danger"
                                    onClick={() => {
                                        onClose(prop);
                                        handleDelete(prop);
                                    }}
                                >
                                    Yes, I confirm!
                                </button>
                            </div>

                            <div className="control">
                                <button
                                    className="button is-light"
                                    onClick={onClose}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    };

    const handleShare = prop => {
        const user = global.auth.getUser().id;
        navigator.clipboard.writeText(
            'https://exportfolio.herokuapp.com/' + user + '/' + prop
        );
        toast.success(prop + ' is succeccful copied to clipboard');
    };

    function visibility(folio) {
        if (folio.visible !== false) {
            return <p>Set Private</p>;
        } else {
            return <p>Set Public</p>;
        }
    }

    function shareAsTemplate(folio) {
        if (folio.shareAsTemplate === true) {
            return <p>Stop Sharing</p>;
        } else {
            return <p>Share As Template</p>;
        }
    }

    const renderCards = folios.map((folio, index) => {
        return (
            <Col key={index} lg={8} md={12} xs={24}>
                <Draggable>
                    <Card
                        hoverable
                        style={{width: 300, marginTop: 16}}
                        actions={[
                            <Dropdown
                                overlay={
                                    <Menu>
                                        <Menu.Item
                                            onClick={() => {
                                                handleVisible(folio);
                                            }}
                                        >
                                            {visibility(folio)}
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={() => {
                                                handleTemplate(folio);
                                            }}
                                        >
                                            {shareAsTemplate(folio)}
                                        </Menu.Item>
                                        <Menu.Item
                                            danger
                                            onClick={askDelete.bind(
                                                this,
                                                folio.name
                                            )}
                                        >
                                            Delete Page
                                        </Menu.Item>
                                    </Menu>
                                }
                                arrow
                            >
                                <button className="button is-light">
                                    <SettingOutlined />
                                </button>
                            </Dropdown>,
                            <button className="button is-light">
                                <a href={folio.name + '/edit'}>
                                    {' '}
                                    <EditOutlined />
                                </a>
                            </button>,
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
            <div style={{width: '85%', margin: '3rem auto'}}>
                <Title level={2}> My Folios </Title>
                <Row gutter={[32, 16]}>{renderCards}</Row>
            </div>
        </div>
    );
}
