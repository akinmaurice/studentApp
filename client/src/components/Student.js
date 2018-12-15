import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Views/Header';
import { fetchStudent } from '../actions/index';


function mapStatetoProps(state) {
  return {
    student: state.student,
    isError: state.isError,
    isLoading: state.IsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: student_id => dispatch(fetchStudent(student_id)),
  };
}



class Student extends Component {
  componentDidMount() {
    const { student_id } = this.props.match.params;
    this.props.fetchData(student_id);
  }

  render() {
    console.log(this.props.student)
    let view = <div />;
    if( this.props.isError) {
      view = (
          <div className="row">
            <div className="col-lg-12">
              <br />
              There Was an Error Loading Data
            </div>
          </div>
      );
    } else if ( this.props.isLoading) {
      view = (
          <div className="row">
            <div className="col-lg-12">
              <br />
              <i className="fa fa-2x fa-circle-o-notch fa-spin text-danger" />
            </div>
          </div>
      );
    } else {
      view = (<p>{this.props.student.first_name}</p>);
    }
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h6>
                Student Card
              </h6>
            </div>
          </div>
          {view}
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Student);
