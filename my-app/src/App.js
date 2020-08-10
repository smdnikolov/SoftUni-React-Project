import React from 'react';
import './App.css';
import Router from './router/Router'
import Store from './Store'
import Header from './components/header'
import Footer from './components/footer'
import ScrollToTop from './components/scroll-to-top'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <Store>
        <Header />
        <ToastContainer transition={Flip} autoClose={4000} hideProgressBar={true} closeOnClick />
        <ScrollToTop />
        <Router />
        <Footer />
      </Store>
    </div>
  );
}

export default App;
