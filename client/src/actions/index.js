import axios from 'axios';
import config from '../config';
import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENT_SUCCESS,
  CREATE_STUDENT_SUCCESS,
  FETCH_EDIT_STUDENT_SUCCESS,
  DELETE_STUDENT_SUCCESS,
  IS_LOADING,
  IS_ERROR,
  ERROR_MESSAGE
} from './types';

const baseApiUrl = `${config.baseUrl}/v1`;


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


export const errorMessage = (errorMessage) => {
  return {
    type: ERROR_MESSAGE,
    errorMessage
  }
};


export const fetchStudentsSuccess = (students) => {
  return {
    type: FETCH_STUDENTS_SUCCESS,
    students
  }
};


export const createStudentSuccess = (student) => {
  return {
    type: CREATE_STUDENT_SUCCESS,
    student
  }
};


export const fetchStudentSuccess = (student) => {
  return {
    type: FETCH_STUDENT_SUCCESS,
    student
  }
};


export const fetchEditStudentSuccess = (bool) => {
  return {
    type: FETCH_EDIT_STUDENT_SUCCESS,
    newStudent: bool
  }
};


export const deleteStudentSuccess = (bool) => {
  return {
    type: DELETE_STUDENT_SUCCESS,
    deletedStudent: bool
  }
}


export const fetchStudents = (page) => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    const pageNumber = page || 1;
    axios.get(`${baseApiUrl}/students/page/${pageNumber}`)
    .then((result) => {
      const {  data : { students_data } } = result;
      dispatch(fetchStudentsSuccess(students_data));
    })
    .catch(() => {
      dispatch(isError(true));
    });
  };
};


export const fetchStudent = (student_id) => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    axios.get(`${baseApiUrl}/students/${student_id}`)
    .then((response) => {
      const { data: { student } } = response;
      dispatch(fetchStudentSuccess(student));
    })
    .catch((e) => {
      dispatch(isError(true));
      dispatch(errorMessage(e.response.data));
    });
  };
};


export const createStudent = (payload) => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    axios.post(`${baseApiUrl}/students`, payload)
    .then((response) => {
      const { data: { student } } = response;
      dispatch(createStudentSuccess(student));
    })
    .catch((e) => {
      dispatch(isError(true));
      dispatch(errorMessage(e.response.data));
    });
  };
};



export const editStudent = (student_id, payload) => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    dispatch(fetchEditStudentSuccess(false));
    axios.put(`${baseApiUrl}/students/${student_id}`, payload)
    .then(() => {
      dispatch(fetchEditStudentSuccess(true));
    })
    .catch((e) => {
      dispatch(isError(true));
      dispatch(errorMessage(e.response.data));
    });
  };
};


export const deleteStudent = (student_id) => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    dispatch(fetchEditStudentSuccess(false));
    axios.delete(`${baseApiUrl}/students/${student_id}`)
    .then(() => {
      dispatch(deleteStudentSuccess(true));
    })
    .catch((e) => {
      dispatch(isError(true));
      dispatch(errorMessage(e.response.data));
    });
  };
};



export function resetState() {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(false));
    dispatch(fetchStudentsSuccess({}));
    dispatch(createStudentSuccess({}));
    dispatch(fetchStudentSuccess({}));
    dispatch(fetchEditStudentSuccess(false));
    dispatch(deleteStudentSuccess(false));
  };
}
