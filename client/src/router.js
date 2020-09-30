import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/App.js';
import Login from './pages/login.js';
import NotFound from './pages/notFound.js';
import Register from './pages/register.js';
import Template from './pages/template.js';
import User from './pages/user.js';
import Settings from './pages/settings.js';
import FolioPage from './pages/folioPage.js';
import Edit from './pages/edit.js';
import ProtectedRoute from './pages/protected.js';

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/template" component={Template}></Route>
                    <Route path="/:id" exact component={User}></Route>
                    <ProtectedRoute
                        Route
                        path="/:id/settings" component={Settings}>
                    </ProtectedRoute>
                    <ProtectedRoute
                        Route
                        path="/:id/:name/edit"
                        component={Edit}
                    ></ProtectedRoute>
                    <Route path="/:id/:name/view" component={FolioPage}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
