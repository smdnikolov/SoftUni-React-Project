import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom"
import Login from '../route-componenets/login'
import Home from '../route-componenets/home'
import Register from '../route-componenets/register'
import Category from '../route-componenets/category'
import Details from '../route-componenets/details'
import Profile from '../route-componenets/profile'
import PostAd from '../route-componenets/post-ad'
import EditAd from '../route-componenets/edit'
import NotFound from '../route-componenets/not-found'
import NetworkError from '../route-componenets/network-error'
import { UserContext } from '../Store'
import AuthGuard from './AuthGuard'
import ProtectedRoute from './ProtectedRoute'



const Router = (props) => {

    const [user,] = useContext(UserContext)

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute user={user} path="/login" component={Login} />
            <ProtectedRoute user={user} path="/register" component={Register} />
            <Route path="/category/:name" component={Category} />
            <Route path="/details/:id" component={Details} />
            <AuthGuard user={user} path='/profile' component={Profile} />
            <AuthGuard user={user} path='/post-ad' component={PostAd} />
            <AuthGuard user={user} path='/edit/:id' component={EditAd} />
            <Route path="/network-error" component={NetworkError} />
            <Route path='*' exact component={NotFound} />
        </Switch>
    )
}

export default Router;
