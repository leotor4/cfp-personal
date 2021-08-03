import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={4000} position="top-right" />
      <AppProvider> 
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
    
  );
}

export default App;