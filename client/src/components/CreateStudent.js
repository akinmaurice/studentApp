import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './Views/Header';
import { createStudent} from '../actions/index';


function mapStatetoProps(state) {
  return {
    student: state.createStudent,
    isError: state.isError,
    isLoading: state.IsLoading,
    errorMessage: state.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: newStudent => dispatch(createStudent(newStudent)),
  };
}


class CreateStudent extends Component {
  state = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    hobbies: '',
    photo: ''
   };

   handleInputChange = e => {
     this.setState({
       [e.target.name]: e.target.value
     });
   };


   handleSubmit = e => {
    e.preventDefault();
    if (this.state.first_name.trim() &&
      this.state.last_name.trim() &&
      this.state.email.trim() &&
      this.state.hobbies.trim() &&
      this.state.photo.trim() &&
      this.state.date_of_birth.trim())
      {
        console.log(this.state);
      this.props.fetchData(this.state);
    };
   };


  render() {
    let view = <div />;
    if( this.props.isError) {
      view = (
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12 text-danger">
              <br />
              {this.props.errorMessage.error || 'There was an Error creating new Student'}
            </div>
          </div>
        </div>
      );
    } else if ( this.props.isLoading) {
      view = (
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <br />
              <i className="fa fa-2x fa-circle-o-notch fa-spin" />
            </div>
          </div>
        </div>
      );
    } else if(!_.isEmpty(this.props.student)) {
      //view = <Redirect to={postUrl} />;
      view = (<p>Hello</p>)
    }
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
                  <input
                    type="email"
                    name="email"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    value={ this.state.email}
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="date_of_birth"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    value={ this.state.date_of_birth}
                    placeholder="Date Of Birth YYYY-MM-DD"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="hobbies"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    value={ this.state.hobbies}
                    placeholder="Hobbies"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    name="photo"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    value={ this.state.photo}
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
              {view}
            </div>
            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12" />
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStatetoProps, mapDispatchToProps)(CreateStudent);
