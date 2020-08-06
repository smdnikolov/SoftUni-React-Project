import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from './components/header'
import Footer from './components/footer'
import Login from './route-componenets/login'
import Home from './route-componenets/home'
import Register from './route-componenets/register'
import Category from './route-componenets/category'
import Details from './route-componenets/details'
import Profile from './route-componenets/profile'
import PostAd from './route-componenets/post-ad'
import EditAd from './route-componenets/edit'
import NotFound from './route-componenets/not-found'
import NetworkError from './route-componenets/network-error'
import './App.css';



function Navigation() {
    return (
        <BrowserRouter>
            <Header  check={localStorage.getItem('logged')} />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/category/:name" component={Category} />
                <Route path="/details/:id" component={Details} />
                <Route path="/profile" component={Profile} />
                <Route path="/post-ad" component={PostAd} />
                <Route path="/edit/:id" component={EditAd} />
                <Route path="/network-error" component={NetworkError} />
                <Route path='*' exact component={NotFound} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default Navigation;
