import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { store, persistor } from './store';

import App from './components/App';
import Students from './components/Students';
import Student from './components/Student';
import CreateStudent from './components/CreateStudent';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';


import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/style.css';


const Root = () => (

  <Provider store={store}>
    <PersistGate persistor={persistor}>
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/students" exact component={Students} />
        <Route path="/student/:student_id" exact component={Student} />
        <Route path="/create" exact component={CreateStudent} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
    </PersistGate>
  </Provider>
);


render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
