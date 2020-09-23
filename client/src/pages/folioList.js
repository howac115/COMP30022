import React, { useEffect, useState } from 'react'
import Layout from '../layout.js';
// import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import "antd/dist/antd.css";
import {DeleteOutlined, SettingOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const { Title } = Typography
const { Meta } = Card;

export default function FolioList(props) {

    let history = useHistory();
    const [folios, setFolios] = useState([]);

    useEffect(() => {
        const user = global.auth.getUser().id;
        axios.post('/folio/all', { user })
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.folios)
                    setFolios(response.data.folios)
                } else {
                    toast.error('Couldnt get folio`s lists')
                }
            })
    }, [])
    const handleDelete = (prop) => {
        const user = global.auth.getUser().id;
        axios.post('/folio/'+user+'/delete', { user: user,name: prop});
        toast.success(prop+' succeccful delete');
        history.go(0);

    };
    const renderCards = folios.map((folio, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
            <Card hoverable
                style={{ width: 300, marginTop: 16 }}
                actions={[    
                    <button className="button is-danger" onClick={handleDelete.bind(this, folio.name)}><DeleteOutlined/></button>,
                    <button className="button is-light"><a href={folio.name + '/edit'}> <EditOutlined /></a></button>,
                    <button className="button is-light"><a href={folio.name}> <EyeOutlined /></a></button>,
                ]}
            >
                <Meta
                    title={folio.name}
                    description="This is the description"
                />
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: folio.content }} />
                </div>
            </Card>
        </Col>
    })

    return (
        <div>
            <Layout />
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Title level={2}> Folio Lists </Title>
                <Row gutter={[32, 16]}>
                    {renderCards}
                </Row>
            </div>
        </div>
    )
}