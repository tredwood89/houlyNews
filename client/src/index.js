import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

ReactDOM.render(
  (
  <Router>
    <div>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
  ),
  document.getElementById('root')
  );
registerServiceWorker();
