import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Views/Header';

import { resetState, editStudent } from '../actions/index';



function mapStatetoProps(state) {
  return {
    newStudent: state.newStudent,
    isError: state.isError,
    isLoading: state.IsLoading,
    errorMessage: state.errorMessage
  };
}



class EditStudent extends Component {
  state = {
    noStudent: false,
  }


  componentDidMount() {
    this.props.resetState();
    if(!this.props.location.first_name) {
      this.setState({
        noStudent: true
      })
    }
  }


  handleSubmit = e => {
    e.preventDefault();
        const { student_id } = this.props.match.params;
          let first_name = this.first_name.value;
          let last_name = this.last_name.value;
          let date_of_birth = this.date_of_birth.value;
          let hobbies = this.hobbies.value;
          if(!first_name.trim()) {
            first_name = this.props.location.first_name
          };
          if(!last_name.trim()) {
            last_name = this.props.location.last_name
          };
          console.log(moment(date_of_birth).isBefore());
          if(moment(date_of_birth).isBefore()){
                this.setState({
                  errMsg: 'Hahahah',
                });
          }
          if(!date_of_birth.trim()) {
            date_of_birth = moment(this.props.location.date_of_birth).format('YYYY-MM-DD')
          };
          if(!hobbies.trim()) {
            hobbies = this.props.location.hobbies.toString();
          };
          const payload = {
            first_name,
            last_name,
            date_of_birth,
            hobbies
          };
        this.props.editStudent(student_id, payload);
   };


  render() {
    console.log(this.props)
    const { student_id } = this.props.match.params;
    const newUrl = `/student/${student_id}`
    let view = <div />;

    if(this.state.noStudent) {
      view = (<Redirect to="/students"/>);
    }
    if( this.props.isError) {
      view = (
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12 text-danger">
              <br />
              {this.props.errorMessage.error || 'Oops! Something went wrong'}
            </div>
          </div>
        </div>
      );
    } else if (this.props.isLoading) {
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
      } else if(this.props.newStudent) {
        view = (<Redirect to={newUrl} />)
      }
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h4>
                Update Student
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
                    placeholder={this.props.location.first_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.last_name = ref; }}
                    placeholder={this.props.location.last_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="date_of_birth"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.date_of_birth= ref; }}
                    placeholder={moment(this.props.location.date_of_birth).format('YYYY-MM-DD')}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="hobbies"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.hobbies = ref; }}
                    placeholder={this.props.location.hobbies}
                  />
                  <p>
                    Insert a comma after each hobby. see below example.
                  </p>
                  <p>
                    Swimming, Travelling, Eating
                  </p>
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-hacker-new btn-block create-news-form-input"
                  >
                  Update Student
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


export default connect(mapStatetoProps, { resetState, editStudent})(EditStudent);
