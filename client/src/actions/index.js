import axios from 'axios';
import {
  FETCH_STUDENTS_SUCCESS,
  IS_LOADING,
  IS_ERROR
} from './types';

const baseApiUrl = 'http://localhost:3023/v1';


export const isLoading = (bool) => {
  return {
    type: IS_LOADING,
    isLoading: bool
  }
};


export const isError = (bool) => {
  return {
    type: IS_ERROR,
    isError: bool
  }
};



export const fetchStudentsSuccess = (students) => {
  return {
    type: FETCH_STUDENTS_SUCCESS,
    students
  }
};



export const fetchStudents = () => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    axios.get(`${baseApiUrl}/students`)
    .then((response) => {
      const { data } = response;
      const { students_data } = data;
      const { students } = students_data;
      dispatch(fetchStudentsSuccess(students));
    })
    .catch(() => {
      dispatch(isError(true));
    });
  };
};
