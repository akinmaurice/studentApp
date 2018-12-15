import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENT_SUCCESS,
  CREATE_STUDENT_SUCCESS,
  IS_LOADING,
  IS_ERROR,
  ERROR_MESSAGE
} from '../actions/types';

export function isError(state = false, action) {
  switch (action.type) {
    case IS_ERROR:
      return action.isError;
    default:
      return state;
  }
}

export function errorMessage(state = {}, action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return action.errorMessage;
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

export function student(state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENT_SUCCESS:
      return action.student;
    default:
      return state;
  }
}


export function createStudent(state = {}, action) {
  switch (action.type) {
    case CREATE_STUDENT_SUCCESS:
      return action.student;
    default:
      return state;
  }
}