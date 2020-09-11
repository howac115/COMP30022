import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './pages/App.js'
import Login from './pages/login.js'
import NotFound from './pages/notFound.js'
import Register from './pages/register.js'
import User from './pages/user.js'
import FolioList from './pages/folioList.js'
import FolioPage from './pages/folioPage.js'
import Create from './pages/create.js'
import Edit from './pages/edit.js'
import ProtectedRoute from './pages/protected.js'

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={App}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/:id' exact component={User}></Route>
                    <ProtectedRoute path='/:id/folios' component={FolioList}></ProtectedRoute>
                    <ProtectedRoute path='/:id/create' component={Create}></ProtectedRoute>
                    <Route path='/:id/:name' component={FolioPage}></Route>
                    <Route path='/:id/:name/edit' component={Edit}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;
