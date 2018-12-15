import {
  FETCH_STUDENTS_SUCCESS,
  IS_LOADING,
  IS_ERROR
} from '../actions/types';

export function isError(state = false, action) {
  switch (action.type) {
    case IS_ERROR:
      return action.isError;
    default:
      return state;
  }
}

export function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function students(state = [], action) {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      return action.students;
    default:
      return state;
  }
}
