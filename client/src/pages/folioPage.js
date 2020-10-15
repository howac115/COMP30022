import React, { useEffect, useState } from 'react';
import Layout from '../layout.js';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { Typography, Button, Modal, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { MailOutlined} from '@ant-design/icons';

const { Title } = Typography;

function FolioPage(props) {

    let history = useHistory();
    const [visible, setVisible] = useState();
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contentState, setContentState] = useState(false);

    useEffect(() => {
        document.title = 'ExPortfolio | View';
        const variable = {
            user: history.location.pathname.split('/')[1],
            name: history.location.pathname.split('/')[2],
        };
        axios
            .post('/folio/' + variable.user + '/one', variable)
            .then(response => {
                setUsername(response.data.user.firstName + ' ' + response.data.user.lastName);
                setEmail(response.data.user.email);
                if (
                    response.data.folio.visible === true ||
                    (global.auth.getUser() !== null &&
                        global.auth.getUser().id === response.data.user._id)
                ) {
                    if (response.data.folio) {
                        setContentState(true);
                        setContent(response.data.folio.content);
                    } else {
                        setContent('This portfolio is currently empty.');
                    }
                } else {
                    console.log(response.data.user);
                    setContent(
                        'This portfolio has been set private by the portfolio owner.'
                    );
                }
            });
    }, [history.location.pathname]);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        console.log(values.sender.email)
        axios.post('/user/' + history.location.pathname.split('/')[1] + '/email', {
            email: email,
            body: values.sender.body
        }).then(message.success("Email sent successfully!"));
        console.log(values);
        setVisible(false);
    };

    const RenderContent = () => {
        if (contentState) {
            return (
                <SunEditor
                    height="100%"
                    setContents={content}
                    disable={true}
                    showToolbar={false}
                />
            );
        } else return content;
    };

    return (
        <div>
            <Layout />

            <div
                className="folioPage"
                style={{ width: '90%', margin: '3rem auto' }}
            >
                <Modal
                    title="Contact Author"
                    visible={visible}
                    closable={false}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Email"
                            name={['sender', 'email']}
                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}>
                            <Input
                                allowClear={true}
                            ></Input>
                        </Form.Item>
                        <Form.Item label="Body"
                            name={['sender', 'body']}>
                            <Input.TextArea allowClear={true} />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Title level={1} >
                    {history.location.pathname.split('/')[2]}
                </Title>
                <div style={ {textAlign: 'right'} }>
                    <Title level={3}>
                        {"Made By: " + username}
                    </Title>
                </div>

                <Title level={4}>
                    <div style={ {textAlign: 'right', display:'in-line'}}  >
                        <Button type="text" onClick={showModal}>
                            <MailOutlined style={{ fontSize: '24px' }}/>
                            { " Email Me" }
                        </Button>
                    </div>
                </Title>


                <div style={{ maxWidth: '100%', margin: '2rem auto' }}>
                    <div style={{ textAlign: 'center' }}></div>
                    <RenderContent />
                </div>
            </div>

        </div>
    );
}

export default FolioPage;
