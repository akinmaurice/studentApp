import React from 'react';

const Hobbies= (props) => {
  const { details } = props;
  return (
          <li className="list-group-item">{details}</li>
  );
};

export default Hobbies;
