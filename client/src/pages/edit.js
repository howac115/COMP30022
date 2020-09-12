import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Layout from '../layout.js';
import hljs from 'highlight.js'
import QuillEditor from '../components/QuillEditor';
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
// import { useSelector, Provider } from "react-redux";
import { toast } from "react-toastify";

const { Title } = Typography;

function Edit(props) {

    let history = useHistory();
    var pathArray = history.location.pathname.split('/');
    // const user = useSelector(state => state.user);
    
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])
    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }
    const variables = {
        user: global.auth.getUser().id,
        name: pathArray[2],
        content: content
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log('submit');
        setContent("");

        axios.post('/folio/' + variables.user + '/edit', variables)
            .then(response => {
                if (response) {
                    toast.success('Post Created!');
                    setTimeout(() => {
                        history.push('/' + variables.user + '/folios')
                    }, 2000);
                }
            })
    }


    return (
        <div className='Edit'>
            <Layout />
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2} > Editor</Title>
                </div>
                <QuillEditor
                    user={pathArray[1]}
                    name={pathArray[2]}
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                />
                <Form onClick={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onClick={onSubmit}
                        >
                            Submit
            </Button>
                    </div>
                </Form>
            </div></div>

    )
}

export default Edit
