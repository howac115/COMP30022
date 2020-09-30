import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layout.js';
import FolioList from './folioList.js'
import { Input, Menu, Modal, Row } from 'antd';
import { PlusOutlined, FolderOpenOutlined, SnippetsOutlined, SettingOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

export default function User(props) {

    let history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();
    const [user, setUser] = useState([]);
    const [visible, setVisible] = useState();
    const [name, setName] = useState('');
    // use user.firstName to get userName
    // also have user.LastName, user._id, user.email
    // example below
    const handleUpdate = async data => {
        try {
            const id = user._id;
            const { firstName, lastName, email } = data;
            await axios.post('/user/' + id + '/update', {
                id,
                firstName,
                lastName,
                email,
            });
            message.success('Update personal detail Success');
            history.go(0);
        } catch (error) {
            const errorMessage = error.response.data.error;
            message.error(errorMessage);
        }
    };

    useEffect(() => {
        (async () => {
            const user = global.auth.getUser().id;
            const _res = await axios.get('/user/' + user);
            console.log(_res.data);

            setUser(_res.data);
        })();
    }, []);

    const handleCreate = async () => {
        try {
            const user = global.auth.getUser().id;
            await axios.post('/folio/create', { name, user });
            message.success(name + ' successfully created!');
            history.go(0);
        } catch (error) {
            const errorMessage = error.response.data.error;
            message.error(errorMessage);
        }
    };

    const onChange = (event) => {
        setName(event.target.value);
    }

    const showModal = (folio) => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const TemplateRedirect = () => {
        history.push('/template');
    }

    const FoliosRedirect = () => {
        if (history.location.pathname == ('/' + user._id)) {
            history.push('#')
        } else {
            history.go(0);
        }
    }

    const SettingsRedirect = () => {
        history.push(user._id + '/settings')
    }

    return (
        <div className="user">
            <Layout />
            <Row>
                <Menu
                    style={{ width: "15%", marginLeft: "2%", marginTop: "2%" }}
                    mode="inline"
                >
                    <Menu.Item key="1" icon={<PlusOutlined />}
                        onClick={showModal}>
                        Create
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SnippetsOutlined />}
                        onClick={TemplateRedirect}>
                        Start With Templates
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FolderOpenOutlined />}
                        onClick={FoliosRedirect}>
                        My Folios
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SettingOutlined />}
                        onClick={SettingsRedirect}>
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
                <Input addonAfter="Enter"
                    placeholder="My Awesome Folio"
                    allowClear={true}
                    onChange={onChange}
                    onPressEnter={handleCreate}></Input>
            </Modal>
        </div >
    );
}