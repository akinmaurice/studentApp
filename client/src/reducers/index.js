import { combineReducers } from 'redux';

import { isError, isLoading, students } from './students';

export default combineReducers({
  isError,
  isLoading,
  students
});