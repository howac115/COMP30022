import React, {useEffect, useState} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Layout from '../layout.js';
import Draggable from 'react-draggable';
import axios from 'axios';
import {
    Card,
    Col,
    Input,
    Modal,
    message,
    Row,
    Typography,
    Button,
    AutoComplete,
} from 'antd';
import 'antd/dist/antd.css';
import {
    ShareAltOutlined,
    EyeOutlined,
    PlusOutlined,
    LeftCircleOutlined,
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
const {Title} = Typography;
const {Meta} = Card;

export default function Template(props) {
    let history = useHistory();
    const [folios, setFolios] = useState([]);
    const [searchFolios, setSearchFolios] = useState([]);
    const [visible, setVisible] = useState();
    const [name, setName] = useState('');
    const [clonedFolio, setClonedFolio] = useState();

    useEffect(() => {
        document.title = 'ExPortfolio | Template';
        axios.get('/folio/templates').then(response => {
            if (response.data.success) {
                setFolios(response.data.folios);
                setSearchFolios(response.data.folios);
            } else {
                message.error('Couldnt get folio`s lists');
            }
        });
    }, []);

    const handleBack = () => {
        if (global.auth.getUser() !== null) {
            history.push('/' + global.auth.getUser().id);
        } else {
            history.push('/');
        }
    };

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

    const handleShare = prop => {
        navigator.clipboard.writeText(
            'https://exportfolio.herokuapp.com/' +
                prop.user +
                '/' +
                prop.name +
                '/view'
        );
        message.success(prop.name + ' is succeccful copied to clipboard');
    };

    const onChange = event => {
        setName(event.target.value);
    };

    const showModal = folio => {
        setClonedFolio(folio);
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    function renderOptions(folio) {
        if (
            global.auth.getUser() !== null &&
            global.auth.getUser().id !== folio.user
        ) {
            return [
                <button className="button is-light">
                    <a href={'/' + folio.user + '/' + folio.name + '/view'}>
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
                <button
                    className="button is-light"
                    onClick={showModal.bind(this, folio)}
                >
                    <PlusOutlined />
                </button>,
            ];
        } else {
            return [
                <button className="button is-light">
                    <a href={'/' + folio.user + '/' + folio.name + '/view'}>
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

    const renderCards = searchFolios.map((folio, index) => {
        return (
            <Col key={index} lg={8} md={12} xs={24}>
                <Draggable>
                    <Card
                        hoverable
                        style={{width: 300, marginTop: 16}}
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

    const handleSearch = text => {
        let _folio = [...folios];
        _folio = _folio.filter(p => {
            const matchArray = p.name.match(new RegExp(text, 'gi'));
            return !!matchArray;
        });
        setSearchFolios(_folio);
    };

    return (
        <div>
            <Layout />
            <div style={{width: '85%', margin: '3rem auto'}}>
                <Row>
                    <button
                        className="button is-light"
                        onClick={handleBack.bind(this)}
                    >
                        <LeftCircleOutlined />
                        <div>&nbsp; Back</div>
                    </button>
                    <Title level={2}>&nbsp;Templates </Title>
                </Row>
                <Row justify="center">
                    <AutoComplete
                        onSearch={searhText => {
                            handleSearch(searhText);
                        }}
                        style={{width: 800}}
                    >
                        <Input.Search
                            size="large"
                            placeholder="Search Your Favourite Portfolio Template"
                        />
                    </AutoComplete>
                </Row>

                <Row gutter={[32, 16]}>{renderCards}</Row>
            </div>
            <Modal
                title="Clone to folios"
                visible={visible}
                closable={false}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={
                    <Button type="primary" onClick={handleCreate}>
                        Clone
                    </Button>
                }
            >
                <div>Enter your portfolio name:</div>
                <Input
                    placeholder="My Awesome Folio"
                    allowClear={true}
                    onChange={onChange}
                    onPressEnter={handleCreate}
                ></Input>
            </Modal>
        </div>
    );
}
