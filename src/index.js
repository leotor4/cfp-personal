import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
require('dotenv').config()
console.log(process.env.WDS_SOCKET_PATH)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  
);
