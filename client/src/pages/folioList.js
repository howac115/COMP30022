import React, { useEffect, useState } from 'react'
import Layout from '../layout.js';
// import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Card, Col, Typography, Row } from 'antd';
import "antd/dist/antd.css";
import { SettingOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";

const { Title } = Typography
const { Meta } = Card;

export default function FolioList(props) {

    // let history = useHistory();
    const [folios, setFolios] = useState([]);

    useEffect(() => {
        const user = global.auth.getUser().id;
        axios.post('/folio/all', { user })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.folios)
                    setFolios(response.data.folios)
                } else {
                    toast.error('Couldnt get folio`s lists')
                }
            })
    }, [])

    const renderCards = folios.map((folio, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
            <Card hoverable
                style={{ width: 300, marginTop: 16 }}
                actions={[
                    <a href='#'> <SettingOutlined /></a>,
                    <a href={folio.name + '/edit'}> <EditOutlined /></a>,
                    <a href={folio.name}> <EyeOutlined /></a>,
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