import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Views/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h4>
                Student Management Application
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <br />
              <Link to="/students" className="btn btn-hacker-new btn-xs">View Students</Link>
              <br />
              <br />
              <Link to="/create" className="btn btn-hacker-new btn-xs">Add Student</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
