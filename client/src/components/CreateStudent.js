import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Views/Header';

class CreateStudent extends Component {
  state = {
    first_name: '',
    last_name: ''
   };

   handleInputChange = e => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };


   handleSubmit = e => {
    e.preventDefault();
    if (this.state.first_name.trim() && this.state.last_name.trim()){
      console.log(this.state);
      this.handleReset();
    };
   };

   handleReset = () => {
    this.setState({
      first_name: '',
      last_name: ''
    });
   };

  render() {
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h4>
                Create Student
              </h4>
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12" />
            <div className="col-lg-6 col-md-8 col-sm-8 col-xs-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="first_name"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    value={ this.state.first_name}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    value={ this.state.last_name}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-hacker-new btn-block create-news-form-input"
                  >
                  Create Student
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStudent;
