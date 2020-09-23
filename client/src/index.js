import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';
import hljs from 'highlight.js'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/app.scss";
import "./css/style.scss";
import "./commons/auth.js";

hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust'],
})

ReactDOM.render(
    <div>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            transition={Flip}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Router />
    </div>,
    document.getElementById('root'));
