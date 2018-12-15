import React from 'react';
import moment from 'moment';

const StudentCard = (props) => {
  const { details } = props;
  return (
      <tr className="text-center">
        <td>{details.first_name}</td>
        <td>{details.last_name}</td>
        <td>{moment(details.date_of_birth).format('YYYY-MM-DD')}</td>
        <td>{details.email}</td>
      </tr>
  );
};

export default StudentCard;
