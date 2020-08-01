import React from 'react';
import { Route, Switch } from "react-router-dom"
import Header from './components/header'
import Footer from './components/footer'
import Login from './route-componenets/login'
import Home from './route-componenets/home'
import Register from './route-componenets/register'
import Category from './route-componenets/category'
import Details from './route-componenets/details'
import Profile from './route-componenets/profile'
import NotFound from './route-componenets/not-found'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/category/:name" component={Category} />
        <Route path="/details/:name" component={Details} />
        <Route path="/profile" component={Profile} />
        <Route path='*' exact component={NotFound} />
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
