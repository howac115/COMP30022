import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../layout.js';

export default function App(props) {

    console.log(props);

    console.log(global.auth.getUserToken);

    return (
        <div className='App'>
            <Layout />
        </div>
    );
}