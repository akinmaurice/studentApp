import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Views/Header';
import StudentList from './Views/StudentList';
import { fetchStudents, resetState } from '../actions/index';
import Pagination from './Views/Pagination';


function mapStatetoProps(state) {
  return {
    students: state.students,
    isError: state.isError,
    isLoading: state.IsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: page => dispatch(fetchStudents(page)),
    resetState: () => dispatch(resetState()),
  };
}



class Students extends Component {

  componentDidMount() {
    const page = this.props.match.params.page || 1;
      this.props.fetchData(page);
  }

  render() {
    let view = <div />;
    let paginatedView = <div />;
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
      if(this.props.students.page_count > 1) {
        paginatedView = <Pagination pageCount={this.props.students.page_count} />
      }
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
          <div className="row text-center">
            <div className="col-lg-12">
              {paginatedView}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Students);
