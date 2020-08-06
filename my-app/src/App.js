import React from 'react';
import './App.css';
import Navigation from './Navigation'
import Store from './Store'

function App() {

  return (
    <div className="App">
      <Store>
        <Navigation />
      </Store>
    </div>

  );
}

export default App;
