import React from 'react';
import './App.css';
import Router from './router/Router'
import Store from './Store'
import Header from './components/header'
import Footer from './components/footer'

function App() {

  return (
    <div className="App">
      <Store>
        <Header />
        <Router />
        <Footer />
      </Store>
    </div>

  );
}

export default App;
