import { combineReducers } from 'redux';

import { isError, isLoading, students, student, createStudent, errorMessage } from './students';

export default combineReducers({
  isError,
  isLoading,
  students,
  student,
  createStudent,
  errorMessage
});