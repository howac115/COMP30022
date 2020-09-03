import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../layout.js';

class Edit extends React.Component {

    render() {
        return (
            <div className='Edit'>
                <Layout />
                <h1>You are in edit mode</h1>
            </div>
        );
    }
}

export default Edit;
