import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';
import Routes from './routes';
import dotenv from 'dotenv'
import AppProvider from './hooks';
dotenv.config()
function App() {
  console.log(process.env.REACT_APP_WDS_SOCKET_PATH)
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