import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './pages/App.js'
import Login from './pages/login.js'
import NotFound from './pages/notFound.js'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={App}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router; 