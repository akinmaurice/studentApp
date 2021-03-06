import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './Views/Header';
import { createStudent, resetState } from '../actions/index';


function mapStatetoProps(state) {
  return {
    student: state.createStudent,
    isError: state.isError,
    isLoading: state.IsLoading,
    errorMessage: state.errorMessage
  };
}



class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbyList: [],
      inputError: ''
    };
  }

  componentWillMount() {
    this.props.resetState();
  }


  processNewStudent () {
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.set('first_name', this.first_name.value);
    data.set('last_name', this.last_name.value);
    data.set('date_of_birth', this.date_of_birth.value);
    data.set('email', this.email.value);
    data.set('hobbies', this.hobbies.value);
    this.props.createStudent(data);
  }


   handleSubmit = e => {
    e.preventDefault();
        if(!this.first_name.value) {
            this.setState({
              inputError: 'Please provide a first name'
            })
            return;
        }
        if(!this.last_name.value) {
          this.setState({
            inputError: 'Please provide a last name'
          })
          return;
        }
        if(!this.email.value) {
        this.setState({
          inputError: 'Please provide a valid email address'
        })
        return;
      }
      if(!this.date_of_birth.value) {
      this.setState({
        inputError: 'Please provide a date of birth'
      })
      return;
      }
      if(!this.hobbies.value) {
      this.setState({
        inputError: 'Please provide some hobbies'
      })
      return;
      }
      if(!this.uploadInput.files[0]) {
        this.setState({
          inputError: 'Please upload an image'
        })
      return;
      }
      this.processNewStudent();
   };


  render() {
    let view = <div />;
    let inputError = (<p></p>);
    if(this.state.inputError !== '') {
      inputError = (<p className="text-danger">{this.state.inputError}</p>)
    }
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
      const studentUrl = `/student/${this.props.student.id}`
      view = <Redirect to={studentUrl} />;
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
                    ref={(ref) => { this.first_name= ref; }}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.last_name = ref; }}
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.email = ref; }}
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="date_of_birth"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.date_of_birth= ref; }}
                    placeholder="Date Of Birth YYYY-MM-DD"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="hobbies"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.hobbies = ref; }}
                    placeholder="Hobbies"
                  />
                  <p>
                    Insert a comma after each hobby. see below example.
                  </p>
                  <p>
                    Swimming, Travelling, Eating
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    ref={(ref) => { this.uploadInput = ref; }}
                    className="form-control create-news-form-input"
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-hacker-new btn-block create-news-form-input"
                  >
                  Create Student
                  </button>
                </div>
                <div className="form-group">
                 {inputError}
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


export default connect(mapStatetoProps, {createStudent, resetState})(CreateStudent);
