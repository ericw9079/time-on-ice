import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import packageJson from '../package.json';

window.appVersion = packageJson.version;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)