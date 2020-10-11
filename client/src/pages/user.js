import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layout.js';
import FolioList from './folioList.js';
import {Input, Menu, Modal, Row} from 'antd';
import {
    PlusOutlined,
    FolderOpenOutlined,
    SnippetsOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {message} from 'antd';

export default function User(props) {
    let history = useHistory();
    const [user, setUser] = useState([]);
    const [visible, setVisible] = useState();
    const [name, setName] = useState('');

    useEffect(() => {
        (async () => {
            const user = global.auth.getUser().id;
            const _res = await axios.get('/user/' + user);
            setUser(_res.data);
        })();
    }, []);

    const handleCreate = async () => {
        try {
            const user = global.auth.getUser().id;
            await axios.post('/folio/create', {name, user});
            message.success(name + ' successfully created!');
            history.go(0);
        } catch (error) {
            const errorMessage = error.response.data.error;
            message.error(errorMessage);
        }
    };

    const onChange = event => {
        setName(event.target.value);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const TemplateRedirect = () => {
        history.push('/template');
    };

    const FoliosRedirect = () => {
        if (history.location.pathname === '/' + user._id) {
            history.push('#');
        } else {
            history.go(0);
        }
    };

    const SettingsRedirect = () => {
        history.push(user._id + '/settings');
    };

    return (
        <div className="user">
            <Layout />
            <Row>
                <Menu
                    style={{width: '15%', marginLeft: '2%', marginTop: '2%'}}
                    mode="inline"
                    defaultSelectedKeys="3"
                >
                    <Menu.Item
                        key="1"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                    >
                        Create
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<SnippetsOutlined />}
                        onClick={TemplateRedirect}
                    >
                        Start With Templates
                    </Menu.Item>
                    <Menu.Item
                        key="3"
                        icon={<FolderOpenOutlined />}
                        onClick={FoliosRedirect}
                    >
                        My Folios
                    </Menu.Item>
                    <Menu.Item
                        key="4"
                        icon={<SettingOutlined />}
                        onClick={SettingsRedirect}
                    >
                        Settings
                    </Menu.Item>
                </Menu>
                <FolioList />
            </Row>
            <Modal
                title="Create Folio"
                visible={visible}
                closable={false}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Input
                    addonAfter="Enter"
                    placeholder="My Awesome Folio"
                    allowClear={true}
                    onChange={onChange}
                    onPressEnter={handleCreate}
                ></Input>
            </Modal>
        </div>
    );
}
