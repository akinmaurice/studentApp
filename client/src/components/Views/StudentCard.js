import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const StudentCard = (props) => {
  const { details } = props;
  const studentUrl = `/student/${details.id}`;
  return (
      <tr className="text-center">
        <td>{details.first_name}</td>
        <td>{details.last_name}</td>
        <td>{moment(details.date_of_birth).format('YYYY-MM-DD')}</td>
        <td>{details.email}</td>
        <td>
          <Link to={studentUrl}>View Student</Link>
        </td>
      </tr>
  );
};

export default StudentCard;
