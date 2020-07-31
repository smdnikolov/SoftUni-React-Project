import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from './route-componenets/login'
import Home from './route-componenets/home'
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
      </Switch>
      <Footer />
    </div>

  );
}

export default App;
