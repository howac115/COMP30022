import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import { useHistory } from "react-router-dom";

const { Title } = Typography
const { Meta } = Card;

function FolioPage(props) {

    let history = useHistory();
    console.log(history)

    const folioDetail = async data => {
        try {
            console.log(history);
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
