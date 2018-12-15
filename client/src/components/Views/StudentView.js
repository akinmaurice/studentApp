import React from 'react';
import moment from 'moment';

const StudentView= (props) => {
  const { details } = props;
  return (
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="card">
                <img className="card-img-top" src={details.photo_url} alt="Card" />
                  <div className="card-body">
                    <h4 class="card-title">{details.first_name} {details.last_name}</h4>
                      <p class="card-text">{details.email}</p>
                      <p class="card-text">{moment(details.date_of_birth).format('YYYY-MM-DD')}</p>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                      </ul>
                  </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
  );
};

export default StudentView;
