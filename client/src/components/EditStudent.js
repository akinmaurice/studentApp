import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './Views/Header';

import { resetState, fetchStudent, editStudent } from '../actions/index';



function mapStatetoProps(state) {
  return {
    student: state.student,
    editStudent: state.editStudent,
    isError: state.isError,
    isLoading: state.IsLoading,
    errorMessage: state.errorMessage
  };
}



class EditStudent extends Component {
  state = {
    updatedStudent: false,
    errMsg: ''
  }
  componentWillMount() {
    this.props.resetState();
  }


  componentDidMount() {
    const { student_id } = this.props.match.params;
    this.props.fetchStudent(student_id);
  }


  componentWillUnmount(){
    this.props.resetState();
  }


  handleSubmit = e => {
    e.preventDefault();
        const { student_id } = this.props.match.params;
          let first_name = this.first_name.value;
          let last_name = this.last_name.value;
          let date_of_birth = this.date_of_birth.value;
          let hobbies = this.hobbies.value;
          if(!first_name.trim()) {
            first_name = this.props.student.first_name
          };
          if(!last_name.trim()) {
            last_name = this.props.student.last_name
          };
          console.log(moment(date_of_birth).isBefore());
          if(moment(date_of_birth).isBefore()){
                this.setState({
                  errMsg: 'Hahahah',
                });
          }
          if(!date_of_birth.trim()) {
            date_of_birth = moment(this.props.student.date_of_birth).format('YYYY-MM-DD')
          };
          if(!hobbies.trim()) {
            hobbies = this.props.student.hobbies.toString();
          };
          const payload = {
            first_name,
            last_name,
            date_of_birth,
            hobbies
          };
        this.props.editStudent(student_id, payload);
        this.setState({
          updatedStudent: true,
        })
   };


  render() {
    console.log(this.props.isError)
    console.log(this.errorMessage);
    let view = <div />;
    if(this.state.errMsg !== '') {
        view = (<p>{this.state.errMsg}</p>)
    }
    if(this.state.updatedStudent) {
      const studentUrl = `/student/${this.props.student.id}`;
      view = (<Redirect to={studentUrl}/>);
    };
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
                    placeholder={this.props.student.first_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.last_name = ref; }}
                    placeholder={this.props.student.last_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="date_of_birth"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.date_of_birth= ref; }}
                    placeholder={moment(this.props.student.date_of_birth).format('YYYY-MM-DD')}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="hobbies"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.hobbies = ref; }}
                    placeholder={this.props.student.hobbies}
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


export default connect(mapStatetoProps, { resetState, fetchStudent, editStudent})(EditStudent);
