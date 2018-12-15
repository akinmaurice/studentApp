import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import App from './components/App';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';


import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/style.css';


const Root = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={App} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);


render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
