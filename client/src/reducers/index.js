import { combineReducers } from 'redux';

import { isError, isLoading, students, student, createStudent, errorMessage, newStudent } from './students';

export default combineReducers({
  isError,
  isLoading,
  students,
  student,
  createStudent,
  errorMessage,
  newStudent
});