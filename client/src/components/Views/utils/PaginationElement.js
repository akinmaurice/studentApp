import React from 'react';
import { Link } from 'react-router-dom';

const PaginationElement = (props) => {
  const { pageNumber } = props;
  const url = `/students/${pageNumber}`;
  return (
          <li className="page-item">
            <Link to={url} className="page-link">
              {pageNumber}
            </Link>
          </li>
  );
};

export default PaginationElement;
