import axios from 'axios';
import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENT_SUCCESS,
  CREATE_STUDENT_SUCCESS,
  FETCH_EDIT_STUDENT_SUCCESS,
  IS_LOADING,
  IS_ERROR,
  ERROR_MESSAGE
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


export const fetchEditStudentSuccess = (editStudent) => {
  return {
    type: FETCH_EDIT_STUDENT_SUCCESS,
    editStudent
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


export const fetchStudent = (student_id) => {
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(isLoading(true));
    axios.get(`${baseApiUrl}/students/${student_id}`)
    .then((response) => {
      const { data } = response;
      const { student } = data;
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
      const { data } = response;
      const { student } = data;
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
    axios.put(`${baseApiUrl}/students/${student_id}`, payload)
    .then((response) => {
      const { data } = response;
      const { student } = data;
      dispatch(fetchEditStudentSuccess(student));
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
    dispatch(createStudentSuccess({}));
    dispatch(fetchStudentSuccess({}));
  };
}
