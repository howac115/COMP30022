import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './pages/App.js';
import Login from './pages/login.js';
import NotFound from './pages/notFound.js';
import Register from './pages/register.js';
import User from './pages/user.js';
import FolioList from './pages/folioList.js';
import FolioPage from './pages/folioPage.js';
import Create from './pages/create.js';
import Edit from './pages/edit.js';
import Template from './pages/template/Template'
import ProtectedRoute from './pages/protected.js';
import MainScreen from "./pages/template/Homepage/MainScreen.js";
import Contact from "./pages/template/ContactMe/Contact";
import Achievement from "./pages/template/Achievement/achivement"
import Experience from "./pages/template/Experience/experience"

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/login" component={Login}></Route>
                    <ProtectedRoute path="/:id/template" component={Template}></ProtectedRoute>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/:id" exact component={User}></Route>
                    <ProtectedRoute path='/:id/templatemain' component={MainScreen}></ProtectedRoute>
                    <ProtectedRoute path='/:id/temcontact' component={Contact}></ProtectedRoute>
                    <ProtectedRoute path='/:id/temachivement' component={Achievement}></ProtectedRoute>
                    <ProtectedRoute path='/:id/temexperience' component={Experience}></ProtectedRoute>
                    <ProtectedRoute
                        path="/:id/folios"
                        component={FolioList}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        path="/:id/create"
                        component={Create}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        Route
                        path="/:id/:name/edit"
                        component={Edit}
                    ></ProtectedRoute>
                    <Route path="/:id/:name" component={FolioPage}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
