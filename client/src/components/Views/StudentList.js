import React from 'react';
import StudentCard from './StudentCard';


const StudentList = (props) => {
  console.log(props)
  const { students } = props;
  let view = <p />;
  if (students.length >= 1) {
    view = Object.keys(students).map(student => <StudentCard key={student} details={students[student]} />);
  } else if (students.length < 1) {
    view = (
        <tr className="text-danger text-center">
          <td colSpan="5">
            Currently no student.
          </td>
        </tr>
    );
  }
  return (
      <div className="row text-center">
        <div className="col-lg-12">
          <table className="table text-center">
            <thead>
              <tr className="text-center">
                <th scope="col" className="text-center">First Name</th>
                <th scope="col" className="text-center">Last Name</th>
                <th scope="col" className="text-center">Date of Birth</th>
                <th scope="col" className="text-center">Email</th>
                <th scope="col" className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {view}
            </tbody>
          </table>
        </div>
      </div>
  );
};
export default StudentList;
