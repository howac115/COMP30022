import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../layout.js';
import { Button, Divider, Form, Input, Menu, Modal, Row, Typography } from 'antd';
import { PlusOutlined, FolderOpenOutlined, SnippetsOutlined, SettingOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

const { Title } = Typography;

export default function User(props) {

    let history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();
    const [user, setUser] = useState([]);
    const [visible, setVisible] = useState();
    const [passwordDisable, setPasswordDisable] = useState(true);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirm] = useState('');
    const [validate, setValidate] = useState(true);

    const handleUpdate = async () => {
        try {
            const id = user._id;
            await axios.post('/user/' + id + '/update', {
                id: user._id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                password2: confirmPassword
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
            setFirstName(_res.data.firstName);
            setLastName(_res.data.lastName);
            setEmail(_res.data.email);
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
        history.push('/' + user._id)
    }

    const SettingsRedirect = () => {
        if (history.location.pathname == ('/' + user._id + '/settings')) {
            history.push('#')
        } else {
            history.push(history.location.pathname)
        }
    }

    const changePassword = () => {
        if (passwordDisable) {
            setPasswordDisable(false);
        } else {
            setPassword('');
            setConfirm('');
            setPasswordDisable(true);
        }
    }

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
        console.log(firstName)
    }

    const onChangeLastName = (event) => {
        setLastName(event.target.value);
        console.log(lastName)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        console.log(email)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        console.log(password)
    }

    const onChangeConfirm = (event) => {
        setConfirm(event.target.value);
        console.log(password)
        console.log(confirmPassword)
        if (confirmPassword != password) {
            setValidate("error")
        } else if (confirmPassword == password) {
            setValidate("success")
        }
    }

    const onHelp = () => {
        if (validate) {
            return "Password doesn't match"
        }
    }

    const handleValidate = () => {
        if (validate) {
            return "success"
        } else {
            return "error"
        }
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
                <div style={{ width: '70%', marginLeft: '7%', marginTop: '4%' }}>
                    <Title level={3}> Settings </Title>
                    <div style={{ width: '30%', marginLeft: '9%', marginTop: '7%' }}>
                        <Form layout="vertical">
                            <Divider orientation="left">Username Settings</Divider>
                            <Form.Item label="First Name:">
                                <Input value={firstName}
                                    onChange={onChangeFirstName}></Input>
                            </Form.Item>
                            <Form.Item label="Last Name:">
                                <Input value={lastName}
                                    onChange={onChangeLastName}></Input>
                            </Form.Item>
                            <Divider orientation="left">Account Settings</Divider>
                            <Form.Item label="Email Address"
                                help="This will be used for logging in">
                                <Input value={email}
                                    onPressEnter={handleUpdate}
                                    onChange={onChangeEmail}></Input>
                            </Form.Item>
                            <Divider orientation="left">
                                Security Settings <Button type="link"
                                    htmlType="submit"
                                    onClick={changePassword}>Click To Change</Button>
                            </Divider>
                            <Form.Item label="Password">
                                <Input disabled={passwordDisable}
                                    value={password}
                                    onChange={onChangePassword}
                                    type="password" ></Input>
                            </Form.Item>
                            <Form.Item label="Confirm Password">
                                <Input disabled={passwordDisable}
                                    value={confirmPassword}
                                    onChange={onChangeConfirm}
                                    onPressEnter={handleUpdate}
                                    type="password" ></Input>
                            </Form.Item>
                            <Button onClick={handleUpdate}>Update Details</Button>
                        </Form>
                    </div>
                </div>
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