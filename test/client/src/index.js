import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';
import './css/app.scss';
import './css/style.scss';
import './commons/auth.js';

ReactDOM.render(
    <div>
        <Router />
    </div>,
    document.getElementById('root')
);
