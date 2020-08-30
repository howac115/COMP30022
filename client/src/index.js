import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/app.scss";
import "./css/style.scss";
import "./commons/auth.js";

ReactDOM.render(
<div>
    <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <Router />
</div>, 
document.getElementById('root'));