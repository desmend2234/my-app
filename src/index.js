import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './stylesheets/all.scss';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
