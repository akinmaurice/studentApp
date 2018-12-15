import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Views/Header';
import { fetchStudent } from '../actions/index';
import StudentView from './Views/StudentView';


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
      view = <StudentView details={this.props.student} ></StudentView>
    }
    return (
      <div>
        <Header />
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h5>
                Student Card
              </h5>
            </div>
          </div>
          {view}
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Student);
