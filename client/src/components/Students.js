import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Views/Header';

class Students extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h6>
                List of Students
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
