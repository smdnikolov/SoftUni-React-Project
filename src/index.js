import React from 'react';
import ReactDOM from 'react-dom';
import '../public/index.css';
import App from './App';
import Store from './Store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Store>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Store>,
  document.getElementById('root')
);


