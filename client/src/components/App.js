import React, { Component } from 'react';
import Header from './Views/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <p>Hello</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
