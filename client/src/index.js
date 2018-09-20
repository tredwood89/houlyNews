import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom'

ReactDOM.render(
  (
  <Router>
    <div>
      <Route path="/" component={Login}/>
    </div>
  </Router>
  ),
  document.getElementById('root')
  );
registerServiceWorker();
