import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Views/Header';
import StudentList from './Views/StudentList';
import { fetchStudents } from '../actions/index';


function mapStatetoProps(state) {
  return {
    students: state.students,
    isError: state.isError,
    isLoading: state.IsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchStudents()),
  };
}



class Students extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
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
      view = <StudentList students={this.props.students} />;
    }
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
          {view}
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Students);
