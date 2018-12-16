import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Hobbies from './utils/Hobbies';

const StudentView= (props) => {
  const { details } = props;
  const { hobbies } = details;
  const studentUrl = `/student/${details.id}/edit`;
  let hobbyView = <p />;
  if( hobbies && hobbies.length >= 1) {
    hobbyView = Object.keys(hobbies).map(hobby => <Hobbies key={hobby} details={hobbies[hobby]} />);
  } else {
    hobbyView = (<li className="list-group-item">Vestibulum at eros</li>)
  }
  const newTo = {
    pathname: studentUrl,
    first_name: details.first_name,
    last_name: details.last_name,
    date_of_birth: moment(details.date_of_birth).format('YYYY-MM-DD'),
    hobbies: details.hobbies
  }
  return (
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
            <Link to={newTo}>Edit Student</Link>
              <div className="card">
                <img className="card-img-top" src={details.photo_url} alt="Card" />
                  <div className="card-body">
                    <h4 className="card-title">{details.first_name} {details.last_name}</h4>
                      <p className="card-text">{details.email}</p>
                      <p className="card-text">{moment(details.date_of_birth).format('YYYY-MM-DD')}</p>
                      <ul className="list-group list-group-flush">
                        {hobbyView}
                      </ul>
                  </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
  );
};

export default StudentView;
