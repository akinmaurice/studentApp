import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Views/Header';

import { resetState, deleteStudent } from '../actions/index';



function mapStatetoProps(state) {
  return {
    deletedStudent: state.deletedStudent,
    isError: state.isError,
    isLoading: state.IsLoading,
    errorMessage: state.errorMessage
  };
}



class DeleteStudent extends Component {
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
        console.log(student_id);
        this.props.deleteStudent(student_id);
   };


  render() {
    const newUrl = '/students';
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
      } else if(this.props.deletedStudent) {
        view = (<Redirect to={newUrl} />)
      }
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h4>
                Are you sure you want to delete this student?
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
                    name="last_name"
                    className="form-control create-news-form-input"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.first_name = ref; }}
                    placeholder={this.props.location.first_name}
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-hacker-new btn-block create-news-form-input"
                  >
                  Delete Student
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


export default connect(mapStatetoProps, { resetState, deleteStudent })(DeleteStudent);
