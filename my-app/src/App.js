import React from 'react';
import { Route, Switch } from "react-router-dom"
import Login from './route-componenets/login'
import Home from './route-componenets/home'
import Register from './route-componenets/register'
import Header from './components/header'
import Footer from './components/footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
