import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title } = Typography
const { Meta } = Card;

function FolioPage(props) {

    const folioDetail = async data => {
        try {

        } catch (error) {
            const errorMessage = error.response.data.error;
        }
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Folio detail page </Title>
        </div>
    )
}

export default FolioPage
